import {test} from 'node:test';import assert from 'node:assert/strict';import {products,overlaps,search} from '../shared/products.js';
test('combination product reveals shared ingredient',()=>{let r=overlaps([products[0],products[1]]);assert.equal(r.length,1);assert.equal(r[0].ingredient,'paracetamol');});
test('different ingredients have no overlap',()=>assert.equal(overlaps([products[0],products[4]]).length,0));
test('unknown products never enter matching',()=>assert.equal(overlaps([products[0],{name:'Unknown'}]).length,0));
test('XR strength and form remain distinct',()=>{assert.equal(search('Ace XR')[0].strength,'665 mg');assert.equal(search('8941100962244')[0].id,'ace');});
test('liquid concentration is preserved',()=>assert.equal(products[5].ingredients[0][1],'5 mg/5 ml'));
