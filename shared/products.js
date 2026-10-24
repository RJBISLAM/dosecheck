// Source-backed demonstration catalogue for Bangladesh.
// Every product record links to the page it was checked against (manufacturer site or MedEx, Bangladesh's
// public drug index). Ingredient names are stored as the active moiety (e.g. "naproxen" for naproxen sodium)
// so the same drug matches across salt forms. Drug-family membership comes from the WHO ATC index.

const SQUARE = 'SQUARE Pharmaceuticals';
const INCEPTA = 'Incepta Pharmaceuticals';
const BEXIMCO = 'Beximco Pharmaceuticals';
const medex = id => `https://medex.com.bd/brands/${id}`;

export const products = [
{id:'ace',name:'Ace',strength:'500 mg',form:'Tablet',ingredients:[['paracetamol','500 mg']],barcode:'8941100962244',source:'https://www.squarepharma.com.bd/pdts.php?bc=8941100962244'},
{id:'ace-plus',name:'Ace Plus',strength:'500 mg + 65 mg',form:'Tablet',ingredients:[['paracetamol','500 mg'],['caffeine','65 mg']],barcode:'8941100962237',source:'https://www.squarepharma.com.bd/pdts.php?bc=8941100962237'},
{id:'ace-xr',name:'Ace XR',strength:'665 mg',form:'Tablet · XR',ingredients:[['paracetamol','665 mg']],barcode:'8941100962671',source:'https://www.squarepharma.com.bd/pdts.php?bc=8941100962671'},
{id:'ace-supp',name:'Ace 500 Suppository',strength:'500 mg',form:'Suppository',ingredients:[['paracetamol','500 mg']],barcode:'8940001280242',source:'https://www.squarepharma.com.bd/pdts.php?bc=8940001280242'},
{id:'alatrol',name:'Alatrol',strength:'10 mg',form:'Tablet',ingredients:[['cetirizine','10 mg']],barcode:'894001220033',source:'https://www.squarepharma.com.bd/pdts.php?bc=894001220033'},
{id:'alatrol-syrup',name:'Alatrol',strength:'5 mg/5 ml',form:'Syrup',ingredients:[['cetirizine','5 mg/5 ml']],barcode:'8940001275019',source:'https://www.squarepharma.com.bd/pdts.php?bc=8940001275019'},
{id:'seclo-20',name:'Seclo',strength:'20 mg',form:'Capsule',ingredients:[['omeprazole','20 mg']],barcode:'8941100961124',source:'https://www.squarepharma.com.bd/pdts.php?bc=8941100961124'},
{id:'seclo-40',name:'Seclo',strength:'40 mg',form:'Capsule',ingredients:[['omeprazole','40 mg']],barcode:'8941100960677',source:'https://www.squarepharma.com.bd/pdts.php?bc=8941100960677'},
{id:'fexo-120',name:'Fexo',strength:'120 mg',form:'Tablet',ingredients:[['fexofenadine','120 mg (as hydrochloride)']],barcode:'',source:medex('12095/fexo-120-mg-tablet'),sourceName:'MedEx'},
{id:'clofenac-50',name:'Clofenac 50',strength:'50 mg',form:'Tablet',ingredients:[['diclofenac','50 mg (as sodium)']],barcode:'',source:'https://www.squarepharma.com.bd/product-details.php?pid=384'},

{id:'reset',name:'Reset',strength:'500 mg',form:'Tablet',ingredients:[['paracetamol','500 mg']],manufacturer:INCEPTA,barcode:'',source:'https://www.inceptapharma.com/product-details.php?pid=111'},
{id:'reset-syrup',name:'Reset',strength:'120 mg/5 ml',form:'Syrup',ingredients:[['paracetamol','120 mg/5 ml']],manufacturer:INCEPTA,barcode:'',source:'https://www.inceptapharma.com/product-details.php?pid=111'},
{id:'reset-drops',name:'Reset',strength:'80 mg/ml',form:'Paediatric drops',ingredients:[['paracetamol','80 mg/ml']],manufacturer:INCEPTA,barcode:'',source:'https://www.inceptapharma.com/product-details.php?pid=111'},
{id:'reset-plus',name:'Reset Plus',strength:'500 mg + 65 mg',form:'Tablet',ingredients:[['paracetamol','500 mg'],['caffeine','65 mg']],manufacturer:INCEPTA,barcode:'',source:'https://www.inceptapharma.com/product-details.php?pid=252'},
{id:'reset-er',name:'Reset ER',strength:'665 mg',form:'Tablet · ER',ingredients:[['paracetamol','665 mg']],manufacturer:INCEPTA,barcode:'',source:'https://www.inceptapharma.com/product-details.php?pid=702'},
{id:'pantonix-20',name:'Pantonix',strength:'20 mg',form:'Tablet · EC',ingredients:[['pantoprazole','20 mg (as sodium)']],manufacturer:INCEPTA,barcode:'',source:medex('2199/pantonix-20-mg-ec-tablet'),sourceName:'MedEx'},

{id:'napa',name:'Napa',strength:'500 mg',form:'Tablet',ingredients:[['paracetamol','500 mg']],manufacturer:BEXIMCO,barcode:'',source:medex('10452/napa-500-mg-tablet'),sourceName:'MedEx'},
{id:'napa-extra',name:'Napa Extra',strength:'500 mg + 65 mg',form:'Tablet',ingredients:[['paracetamol','500 mg'],['caffeine','65 mg']],manufacturer:BEXIMCO,barcode:'',source:medex('10592/napa-extra-500-mg-tablet'),sourceName:'MedEx'},
{id:'napa-extend',name:'Napa Extend',strength:'665 mg',form:'Tablet · ER',ingredients:[['paracetamol','665 mg']],manufacturer:BEXIMCO,barcode:'',source:medex('10454/napa-extend-665-mg-xr-tablet'),sourceName:'MedEx'},

{id:'losectil-20',name:'Losectil',strength:'20 mg',form:'Capsule · EC',ingredients:[['omeprazole','20 mg']],manufacturer:'Eskayef Pharmaceuticals',barcode:'',source:medex('1827/losectil-20-mg-ec-capsule'),sourceName:'MedEx'},
{id:'sergel-20',name:'Sergel',strength:'20 mg',form:'Capsule · EC',ingredients:[['esomeprazole','20 mg']],manufacturer:'Healthcare Pharmaceuticals',barcode:'',source:medex('2103/sergel-20mg'),sourceName:'MedEx'},
{id:'maxpro-20',name:'Maxpro',strength:'20 mg',form:'Capsule · EC',ingredients:[['esomeprazole','20 mg']],manufacturer:'Renata PLC',barcode:'',source:medex('2078/maxpro-20-mg-capsule'),sourceName:'MedEx'},
{id:'rolac-10',name:'Rolac',strength:'10 mg',form:'Tablet',ingredients:[['ketorolac','10 mg (as tromethamine)']],manufacturer:'Renata PLC',barcode:'',source:medex('15375/rolac-10-mg-tablet'),sourceName:'MedEx'},
{id:'naprosyn-500',name:'Naprosyn',strength:'500 mg',form:'Tablet',ingredients:[['naproxen','500 mg (as sodium)']],manufacturer:'Radiant Pharmaceuticals',barcode:'',source:medex('11447/naprosyn-500-mg-tablet'),sourceName:'MedEx'},
{id:'naprosyn-plus',name:'Naprosyn Plus',strength:'500 mg + 20 mg',form:'Tablet · DR',ingredients:[['naproxen','500 mg (as sodium)'],['esomeprazole','20 mg (as magnesium)']],manufacturer:'Radiant Pharmaceuticals',barcode:'',source:medex('11554/naprosyn-plus-500-mg-dr-tablet'),sourceName:'MedEx'}
].map(p=>({manufacturer:SQUARE,sourceName:'Manufacturer',checked:'2026-10-24',...p}));

