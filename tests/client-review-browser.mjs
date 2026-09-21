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
const app=`import React from '${reactPath}';import {Routes,Route} from '${routerPath}';import ProjectsTab from '/src/components/dashboard/ProjectsTab.tsx';import ContentDetail from '/src/components/content/ContentDetail.tsx';import Footer from '/src/components/site/Footer.tsx';import ContactPage from '/src/pages/ContactPage.tsx';export default function App(){return React.createElement(React.Fragment,null,React.createElement(Routes,null,React.createElement(Route,{path:'/dashboard',element:React.createElement(ProjectsTab)}),React.createElement(Route,{path:'/work/:slug',element:React.createElement(ContentDetail,{kind:'projects'})}),React.createElement(Route,{path:'/contact',element:React.createElement(ContactPage)})),React.createElement(Footer));}`;
const firestore=`const store=window.testStore;let seq=0;export function collection(db,name){return {path:name}};export function doc(db,name,id){return id?{path:name+'/'+id,id}:{path:db.path+'/'+(++seq),id:String(seq)}};export const serverTimestamp=()=>0;export const orderBy=()=>{};export const where=()=>{};export const query=ref=>ref;export async function getDocs(ref){return {docs:Object.entries(store).filter(([k])=>k.startsWith(ref.path+'/')).map(([path,value])=>({id:path.split('/')[1],data:()=>value}))}};export async function updateDoc(ref,data){store[ref.path]={...store[ref.path],...data}};export async function runTransaction(db,fn){return fn({get:async ref=>({exists:()=>!!store[ref.path],data:()=>store[ref.path]}),set:(ref,data)=>{store[ref.path]={...store[ref.path],...data}},delete:ref=>{delete store[ref.path]}})};export async function addDoc(){throw Error('Unexpected contact submission')};`;
ws.addEventListener('message',async e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);if(m.error)p?.reject(m.error);else p?.resolve(m.result);}if(m.method==='Runtime.exceptionThrown'){exceptions.push(m.params.exceptionDetails.text);console.log('RUNTIME',m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);}if(m.method==='Fetch.requestPaused'){const p=m.params;const url=p.request.url;const source=url.includes('/src/App.tsx')?app:url.includes('/src/lib/firebase.ts')?'export const db = {};':firestore;await send('Fetch.fulfillRequest',{requestId:p.requestId,responseCode:200,responseHeaders:[{name:'Content-Type',value:'text/javascript'}],body:Buffer.from(source).toString('base64')});}});
await send('Page.enable');await send('Runtime.enable');await send('Fetch.enable',{patterns:[{urlPattern:'*/src/App.tsx*'},{urlPattern:'*/src/lib/firebase.ts*'},{urlPattern:'*/firebase_firestore.js*'}]});

