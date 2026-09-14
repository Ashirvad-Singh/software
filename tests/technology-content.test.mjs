import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultTechnologyPage, findDefaultTechnology, technologySlug } from '../src/data/technologyDetails.ts';

test('existing technology URLs resolve to their own defaults', () => {
  for (const [url, expected] of [['reactjs','react'],['nextjs','nextjs'],['nodejs','nodejs'],['shopifydevelopment','shopify']]) {
    assert.equal(findDefaultTechnology(url)?.slug, expected);
  }
  assert.equal(findDefaultTechnology('unlisted-technology'), undefined);
});
test('a new technology starts with its own identity and empty editable sections', () => {
  const page = defaultTechnologyPage('Custom Platform', 'Backend');
  assert.equal(page.name, 'Custom Platform');
  assert.equal(page.category, 'Backend');
  assert.deepEqual(page.benefits, []);
  assert.deepEqual(page.faqs, []);
  assert.equal(technologySlug('Custom Platform'), 'customplatform');
});
test('editing starter content does not mutate other technology pages and remains serializable', () => {
  const page = defaultTechnologyPage('React.js', 'Frontend');
  page.benefits[0].title = 'Edited benefit';
  assert.notEqual(defaultTechnologyPage('React.js', 'Frontend').benefits[0].title, 'Edited benefit');
  assert.equal(typeof page.benefits[0].icon, 'string');
  assert.deepEqual(JSON.parse(JSON.stringify(page)), page);
});
