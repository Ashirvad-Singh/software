import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
const children=[];
async function available(url){try{return (await fetch(url)).ok}catch{return false}}
if(!await available('http://127.0.0.1:5174'))children.push(spawn('npm',['run','dev','--','--host','127.0.0.1','--port','5174'],{stdio:'ignore'}));
if(!await available('http://127.0.0.1:9223/json/list'))children.push(spawn('google-chrome',['--headless=new','--no-sandbox','--disable-gpu','--remote-debugging-port=9223','--user-data-dir=/tmp/adat-technology-review','about:blank'],{stdio:'ignore'}));
for(let n=0;n<100 && (!await available('http://127.0.0.1:9223/json/list')||!await available('http://127.0.0.1:5174'));n++)await new Promise(r=>setTimeout(r,200));
const targets=await(await fetch('http://127.0.0.1:9223/json/list')).json();
const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();const exceptions=[];
const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}));});
const mainSource = await (await fetch('http://127.0.0.1:5174/src/main.tsx')).text();
const reactPath = mainSource.match(/"([^"\n]*\/react\.js[^"\n]*)"/)[1];
const routerPath = mainSource.match(/"([^"\n]*\/react-router-dom\.js[^"\n]*)"/)[1];
const app=`import React from '${reactPath}';import {Routes,Route} from '${routerPath}';import TechStackTab from '/src/components/dashboard/TechStackTab.tsx';import TechnologyDetailPage from '/src/pages/TechnologyDetailPage.tsx';export default function App(){return React.createElement(Routes,null,React.createElement(Route,{path:'/dashboard',element:React.createElement(TechStackTab)}),React.createElement(Route,{path:'/technologies/:slug',element:React.createElement(TechnologyDetailPage)}));}`;
const firestore=`const store=window.testStore;export function collection(db,name){return {path:name}};export function doc(db,name,id){return {path:name+'/'+id,id}};export const orderBy=()=>{};export const where=()=>{};export const query=(ref)=>ref;export async function getDocs(ref){return {docs:Object.entries(store).filter(([k])=>k.startsWith(ref.path+'/')).map(([path,value])=>({id:path.split('/')[1],data:()=>value}))}};export async function updateDoc(ref,data){store[ref.path]={...store[ref.path],...data}};export async function runTransaction(db,fn){return fn({get:async ref=>({exists:()=>!!store[ref.path],data:()=>store[ref.path]}),update:(ref,data)=>{store[ref.path]={...store[ref.path],...data}},set:(ref,data)=>{store[ref.path]=data}})};export async function addDoc(){throw Error('Unexpected add')};export async function deleteDoc(){throw Error('Unexpected delete')};`;
ws.addEventListener('message',async e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(m.error)p?.reject(m.error);else p?.resolve(m.result);}if(m.method==='Runtime.exceptionThrown'){exceptions.push(m.params.exceptionDetails.text);console.log('RUNTIME',m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);}if(m.method==='Fetch.requestPaused'){const p=m.params;const url=p.request.url;const source=url.includes('/src/App.tsx')?app:url.includes('/src/lib/firebase.ts')?'export const db = {};':firestore;await send('Fetch.fulfillRequest',{requestId:p.requestId,responseCode:200,responseHeaders:[{name:'Content-Type',value:'text/javascript'}],body:Buffer.from(source).toString('base64')});}});
await send('Page.enable');await send('Runtime.enable');await send('Fetch.enable',{patterns:[{urlPattern:'*/src/App.tsx*'},{urlPattern:'*/src/lib/firebase.ts*'},{urlPattern:'*/firebase_firestore.js*'}]});

await send('Page.addScriptToEvaluateOnNewDocument',{source:'window.testStore={};'});
const ev=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
async function waitFor(expression){for(let i=0;i<150;i++){if(await ev(`Boolean(${expression})`))return;await new Promise(r=>setTimeout(r,100));}console.log('STATE',await ev('({text:document.body.innerText.slice(0,2000),storeKeys:Object.keys(window.testStore||{})})'));throw Error('Timed out '+expression);}
await send('Page.navigate',{url:'http://127.0.0.1:5174/dashboard'});
await waitFor("Object.keys(window.testStore).length>=5 && document.querySelector('table tbody tr button')");
const saved=await ev('window.testStore');
const technologies=Object.values(saved).flatMap(category=>category.technologies);
if(technologies.length<40 || technologies.some(tech=>!tech.page.overview || !tech.page.process.length || !tech.page.useCases.length || tech.starterVersion!==1))throw Error('Incomplete automatic starters');
const names=technologies.map(tech=>tech.name.toLowerCase().replace(/[^a-z0-9]/g,'').replace(/development$/,'').replace(/^shopifyplus$/,'shopify'));
if(new Set(names).size!==names.length)throw Error('Duplicate technology');
console.log('PASS empty backend automatically saves '+technologies.length+' editable technologies');
if(!await ev(`document.querySelector('svg[class*="text-[#149eca]"]')!==null`))throw Error('Brand icon color missing');console.log('PASS brand icon colors');
await ev(`[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Add Starter Content').click()`);
await waitFor("!document.querySelector('[role=status]')");
if(await ev('Object.values(window.testStore).flatMap(category=>category.technologies).length')!==technologies.length)throw Error('Repeated seed duplicates');console.log('PASS repeat seed creates no duplicates');
await ev("document.querySelector('table tbody tr button').click()");await waitFor("document.querySelector('details summary')");await ev("document.querySelector('details summary').click()");
if(!await ev(`document.querySelector('details textarea').value.trim().length>0`))throw Error('Empty form');console.log('PASS automatically seeded content opens in admin editor');
for(const width of [390,768,1440]){await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===390});if(!await ev(`document.documentElement.scrollWidth<=${width}`))throw Error('Editor overflow '+width);}
await ev("document.querySelector('details').scrollIntoView({block:'start'})");await fs.writeFile('/tmp/adat-seeded-admin.png',Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
console.log('PASS admin mobile/tablet/desktop');
if(exceptions.length)throw Error(exceptions.join(','));ws.close();children.forEach(child=>child.kill());
