const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
module.exports=async function startPreview(){
 if(process.env.DOSECHECK_BASE_URL)return {url:process.env.DOSECHECK_BASE_URL.replace(/\/$/,'')+'/',close:async()=>{}};
 const root=path.resolve(__dirname,'../dist'),prefix='/dosecheck';
 if(!fs.existsSync(path.join(root,'index.html')))throw Error('Production build missing. Run npm run build first.');
 const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.wasm':'application/wasm','.png':'image/png'};
 const server=http.createServer((req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(!pathname.startsWith(prefix+'/')){res.writeHead(404);return res.end();}let relative=pathname.slice(prefix.length+1);if(!relative||relative.endsWith('/'))relative+='index.html';const f=path.resolve(root,relative);if(!f.startsWith(root+path.sep)||!fs.existsSync(f)||!fs.statSync(f).isFile()){res.writeHead(404);return res.end();}res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res);}catch{res.writeHead(400);res.end();}});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
 return {url:`http://127.0.0.1:${server.address().port}${prefix}/`,close:()=>new Promise(resolve=>server.close(resolve))};
};
