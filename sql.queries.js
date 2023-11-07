import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

const  db = await sqlite.open({
    filename:  './database.db',
    driver:  sqlite3.Database
});
console.log('You are now connected to the database!')
await db.migrate(); 


export async function filterByBrandName(brandName){
    const sql="select * from photos where brandName=? order by brandName";
    return await db.get(sql,brandName);
}

export  async function getAllBrands(){
    const sql="select * from photos";
    return await db.all(sql)
}

export default async function insert(brandName,image){
    const sql="INSERT INTO photos (brandName, images) VALUES (?,?)";
    return await db.run(sql,[brandName,image])
}
