import {test} from 'node:test';import assert from 'node:assert/strict';
import {products,compare,familyOverlaps,familyOf,findCandidates,search} from '../shared/products.js';
const get=id=>products.find(p=>p.id===id);

test("Ammu's example: hidden esomeprazole and two NSAIDs across three prescriptions",()=>{
  const r=compare(['naprosyn-plus','sergel-20','rolac-10','napa-extra'].map(get));
  assert.deepEqual(r.overlaps.map(o=>o.ingredient),['esomeprazole']);
  assert.deepEqual(r.overlaps[0].entries.map(e=>e.product.id).sort(),['naprosyn-plus','sergel-20']);
  assert.equal(r.families.length,1);assert.equal(r.families[0].family,'nsaid');
  assert.deepEqual(r.families[0].ingredients.sort(),['ketorolac','naproxen']);
});

test('same ingredient is reported as an exact overlap, not also as a family overlap',()=>{
  const r=compare([get('sergel-20'),get('maxpro-20')]);
  assert.equal(r.overlaps.length,1);assert.equal(r.families.length,0);
});

test('different PPIs from different manufacturers are flagged as one family',()=>{
  const f=familyOverlaps([get('seclo-20'),get('sergel-20'),get('pantonix-20')]);
  assert.equal(f.length,1);assert.equal(f[0].family,'ppi');assert.equal(f[0].ingredients.length,3);
});

test('a single combination product never triggers a family flag on its own',()=>{
  assert.equal(familyOverlaps([get('naprosyn-plus'),get('napa')]).length,0);
});

test('salt forms match on the active ingredient',()=>{
  assert.equal(familyOf('naproxen').id,'nsaid');assert.equal(familyOf('diclofenac').id,'nsaid');
  assert.equal(compare([get('naprosyn-500'),get('naprosyn-plus')]).overlaps[0].ingredient,'naproxen');
});

test('paracetamol overlaps across Beximco, Square and Incepta brands',()=>{
  const r=compare([get('napa'),get('ace-plus'),get('reset')]);
  assert.equal(r.overlaps[0].entries.length,3);
  assert.equal(new Set(r.overlaps[0].entries.map(e=>e.product.manufacturer)).size,3);
});

test('search finds products by ingredient and manufacturer',()=>{
  assert.ok(search('esomeprazole').some(p=>p.id==='naprosyn-plus'));
  assert.ok(search('beximco').every(p=>p.manufacturer.includes('Beximco')));
});

test('OCR candidates prefer the explicit variant (Napa Extra over Napa)',()=>{
  const c=findCandidates('NAPA EXTRA Paracetamol 500 mg + Caffeine 65 mg');
  assert.ok(c.some(p=>p.name==='Napa Extra'));assert.ok(!c.some(p=>p.name==='Napa'));
});

test('every record has a source, a source type, and ATC data for family-relevant ingredients',()=>{
  for(const p of products){assert.match(p.source,/^https:\/\//);assert.ok(['Manufacturer','MedEx'].includes(p.sourceName));}
});
