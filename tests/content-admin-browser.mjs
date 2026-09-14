// Run against a local Vite server and Chrome with --remote-debugging-port=9223.
// All content/database data is intercepted in Chrome; no Firebase writes occur.
const siteUrl = process.env.CONTENT_TEST_URL || "http://127.0.0.1:5174";
import fs from 'node:fs/promises';
const targets=await(await fetch('http://127.0.0.1:9223/json/list')).json();
const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();const exceptions=[];
const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}));});
const app=`import React from '/node_modules/.vite/deps/react.js';import ProjectsTab from '/src/components/dashboard/ProjectsTab.tsx';export default function App(){return React.createElement(ProjectsTab,{collectionName:location.search.includes('story')?'case_studies':'projects'});}`;
const firestore=`let seq=0;const store=window.testStore=window.testStore||{};
export function collection(db,name){return {path:name}};
export function doc(db,name,id){return id?{path:name+'/'+id,id}:{path:db.path+'/'+(++seq),id:String(seq)}};
const snapshot=(ref)=>({id:ref.id,exists:()=>!!store[ref.path],data:()=>store[ref.path]});
export async function getDocs(ref){return {docs:Object.entries(store).filter(([k])=>k.startsWith(ref.path+'/')).map(([path,value])=>({id:path.split('/')[1],data:()=>value}))}};
export async function updateDoc(ref,data){store[ref.path]={...store[ref.path],...data}};
export async function runTransaction(db,fn){return fn({get:async ref=>snapshot(ref),set:(ref,data)=>{store[ref.path]={...store[ref.path],...data}},delete:ref=>{delete store[ref.path]}})};
`;
ws.addEventListener('message',async e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p?.reject(m.error):p?.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params.exceptionDetails.text);if(m.method==='Fetch.requestPaused'){const p=m.params;const url=p.request.url;let source=url.includes('/src/App.tsx')?app:url.includes('/src/lib/firebase.ts')?'export const db = {};':firestore;await send('Fetch.fulfillRequest',{requestId:p.requestId,responseCode:200,responseHeaders:[{name:'Content-Type',value:'text/javascript'}],body:Buffer.from(source).toString('base64')});}});
await send('Page.enable');await send('Runtime.enable');await send('Fetch.enable',{patterns:[{urlPattern:'*/src/App.tsx*'},{urlPattern:'*/src/lib/firebase.ts*'},{urlPattern:'*/firebase_firestore.js*'}]});
const ev=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
async function waitFor(expression){for(let i=0;i<100;i++){if(await ev(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out '+expression);}
const click=async text=>{await ev(`[...document.querySelectorAll('button')].find(b=>b.textContent===${JSON.stringify(text)}).click()`);await new Promise(r=>setTimeout(r,100));};
const field=async(label,value)=>{await ev(`(()=>{const label=[...document.querySelectorAll('label')].find(l=>l.firstElementChild?.textContent===${JSON.stringify(label)}||l.childNodes[0]?.textContent===${JSON.stringify(label)});const el=label.querySelector('input,textarea,select');Object.getOwnPropertyDescriptor(el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:el.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));})()`);};
await send('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url:siteUrl+'/dashboard'});await waitFor("document.body.innerText.includes('No entries yet')");
await click('Add Project');await field('Title *','Demo commerce');
await waitFor("document.querySelector('input[required]').value==='demo-commerce'");console.log('PASS admin slug generation');
await click('Save draft');await waitFor("window.testStore['projects/1']?.status==='draft'");console.log('PASS create draft');
await click('Edit');await field('Category *','Web');await field('Short description *','A storefront project.');await field('Cover image URL','/adat_hero_ui.webp');await field('Status','published');await click('Save & publish');await waitFor("window.testStore['projects/1']?.status==='published'");console.log('PASS edit and publish');
await click('Unpublish');await waitFor("window.testStore['projects/1']?.status==='draft'");console.log('PASS unpublish');
await ev('window.confirm=()=>true');await click('Delete');await waitFor("!window.testStore['projects/1']");console.log('PASS delete and release slug');
await send('Page.navigate',{url:siteUrl+'/dashboard?story'});await waitFor("document.body.innerText.includes('Add Case Study')");await click('Add Case Study');await waitFor("document.body.innerText.includes('Challenge / problem')");
if(!await ev("document.body.innerText.includes('Linked project (optional)') && document.body.innerText.includes('Results / outcomes') && !document.body.innerText.includes('Live demo')"))throw Error('Incorrect case study fields');console.log('PASS separate case study editor and optional project reference');
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
if(!await ev('document.documentElement.scrollWidth<=390'))throw Error('Admin overflow');console.log('PASS mobile editor layout');
if(exceptions.length)throw Error(exceptions.join(','));console.log('PASS no admin runtime errors');ws.close();
