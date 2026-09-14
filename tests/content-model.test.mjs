import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeEntry, listValue, slugify, safeUrl, sortEntries } from '../src/lib/content/model.ts';
test('publication is explicit; legacy and invalid statuses remain drafts', () => {
  for (const status of [undefined, 'draft', 'unpublished', true]) assert.equal(normalizeEntry('a', {status}).status, 'draft');
  assert.equal(normalizeEntry('a', {status:'published'}).status, 'published');
});
test('legacy strings and modern arrays normalize without corrupting gallery URLs', () => {
  const item = normalizeEntry('a', {tags:'React, Node.js', gallery:'https://example.com/a?size=1,2\nhttps://example.com/b', metrics:'25%|Growth\ninvalid\n2x|Speed|measured'});
  assert.deepEqual(item.technologies, ['React','Node.js']);
  assert.equal(item.gallery[0], 'https://example.com/a?size=1,2');
  assert.deepEqual(item.metrics, [{value:'25%',label:'Growth'},{value:'2x',label:'Speed|measured'}]);
  assert.deepEqual(normalizeEntry('b', {technologies:['TypeScript'], metrics:[{value:'10',label:'Teams'},null,{}]}).metrics,[{value:'10',label:'Teams'}]);
  assert.deepEqual(listValue([' React ', '', 42]), ['React']);
});
test('slugs normalize punctuation and accents; unsafe live URLs are rejected', () => {
  assert.equal(slugify('  Café & Commerce — Website! '),'cafe-commerce-website');
  for(const url of ['javascript:alert(1)','data:text/html,x','//example.com','invalid']) assert.equal(safeUrl(url),'');
  assert.equal(safeUrl('https://example.com/demo'),'https://example.com/demo');
});
test('featured entries sort first, then newest; source order is unchanged', () => {
  const entries = [normalizeEntry('a',{createdAt:20}),normalizeEntry('b',{featured:true,createdAt:1}),normalizeEntry('c',{createdAt:40})];
  assert.deepEqual(sortEntries(entries).map(e=>e.id),['b','c','a']);
  assert.deepEqual(entries.map(e=>e.id),['a','b','c']);
});
