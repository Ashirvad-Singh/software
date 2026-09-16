// Local browser audit. Firebase, authentication, email and uploads are mocked;
// this test never writes production records or sends messages.
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
const widths=(process.env.AUDIT_WIDTHS || '390,768,1440').split(',').map(Number);
const base = process.env.AUDIT_URL || 'http://127.0.0.1:5176';
const chrome = spawn('google-chrome', ['--headless=new', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=9238', '--user-data-dir=/tmp/adat-site-audit', 'about:blank'], {stdio:'ignore'});
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
try {
let targets;
for (let i=0;i<60;i++) { try { targets=await (await fetch('http://127.0.0.1:9238/json/list')).json(); break; } catch { await delay(200); } }
ws = new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let id=0; const pending=new Map(); const exceptions=[];
const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
const fixtures={
 'services/s1':{title:'Backend Commerce Service',slug:'commerce',description:'Commerce experiences managed from the dashboard.',longDescription:'Full backend service description.',benefits:'Clear navigation\nAccessible checkout',process:'Discover: Research customer needs\nBuild: Deliver the storefront',features:'React, Shopify',createdAt:1,thumbnailUrl:'/adat_hero_ui.webp'},
 'blogs/b1':{title:'Backend Article',slug:'backend-article',excerpt:'An article managed in the dashboard.',author:'ADAT',date:'2026-09-16',readTime:'3 min',category:'Engineering',image:'/adat_hero_ui.webp',content:'<h2>Discovery</h2><p>Article from the backend.</p><h3>Delivery</h3><p>Build and verify.</p><img src="x" onerror="window.articleUnsafe=true"><script>window.articleUnsafe=true</script>',featured:true,createdAt:1},
 'jobs/j1':{title:'Frontend Engineer',active:true,department:'Engineering',type:'Full-time',location:'Remote',description:'Build accessible web experiences.',requirements:'React\nTypeScript',createdAt:1},
 'projects/p1':{title:'Backend Project',slug:'backend-project',status:'published',description:'Backend portfolio entry.',image:'/adat_hero_ui.webp',category:'Web',industry:'Retail',featured:true,createdAt:1},
 'case_studies/c1':{title:'Backend Case Study',slug:'backend-case-study',status:'published',description:'Backend case study.',image:'/adat_hero_ui.webp',projectId:'p1',createdAt:1},
};
const firestore=`
const read=()=>JSON.parse(sessionStorage.auditStore||'{}');const write=s=>sessionStorage.auditStore=JSON.stringify(s);
export const collection=(db,path)=>({path}); export const doc=(db,path,id)=>({path:path+'/'+id,id});
export const where=(field,op,value)=>({field,op,value});export const orderBy=()=>({});export const limit=count=>({count});export const query=(ref,...filters)=>({...ref,filters});
export async function getDocs(ref){if(sessionStorage.auditError==='true')throw Error('Offline');const docs=Object.entries(read()).filter(([path,data])=>path.startsWith(ref.path+'/')&&(ref.filters||[]).every(f=>!f.field||data[f.field]===f.value)).map(([path,data])=>({id:path.split('/')[1],data:()=>data}));return {docs,empty:!docs.length};}
export async function getDoc(ref){const data=read()[ref.path];return {id:ref.id,exists:()=>!!data,data:()=>data};}
export async function addDoc(ref,data){if(sessionStorage.auditWriteError==='true')throw Error('Write rejected');const store=read();const id='saved-'+Date.now();store[ref.path+'/'+id]=data;write(store);return {id};}
export async function updateDoc(ref,data){const store=read();store[ref.path]={...store[ref.path],...data};write(store);}
export async function deleteDoc(ref){const store=read();delete store[ref.path];write(store);}
export const writeBatch=()=>({set(){},delete(){},commit:async()=>{}});export const runTransaction=async(db,fn)=>fn({get:getDoc,set(){},update(){},delete(){}});
export const serverTimestamp=()=>({seconds:Date.now()/1000});`;
ws.addEventListener('message',async event=>{
 const message=JSON.parse(event.data);
 if(message.id){const waiter=pending.get(message.id);pending.delete(message.id);if(message.error) waiter?.reject(message.error); else waiter?.resolve(message.result);}
 if(message.method==='Runtime.exceptionThrown'){exceptions.push(message.params.exceptionDetails.exception?.description||message.params.exceptionDetails.text);console.log('RUNTIME',exceptions.at(-1));} if(message.method==='Runtime.consoleAPICalled'&&message.params.type==='error')console.log('CONSOLE',message.params.args.map(a=>a.value||a.description).join(' '));
 if(message.method==='Fetch.requestPaused'){
  const {requestId,request}=message.params;let source;
  if(request.url.includes('firebase_firestore.js'))source=firestore;
  else if(request.url.includes('/src/lib/firebase.ts'))source='export const db={};export const auth={};export const storage={};';
  else if(request.url.includes('firebase_auth.js'))source='export const onAuthStateChanged=(auth,callback)=>{callback({uid:"test-admin"});return ()=>{}};export const signInWithEmailAndPassword=async()=>{};export const signOut=async()=>{};';
  else if(request.url.includes('/src/lib/email.ts'))source='export const sendContactEmail=async()=>false;export const sendJobApplicationEmail=async()=>false;export const sendJobStatusUpdateEmail=async()=>false;';
  else source=JSON.stringify({secure_url:'https://example.test/resume.pdf'});
  await send('Fetch.fulfillRequest',{requestId,responseCode:200,responseHeaders:[{name:'Content-Type',value:request.url.includes('cloudinary')?'application/json':'text/javascript'},{name:'Access-Control-Allow-Origin',value:'*'}],body:Buffer.from(source).toString('base64')});
 }
});
await send('Page.enable'); await send('Runtime.enable');
await send('Fetch.enable',{patterns:[{urlPattern:'*/src/lib/firebase.ts*'},{urlPattern:'*firebase_firestore.js*'},{urlPattern:'*firebase_auth.js*'},{urlPattern:'*/src/lib/email.ts*'},{urlPattern:'https://api.cloudinary.com/*'}]});
await send('Page.addScriptToEvaluateOnNewDocument',{source:`if(!sessionStorage.auditStore)sessionStorage.auditStore=${JSON.stringify(JSON.stringify(fixtures))};window.confirm=()=>true;`});
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
const ev=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
async function wait(expression){for(let n=0;n<100;n++){if(await ev(expression))return;await delay(100);}console.log(await ev('document.body.innerText.slice(0,2500)'));console.log(await ev(`Array.from(document.querySelectorAll('form :invalid')).map(e=>({name:e.name,message:e.validationMessage}))`));throw Error('Timed out: '+expression);}
const check=(value,label)=>{if(!value)throw Error(label);console.log('PASS '+label);};
async function go(path){await send('Page.navigate',{url:base+path});await wait('!!document.querySelector("main")');await delay(300);}
async function fill(name,value){await ev(`(()=>{const e=document.querySelector('form [name="${name}"]');const proto=e.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(e,${JSON.stringify(value)});e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));})()`);}
const routes=process.env.AUDIT_ROUTES?process.env.AUDIT_ROUTES.split(','):['/','/about','/services','/services/commerce','/work','/work/backend-project','/case-studies','/case-studies/backend-case-study','/blog','/blog/backend-article','/careers','/careers/j1','/contact','/technologies','/team','/gallery','/privacy','/terms'];
for(const width of (process.env.AUDIT_MODE==='flows'?[]:widths)){
 await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});
 for(const route of routes){
  await go(route);
  await ev('window.scrollTo(0,document.body.scrollHeight/2)');await delay(120);
  const dimensions=await ev('({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth})');
  if(dimensions.scroll>dimensions.width+1){console.log(await ev(`Array.from(document.querySelectorAll('main *')).filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+2||r.left< -2)&&getComputedStyle(e).position!=='absolute'}).slice(0,12).map(e=>({tag:e.tagName,cls:e.className,width:e.getBoundingClientRect().width}))`));throw Error('Overflow '+route+' '+width);}
  console.log('PASS layout '+width+' '+route);
  if(width===320&&['/services','/contact','/blog/backend-article'].includes(route)){await ev(`(document.querySelector('main form')||document.querySelector('main #services')||document.querySelector('article')).scrollIntoView();window.scrollBy(0,-110)`);await delay(700);await fs.writeFile('/tmp/adat-audit-'+route.replaceAll('/','-')+'.png',Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));}
 }
}
if(process.env.AUDIT_MODE!=='layout'){
await go('/blog/backend-article');await wait('!!document.querySelector("#article-section-1")');
check(await ev('document.querySelectorAll("nav[aria-label=\\"Table of contents\\"] a").length===2'),'article TOC uses backend headings');
check(await ev('!window.articleUnsafe && !document.querySelector("article [onerror]")'),'article excludes executable markup');
for(const [route,text] of [['/services/missing','Service not found'],['/blog/missing','Post not found'],['/careers/missing','Job not found'],['/work/missing','Project not found']]){await go(route);await wait(`document.body.innerText.includes(${JSON.stringify(text)})`);console.log('PASS missing record '+route);}
await ev(`sessionStorage.auditError='true'`);await go('/services');await wait('document.body.innerText.includes("We couldn’t load services")');await ev(`sessionStorage.auditError='false';[...document.querySelectorAll('main button')].find(b=>b.textContent==='Try again').click()`);await wait('document.body.innerText.includes("Backend Commerce Service")');console.log('PASS backend error and retry');
await ev(`sessionStorage.auditStore='{}'`);await go('/blog');await wait('document.body.innerText.includes("No articles available yet")');check(await ev('!document.body.innerText.includes("The Future of Web Development")'),'empty backend does not show demo blogs');
await ev(`sessionStorage.auditStore=${JSON.stringify(JSON.stringify(fixtures))}`);
// Dashboard create -> persisted record -> public detail.
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await go('/dashboard');await wait('document.body.innerText.includes("Services")');await ev(`[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Services').click()`);await wait('document.body.innerText.includes("Add Service")');await ev(`[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Add Service')).click()`);
for(const [name,value] of Object.entries({title:'New CMS Service',slug:'New CMS Service',description:'Saved through the dashboard.',longDescription:'CMS service body.',benefits:'Responsive design',process:'Build: Implement the service',features:'React'}))await fill(name,value);
await ev('document.querySelector("form").requestSubmit()');await wait(`Object.values(JSON.parse(sessionStorage.auditStore)).some(r=>r.slug==='new-cms-service')`);await go('/services/new-cms-service');await wait('document.body.innerText.includes("New CMS Service")');console.log('PASS dashboard service create to public detail');
check(await ev(`import('/src/lib/content/catalogValidation.ts').then(async m=>{try{await m.validateCatalogSlug('services','commerce',null);return false;}catch(e){return e.message.includes('already in use');}})`),'duplicate service slugs are rejected');
await go('/dashboard');await ev(`[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Blogs & Articles').click()`);await wait('document.body.innerText.includes("Add Blog")');await ev(`[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Add Blog')).click()`);
for(const [name,value] of Object.entries({title:'New CMS Article',slug:'new-cms-article',category:'Engineering',author:'ADAT',date:'2026-09-16',readTime:'2 min',excerpt:'Saved through the dashboard.',content:'<h2>CMS heading</h2><p>CMS body.</p>'}))await fill(name,value);
await ev('document.querySelector("form").requestSubmit()');await wait(`Object.values(JSON.parse(sessionStorage.auditStore)).some(r=>r.slug==='new-cms-article')`);await go('/blog/new-cms-article');await wait('document.body.innerText.includes("CMS heading")');console.log('PASS dashboard blog create to public detail');
await go('/contact');for(const [name,value] of Object.entries({fullName:'Audit User',email:'audit@example.test',phone:'9876543210',company:'Audit',subject:'Integration check',message:'Testing persistence without sending real messages.'}))await fill(name,value);
await ev('document.querySelector("form").requestSubmit()');await wait(`Object.entries(JSON.parse(sessionStorage.auditStore)).some(([key,r])=>key.startsWith('contact_submissions/')&&r.subject==='Integration check')`);console.log('PASS contact saves to dashboard collection with email unavailable');
await ev(`sessionStorage.auditWriteError='true'`);for(const [name,value] of Object.entries({fullName:'Rejected User',email:'rejected@example.test',phone:'9876543210',subject:'Rejected write',message:'This should remain in the form after a failed save.'}))await fill(name,value);await ev('document.querySelector("form").requestSubmit()');await wait('document.body.innerText.includes("Failed to send message")');check(await ev(`!Object.values(JSON.parse(sessionStorage.auditStore)).some(r=>r.subject==='Rejected write') && document.querySelector('form [name=message]').value.includes('remain in the form')`),'failed submissions are not saved and retain input');await ev(`sessionStorage.auditWriteError='false'`);
await go('/careers/j1');for(const [name,value] of Object.entries({fullName:'Audit Applicant',email:'applicant@example.test',phone:'9876543210',currentCity:'Delhi',experience:'3',noticePeriod:'30 days',skills:'React and TypeScript'}))await fill(name,value);
await ev(`(()=>{const e=document.querySelector('input[type=file]');const dt=new DataTransfer();dt.items.add(new File(['Audit resume'],'resume.pdf',{type:'application/pdf'}));e.files=dt.files;e.dispatchEvent(new Event('change',{bubbles:true}));})()`);
await ev('document.querySelector("form").requestSubmit()');await wait(`Object.entries(JSON.parse(sessionStorage.auditStore)).some(([key,r])=>key.startsWith('job_applications/')&&r.jobId==='j1'&&r.resumeDownloadURL==='https://example.test/resume.pdf')`);console.log('PASS job application saves resume, job ID and position');
}
check(!exceptions.length,'no runtime exceptions: '+exceptions.join('\n'));
await fs.writeFile('/tmp/adat-site-audit-result.json',JSON.stringify({routes:process.env.AUDIT_MODE==='flows'?0:routes.length,widths:process.env.AUDIT_MODE==='flows'?[]:widths,mode:process.env.AUDIT_MODE||'all',passed:true},null,2));
} finally { ws?.close();chrome.kill(); }
