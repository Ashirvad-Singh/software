// Run against a local Vite server and Chrome with --remote-debugging-port=9223.
// All content/database data is intercepted in Chrome; no Firebase writes occur.
const siteUrl = process.env.CONTENT_TEST_URL || "http://127.0.0.1:5174";
import fs from 'node:fs/promises';
const targets = await (await fetch('http://127.0.0.1:9223/json/list')).json();
const ws = new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map(); const exceptions=[];
const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}));});
const fixture = `import {normalizeEntry} from '/src/lib/content/model.ts';
export function useContent(kind){
const base={status:'published',image:'/adat_hero_ui.webp',category:'Web',industry:'Retail',description:'A responsive commerce platform connecting customers with a simpler shopping experience.',client:'Example company',services:['Design','Development'],technologies:['React','Node.js'],timeline:'12 weeks',gallery:['/adat_mobile_app.webp']};
const projects=Array.from({length:8},(_,i)=>normalizeEntry('p'+i,{...base,title:'Commerce Platform '+(i+1),slug:'project-'+i,featured:i===0,industry:i%2?'Healthcare':'Retail'}));
const stories=[normalizeEntry('s0',{...base,title:'How a simpler checkout improved the buying experience',slug:'checkout-story',projectId:'p0',overview:'A focused redesign of the buying journey.',background:'An established retailer expanding online.',challenge:'Customers struggled with a complicated checkout.',goals:'Make checkout easier.',approach:'Research and rapid prototyping.',solution:'A streamlined checkout.',process:'Discovery, design, development, and launch.',features:['Guest checkout','Order tracking'],tools:'React for the storefront.',outcomes:'A simpler shopping journey.',metrics:'25%|Fewer checkout steps',testimonial:'A thoughtful team.',testimonialAuthor:'Example client',ctaTitle:'Build your next success story',ctaLabel:'Start a project'}),normalizeEntry('s1',{...base,title:'Connecting operations with a unified dashboard',slug:'operations-story',overview:'Operational clarity.',challenge:'Disconnected workflows.',solution:'A shared dashboard.',outcomes:'Better visibility.'})];
return {entries: location.search.includes('empty') ? [] : kind==='projects'?projects:stories,loading:false,error:location.search.includes('error'),retry:()=>{}};
}`;
ws.addEventListener('message',async e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p?.reject(m.error):p?.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')exceptions.push(m.params.exceptionDetails.text);if(m.method==='Fetch.requestPaused'){const p=m.params;await send('Fetch.fulfillRequest',{requestId:p.requestId,responseCode:200,responseHeaders:[{name:'Content-Type',value:'text/javascript'}],body:Buffer.from(fixture).toString('base64')});}});
await send('Page.enable');await send('Runtime.enable');await send('Fetch.enable',{patterns:[{urlPattern:'*src/lib/content/useContent.ts*'}]});
const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
async function waitFor(expression){for(let i=0;i<100;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,200));}throw Error('Timed out '+expression);}
async function go(path){await send('Page.navigate',{url:siteUrl+path});await waitFor("!!document.querySelector('main h1')");}
function check(value,message){if(!value)throw Error(message);console.log('PASS',message);}
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await go('/work');await waitFor("document.querySelectorAll('main a[href^=\"/work/project-\"]').length===6");
check(await evaluate("[...document.querySelectorAll('a')].some(a=>a.textContent.trim()==='Our Work' && a.getAttribute('href')==='/work')"),'Our Work navigation');
await evaluate("[...document.querySelectorAll('button')].find(b=>b.textContent==='Load more').click()");
await waitFor("document.querySelectorAll('main a[href^=\"/work/project-\"]').length===8");console.log('PASS load more');
await evaluate("[...document.querySelectorAll('button')].find(b=>b.textContent==='Healthcare').click()");await waitFor("document.querySelectorAll('main a[href^=\"/work/project-\"]').length===4");console.log('PASS category filter');
await go('/work');await waitFor("document.querySelectorAll('main a[href^=\"/work/project-\"]').length===6");
await fs.writeFile('/tmp/adat-projects-desktop.png',Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
await go('/work/project-0');await waitFor("document.body.innerText.includes('What we built')");
check(await evaluate("!!document.querySelector('a[href=\"/case-studies/checkout-story\"]')"),'project links to case study');
check(await evaluate("!document.querySelector('main').innerText.includes('The challenge')"),'project detail stays focused on deliverables');
await go('/case-studies/checkout-story');await waitFor("document.body.innerText.includes('Impact in numbers')");
check(await evaluate("!!document.querySelector('a[href=\"/work/project-0\"]')"),'case study links to project');
check(await evaluate("document.querySelector('main').innerText.includes('Related case studies')"),'related stories render');
await go('/case-studies');await waitFor("document.querySelectorAll('main a[href^=\"/case-studies/\"]').length===2");
await fs.writeFile('/tmp/adat-studies-desktop.png',Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await go('/work');await waitFor("document.querySelectorAll('main a[href^=\"/work/project-\"]').length===6");
check(await evaluate('document.documentElement.scrollWidth<=390'),'mobile projects no horizontal overflow');
await fs.writeFile('/tmp/adat-projects-mobile.png',Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
await go('/case-studies/checkout-story');await waitFor("document.body.innerText.includes('Impact in numbers')");check(await evaluate('document.documentElement.scrollWidth<=390'),'mobile story no horizontal overflow');
await go('/work?empty');await waitFor("document.body.innerText.includes('New projects are on the way')");console.log('PASS empty state');
await go('/work?error');await waitFor("document.body.innerText.includes('We couldn’t load this collection.')");console.log('PASS error state');
await go('/work/missing');await waitFor("document.body.innerText.includes('Project not found')");console.log('PASS missing detail');
check(exceptions.length===0,'no browser runtime exceptions: '+exceptions.join(','));
ws.close();
