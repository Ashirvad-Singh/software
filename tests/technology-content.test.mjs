import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultTechnologyPage, findDefaultTechnology, technologySlug, initializeTechnology } from '../src/data/technologyDetails.ts';

test('existing technology URLs resolve to their own defaults', () => {
  for (const [url, expected] of [['reactjs','react'],['nextjs','nextjs'],['nodejs','nodejs'],['shopifydevelopment','shopify']]) {
    assert.equal(findDefaultTechnology(url)?.slug, expected);
  }
  assert.equal(findDefaultTechnology('unlisted-technology'), undefined);
});
test('a new technology starts with its own identity and editable starter sections', () => {
  const page = defaultTechnologyPage('Custom Platform', 'Backend');
  assert.equal(page.name, 'Custom Platform');
  assert.equal(page.category, 'Backend');
  assert.ok(page.benefits.length);
  assert.ok(page.faqs.length);
  assert.equal(technologySlug('Custom Platform'), 'customplatform');
});
test('editing starter content does not mutate other technology pages and remains serializable', () => {
  const page = defaultTechnologyPage('React.js', 'Frontend');
  page.benefits[0].title = 'Edited benefit';
  assert.notEqual(defaultTechnologyPage('React.js', 'Frontend').benefits[0].title, 'Edited benefit');
  assert.equal(typeof page.benefits[0].icon, 'string');
  assert.deepEqual(JSON.parse(JSON.stringify(page)), page);
});

test('initialization preserves custom content, avoids duplicates, and respects later removals', () => {
  const first = initializeTechnology({name:'Laravel', page:{overview:'Written by admin', useCases:[{title:'Custom workflow',desc:'Our copy'}]}}, 'Backend');
  assert.equal(first.page.overview, 'Written by admin');
  assert.deepEqual(first.page.useCases, [{title:'Custom workflow',desc:'Our copy'}]);
  assert.ok(first.page.process.length);
  assert.deepEqual(initializeTechnology(first, 'Backend'), first);
  first.page.process=[]; first.page.tagline='';
  assert.deepEqual(initializeTechnology(first, 'Backend'),first);
});
test('all configured starter technologies have complete editable defaults', async () => {
  const {readFileSync}=await import('node:fs');
  const source=readFileSync(new URL('../src/components/dashboard/TechStackTab.tsx',import.meta.url),'utf8');
  const starter=source.split('const STARTER_TECH_STACK')[1].split('export default')[0];
  const names=[...starter.matchAll(/name: "([^"]+)"/g)].map(match=>match[1]);
  names.push('WordPress','JavaScript');
  const listing=readFileSync(new URL('../src/data/technologyCatalog.ts',import.meta.url),'utf8');
  names.push(...[...listing.matchAll(/name: "([^"]+)"/g)].map(match=>match[1]));
  for(const name of names){
    const page=defaultTechnologyPage(name,'Development');
    for(const [key,value] of Object.entries(page)) assert.ok(Array.isArray(value)?value.length:typeof value==='string'&&value.trim(),`${name}: ${key}`);
    assert.ok(page.useCases.length>=4, name);
    assert.ok(page.process.length>=4, name);
  }
  assert.notDeepEqual(defaultTechnologyPage('Laravel','Backend').process,defaultTechnologyPage('PHP','Backend').process);
});
