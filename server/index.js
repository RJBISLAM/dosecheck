import express from 'express';import {resolve} from 'node:path';import {existsSync} from 'node:fs';import {openDatabase} from './database.js';import {createApp} from './app.js';
const store=openDatabase(),app=createApp(store);let vite;
if(process.argv.includes('--dev')){const {createServer}=await import('vite');vite=await createServer({server:{middlewareMode:true},appType:'spa'});app.use(vite.middlewares);}else{const dist=resolve('dist');if(!existsSync(resolve(dist,'index.html')))throw Error('Run npm run build before npm start.');app.use(express.static(dist));app.get('*',(_req,res)=>res.sendFile(resolve(dist,'index.html')));}
const port=Number(process.env.PORT||4173);const server=app.listen(port,process.env.HOST||'127.0.0.1',()=>console.log(`DoseCheck ready at http://localhost:${port}`));
server.on('error',async e=>{console.error(`Cannot start DoseCheck: ${e.code||e.message}. Check the port and local network permissions.`);await vite?.close();store.close();process.exitCode=1;});
function shutdown(){server.close(async()=>{await vite?.close();store.close();process.exit(0);});}process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);