await send('Page.addScriptToEvaluateOnNewDocument',{source:'window.testStore={};'});
const ev=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
async function waitFor(expression){for(let i=0;i<150;i++){if(await ev(`Boolean(${expression})`))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out '+expression);}
const click=async text=>{await ev(`[...document.querySelectorAll('button')].find(b=>b.textContent===${JSON.stringify(text)}).click()`);await new Promise(r=>setTimeout(r,100));};
const field=async(label,value)=>{await ev(`(()=>{const label=[...document.querySelectorAll('label')].find(l=>l.firstElementChild?.textContent===${JSON.stringify(label)}||l.childNodes[0]?.textContent===${JSON.stringify(label)});const el=label.querySelector('input,textarea,select');Object.getOwnPropertyDescriptor(el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:el.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));})()`);};
await send('Page.navigate',{url:'http://127.0.0.1:5174/dashboard'});await waitFor("document.body.innerText.includes('No entries yet')");
await click('Add Project');await field('Title *','Review fixture');await field('Category *','Web');await field('Short description *','A test-only project.');await field('Cover image URL','/adat-logo.png');await field('Status','published');
await ev(`[...document.querySelectorAll('label')].find(l=>l.textContent==='Enable Client Review').querySelector('input').click()`);
await field('Client Name','Fixture Client');await field('Client Role','Founder');await field('Client Company','Fixture Company');await field('Rating','3');await field('Testimonial','Test-only project review.');await click('Save & publish');
await waitFor("window.testStore['projects/1']?.clientReview?.rating===3");console.log('PASS review create persisted');
await click('Edit');await field('Testimonial','Updated test-only project review.');await field('Rating','4');await click('Save & publish');await waitFor("window.testStore['projects/1']?.clientReview?.rating===4");console.log('PASS review update persisted');
const saved=await ev('window.testStore');saved['projects/legacy']={...saved['projects/1'],slug:'legacy',title:'Legacy',clientReview:undefined};
saved['projects/disabled']={...saved['projects/1'],slug:'disabled',clientReview:{...saved['projects/1'].clientReview,enabled:false}};
saved['projects/blank']={...saved['projects/1'],slug:'blank',clientReview:{...saved['projects/1'].clientReview,testimonial:'   '}};
await send('Page.addScriptToEvaluateOnNewDocument',{source:`window.testStore=${JSON.stringify(saved)}`});
await send('Page.navigate',{url:'http://127.0.0.1:5174/work/review-fixture'});await waitFor("document.body.innerText.includes('Updated test-only project review.')");
if(!await ev(`document.querySelector('[aria-label="Client review"] [role="img"]').getAttribute('aria-label')==='4 out of 5 stars' && document.querySelectorAll('[aria-label="Client review"] svg[fill="currentColor"]').length===4`))throw Error('Incorrect stars');
console.log('PASS project detail displays saved review with four filled stars');
for(const width of [390,768,1440]){await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===390});if(!await ev(`document.documentElement.scrollWidth<=${width}`))throw Error('Overflow '+width);}
await ev(`document.querySelector('[aria-label="Client review"]').scrollIntoView({block:'center'})`);
await fs.writeFile('/tmp/adat-project-review.png',Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
console.log('PASS project review mobile/tablet/desktop');
await send('Page.navigate',{url:'http://127.0.0.1:5174/work/legacy'});await waitFor("document.querySelector('h1')?.textContent==='Legacy'");if(await ev(`!!document.querySelector('[aria-label="Client review"]')`))throw Error('Legacy review displayed');console.log('PASS legacy project without review');
for(const slug of ['disabled','blank']){await send('Page.navigate',{url:'http://127.0.0.1:5174/work/'+slug});await waitFor("document.querySelector('h1')?.textContent==='Review fixture'");if(await ev(`!!document.querySelector('[aria-label="Client review"]')`))throw Error('Empty or disabled review rendered');}
console.log('PASS disabled and whitespace-only reviews hidden');
await send('Page.navigate',{url:'http://127.0.0.1:5174/contact'});await waitFor(`document.querySelectorAll('a[aria-label*="ADAT Soft Solutions on"]').length===6`);
const links=await ev(`[...document.querySelectorAll('a[aria-label*="ADAT Soft Solutions on"]')].map(a=>({label:a.getAttribute('aria-label'),href:a.href,target:a.target,rel:a.rel}))`);
if(links.some(a=>a.target!=='_blank'||a.rel!=='noopener noreferrer')||!['LinkedIn','Glassdoor','AmbitionBox'].every(name=>links.filter(a=>a.label.includes(name)).length===2))throw Error('Incorrect company links');
for(const width of [390,768,1440]){await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===390});if(!await ev(`document.documentElement.scrollWidth<=${width}`))throw Error('Contact overflow '+width);}
await new Promise(r=>setTimeout(r,900));
await ev(`document.querySelector('a[aria-label*="ADAT Soft Solutions on"]').scrollIntoView({block:'center'})`);
await fs.writeFile('/tmp/adat-contact-links.png',Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
console.log('PASS exact company links and responsive contact/footer');
if(exceptions.length)throw Error(exceptions.join(','));console.log('PASS no runtime errors');ws.close();children.forEach(child=>child.kill());
