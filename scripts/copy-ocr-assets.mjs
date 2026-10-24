// Copies the Tesseract worker and WebAssembly core into public/tesseract so the photo reader
// is served from this site (no third-party CDN, works on any static host).
import {mkdirSync,copyFileSync} from 'node:fs';
const out='public/tesseract';mkdirSync(out,{recursive:true});
const files=[['node_modules/tesseract.js/dist/worker.min.js','worker.min.js'],
 ['node_modules/tesseract.js-core/tesseract-core-lstm.wasm.js','tesseract-core-lstm.wasm.js'],
 ['node_modules/tesseract.js-core/tesseract-core-simd-lstm.wasm.js','tesseract-core-simd-lstm.wasm.js']];
for(const [from,to] of files)copyFileSync(from,`${out}/${to}`);
console.log('OCR assets copied to',out);
