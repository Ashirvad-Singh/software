import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyClientReview, normalizeEntry, validateClientReview} from '../src/lib/content/model.ts';
test('review roundtrip and legacy records',()=>{
  const legacy=normalizeEntry('old',{title:'Legacy'});
  assert.equal(legacy.clientReview.enabled,false);
  const clientReview={...emptyClientReview(),enabled:true,clientName:'Test fixture',testimonial:'Test-only feedback',rating:3};
  assert.deepEqual(normalizeEntry('new',JSON.parse(JSON.stringify({clientReview}))).clientReview,clientReview);
  for(const rating of [0,6,1.5,NaN]) assert.ok(validateClientReview({...clientReview,rating}));
  for(const rating of [1,2,3,4,5]) assert.equal(validateClientReview({...clientReview,rating}),null);
  assert.ok(validateClientReview({...clientReview,clientPhoto:'javascript:alert(1)'}));
});
