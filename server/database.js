import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { products, matchesQuery } from '../shared/products.js';
// The catalogue is re-seeded from shared/products.js on every start, so tables are rebuilt to match the current schema.
export function openDatabase(filename=process.env.DB_PATH||resolve('data/dosecheck.sqlite')) {
  if(filename!==':memory:')mkdirSync(dirname(filename),{recursive:true});
  const db=new DatabaseSync(filename);
  db.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL; DROP TABLE IF EXISTS ingredients; DROP TABLE IF EXISTS products; CREATE TABLE products (id TEXT PRIMARY KEY, name TEXT NOT NULL, strength TEXT NOT NULL, form TEXT NOT NULL, manufacturer TEXT NOT NULL, barcode TEXT NOT NULL, source TEXT NOT NULL, source_name TEXT NOT NULL, checked TEXT NOT NULL); CREATE TABLE ingredients (product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE, position INTEGER NOT NULL, name TEXT NOT NULL, amount TEXT NOT NULL, PRIMARY KEY(product_id,name));');
  const insert=db.prepare('INSERT INTO products VALUES (?,?,?,?,?,?,?,?,?)');
  const ingredient=db.prepare('INSERT INTO ingredients VALUES (?,?,?,?)');
  db.exec('BEGIN');try{for(const p of products){insert.run(p.id,p.name,p.strength,p.form,p.manufacturer,p.barcode,p.source,p.sourceName,p.checked);p.ingredients.forEach(([n,a],i)=>ingredient.run(p.id,i,n,a));}db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}
  function hydrate(row){if(!row)return null;const {source_name,...rest}=row;return {...rest,sourceName:source_name,ingredients:db.prepare('SELECT name,amount FROM ingredients WHERE product_id=? ORDER BY position').all(row.id).map(i=>[i.name,i.amount])};}
  return {db,all(){return db.prepare('SELECT * FROM products ORDER BY name,form').all().map(hydrate);},get(id){return hydrate(db.prepare('SELECT * FROM products WHERE id=?').get(id));},search(q=''){return this.all().filter(p=>matchesQuery(p,q));},close(){db.close();}};
}