// WHO ATC codes for each active ingredient (https://atcddd.fhi.no/atc_ddd_index/).
export const atc = {
  paracetamol:'N02BE01', omeprazole:'A02BC01', pantoprazole:'A02BC02', esomeprazole:'A02BC05',
  diclofenac:'M01AB05', ketorolac:'M01AB15', naproxen:'M01AE02', cetirizine:'R06AE07', fexofenadine:'R06AX26'
};

// Drug families worth a pharmacist's second look when two *different* ingredients from one family appear together.
export const families = [
  {id:'ppi',prefix:'A02BC',name:'Proton pump inhibitors (acid reducers)',bn:'প্রোটন পাম্প ইনহিবিটর (গ্যাস্ট্রিকের ওষুধ)',source:'https://atcddd.fhi.no/atc_ddd_index/?code=A02BC'},
  {id:'nsaid',prefix:'M01A',name:'NSAIDs (anti-inflammatory painkillers)',bn:'NSAID (প্রদাহনাশক ব্যথার ওষুধ)',source:'https://atcddd.fhi.no/atc_ddd_index/?code=M01A'},
  {id:'antihistamine',prefix:'R06A',name:'Antihistamines (allergy medicines)',bn:'অ্যান্টিহিস্টামিন (এলার্জির ওষুধ)',source:'https://atcddd.fhi.no/atc_ddd_index/?code=R06A'}
];

