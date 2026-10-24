// Run with the declared Playwright dependency; each test uses a fresh browser context.
// DOSECHECK_BASE_URL can target an already deployed build instead of the local preview.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const startPreview=require('../../scripts/browser-server.cjs');
async function main(){
 let preview,browser;const results=[],screenshots=path.resolve('artifacts/screenshots');fs.mkdirSync(screenshots,{recursive:true});
 try{
  let playwright;try{playwright=require('playwright');}catch{throw Error('Browser test dependency is missing. Run npm ci, then npm run setup:browsers.');}
  const engine=process.argv[2]||'chromium';if(!['chromium','webkit'].includes(engine))throw Error('Choose chromium or webkit.');
  preview=await startPreview();browser=await playwright[engine].launch();console.log(`Testing ${engine} ${browser.version()} against ${preview.url}`);
  const origin=new URL(preview.url).origin;
  async function check(name,fn,screenshot){const context=await browser.newContext({viewport:{width:1280,height:900},serviceWorkers:'block'});try{
   await context.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//,r=>r.abort());const p=await context.newPage();p.setDefaultTimeout(15000);await p.goto(preview.url);await fn(p,context);
   if(screenshot)await p.screenshot({path:path.join(screenshots,`${engine}-${screenshot}.png`),fullPage:true});results.push(['PASS',name]);
  }catch(e){results.push(['FAIL',`${name}: ${e.message.split('\n')[0]}`]);}finally{await context.close();}}
  const addUnknown=async(p,name)=>{await p.getByRole('button',{name:'+ Add an unknown product',exact:true}).click();await p.locator('#unknownName').fill(name);await p.getByRole('button',{name:'Add as unresolved →',exact:true}).click();};
  const addKnown=async(p,q)=>{await p.locator('#query').fill(q);await p.locator('.search-item').first().click();await p.locator('dialog input[type=checkbox]').check();await p.getByRole('button',{name:'Confirm & add →',exact:true}).click();};
  const sample=async p=>{await p.getByRole('button',{name:/See Ammu's example/}).click();await p.keyboard.press('Escape');await p.locator('button.compare').click();};
  await check('Ammu example: hidden ingredient and classification prompt',async p=>{await sample(p);assert.match(await p.locator('.result-card h3').innerText(),/2 things/);assert.match(await p.locator('.hidden-callout').innerText(),/Naprosyn Plus also contains esomeprazole/);assert.equal(await p.locator('.ingredient-card.family').count(),1);assert.match(await p.locator('.ingredient-card.family').innerText(),/classification link, not a warning/);},'example');
  await check('two unknown products cannot produce a clear result',async p=>{await addUnknown(p,'Mystery A');await addUnknown(p,'Mystery B');await p.locator('button.compare').click();assert.match(await p.locator('.result-card h3').innerText(),/Cannot assess/);assert.equal(await p.locator('.result-card.clear').count(),0);},'unknown-products');
  await check('one known plus one unknown cannot be assessed',async p=>{await addKnown(p,'Fexo');await addUnknown(p,'Mystery C');await p.locator('button.compare').click();assert.match(await p.locator('.result-card h3').innerText(),/Cannot assess/);});
  await check('unresolved products make a no-overlap comparison incomplete',async p=>{await addKnown(p,'Fexo');await addKnown(p,'Seclo');await addUnknown(p,'Mystery D');await p.locator('button.compare').click();assert.match(await p.locator('.result-card h3').innerText(),/incomplete/i);assert.equal(await p.locator('.result-card.clear').count(),0);});
  await check('OCR uses same-site assets and never confirms a product automatically',async(p,context)=>{const external=[];context.on('request',r=>{const u=r.url();if(/^(blob:|data:)/.test(u)||/^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(u))return;if(new URL(u).origin!==origin)external.push(u);});await p.locator('input[type=file]').setInputFiles(path.resolve(__dirname,'../fixtures/printed-label.png'));await p.locator('.ocr-results').waitFor({timeout:90000});assert.match(await p.locator('.ocr-results').innerText(),/Ace Plus/);assert.equal(await p.locator('.medicine').count(),0);assert.deepEqual(external,[],'OCR must not request third-party resources');},'printed-label');
  await check('failed OCR model download releases the upload button',async(p,context)=>{await context.route(/eng\.traineddata/,r=>r.abort());await p.locator('input[type=file]').setInputFiles(path.resolve(__dirname,'../fixtures/printed-label.png'));await p.locator('.photo-panel [role=alert]').waitFor({timeout:75000});assert.match(await p.locator('.photo-panel [role=alert]').innerText(),/Could not read this photo/);assert.equal(await p.locator('.photo-panel button.secondary').isDisabled(),false);});
  await check('Bangla translates the example result',async p=>{await sample(p);await p.locator('button.lang').click();assert.match(await p.locator('.result-card h3').innerText(),/ফার্মাসিস্টকে/);},'bangla');
  for(const [status,name]of results)console.log(status,name);console.log(`${results.filter(r=>r[0]==='PASS').length}/${results.length} browser checks passed.`);if(results.some(r=>r[0]==='FAIL'))process.exitCode=1;
 }finally{await browser?.close();await preview?.close();}
}
main().catch(e=>{console.error('Browser checks could not finish:',e.message);process.exitCode=1;});
