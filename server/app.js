import express from 'express';
import { compare } from '../shared/products.js';
import { decodeImage, extractText } from './ocr.js';
import {findCandidates} from './candidates.js';
export function createApp(store,{recognize=extractText}={}){
 const app=express();app.disable('x-powered-by');
 app.use((req,res,next)=>{res.set('X-Content-Type-Options','nosniff');res.set('Referrer-Policy','no-referrer');res.set('Cache-Control',req.path.startsWith('/api')?'no-store':'no-cache');next();});
 app.use(express.json({limit:'8mb'}));
 app.get('/api/health',(_req,res)=>res.json({status:'ok',database:'sqlite',catalogueSize:store.all().length}));
 app.get('/api/products',(req,res)=>{if(typeof req.query.q!=='undefined'&&(typeof req.query.q!=='string'||req.query.q.length>120))return res.status(400).json({error:'Search must be text under 120 characters.'});res.json({products:store.search(req.query.q||'')});});
 app.post('/api/compare',(req,res)=>{
  const {productIds,unknownNames=[]}=req.body||{};
  if(!Array.isArray(productIds)||!Array.isArray(unknownNames)||productIds.length+unknownNames.length>30||productIds.some(id=>typeof id!=='string')||unknownNames.some(n=>typeof n!=='string'||!n.trim()||n.length>100))return res.status(400).json({error:'Provide up to 30 confirmed product IDs and unresolved names.'});
  const ids=[...new Set(productIds)],known=ids.map(id=>store.get(id));if(known.some(p=>!p))return res.status(400).json({error:'A product ID is unknown. Refresh the catalogue and confirm again.'});
  if(known.length+unknownNames.length<2)return res.status(400).json({error:'Add at least two products to compare.'});
  res.json(compare(known,unknownNames.map(n=>n.trim())));
 });
 app.post('/api/extract',async(req,res,next)=>{try{const buffer=decodeImage(req.body);let result;try{result=await recognize(buffer);}catch(e){if(e.status)throw e;throw Object.assign(new Error('Text extraction is unavailable. Enter the printed product name instead. The OCR language model may need downloading on first use.'),{status:503});}
 const candidates=findCandidates(result.text,store.all());
 res.json({...result,candidates,notice:'Extracted text and candidates can be wrong. Confirm the exact name, strength, and form; nothing is added automatically.'});
 }catch(e){next(e);}});
 app.use('/api',(_req,res)=>res.status(404).json({error:'API route not found.'}));
 app.use((err,_req,res,_next)=>res.status(err.status||400).json({error:err.type==='entity.parse.failed'?'Invalid JSON request.':err.type==='entity.too.large'?'Image must be smaller than 5 MB.':err.message||'Request failed.'}));
 return app;
}