export function familyOf(ingredient){const code=atc[ingredient];return code?families.find(f=>code.startsWith(f.prefix))||null:null;}

// Exact overlap: the same active ingredient appears in two or more different products.
export function overlaps(items){
  const map=new Map();
  for(const p of items){if(!p.ingredients)continue;for(const [name,amount] of p.ingredients){if(!map.has(name))map.set(name,[]);map.get(name).push({product:p,amount});}}
  return [...map].filter(([,entries])=>entries.length>1).map(([ingredient,entries])=>({ingredient,atc:atc[ingredient]||null,entries}));
}

// Same-family overlap: two or more *different* ingredients from one drug family, in two or more different products.
export function familyOverlaps(items){
  const out=[];
  for(const f of families){
    const entries=[];
    for(const p of items){if(!p.ingredients)continue;for(const [name,amount] of p.ingredients){if(familyOf(name)===f)entries.push({product:p,ingredient:name,amount});}}
    const ingredients=new Set(entries.map(e=>e.ingredient)),productIds=new Set(entries.map(e=>e.product.id));
    if(ingredients.size>1&&productIds.size>1)out.push({family:f.id,name:f.name,bn:f.bn,source:f.source,ingredients:[...ingredients],entries});
  }
  return out;
}

export function compare(items,unresolved=[]){
  return {products:items,overlaps:overlaps(items),families:familyOverlaps(items),unresolved,complete:unresolved.length===0,
    scope:'Ingredient and drug-family overlap only; no dose, interaction, or safety assessment.',generatedAt:new Date().toISOString()};
}

export function matchesQuery(p,q){q=q.trim().toLowerCase();return [p.name,p.strength,p.form,p.barcode,p.manufacturer,...p.ingredients.map(i=>i[0])].join(' ').toLowerCase().includes(q);}
export function search(q){return products.filter(p=>matchesQuery(p,q));}

// Recognition proposes records only. Exact product identity still needs confirmation.
export function findCandidates(text,list=products){
  const matched=list.filter(p=>{const name=p.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return new RegExp('(?:^|[^a-z])'+name+'(?=$|[^a-z])','i').test(text);});
  // If an explicit known suffix is present (e.g. "Napa Extra"), do not also propose the shorter base brand ("Napa").
  return matched.filter(p=>!matched.some(other=>other.name.toLowerCase().startsWith(p.name.toLowerCase()+' ')&&other.name.length>p.name.length));
}
