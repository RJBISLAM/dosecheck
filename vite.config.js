import {defineConfig} from 'vite';
// base './' lets the static build run from any sub-path (GitHub Pages, Netlify, Vercel).
export default defineConfig({base:'./',build:{outDir:'dist',emptyOutDir:true},server:{host:'127.0.0.1'}});
