import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

// Open the SQLite database connection.
const db = await sqlite.open({
    filename:  './database.db',
    driver:  sqlite3.Database
});
console.log('You are now connected to the database!');

// Perform database migration if needed.

export async function filterByBrandName(brandName) {
    // SQL query to select all records with a specific brand name.
    const sql = "SELECT * FROM photos WHERE brandName = ? ORDER BY brandName";
    return await db.get(sql, brandName);
}

export async function getAllBrands() {
    // SQL query to select all records from the 'photos' table.
    const sql = "SELECT * FROM photos";
    return await db.all(sql);
}

export default async function insert(brandName, image) {
    // SQL query to insert a new record with brand name and image.
    const sql = "INSERT INTO photos (brandName, images) VALUES (?, ?)";
    return await db.run(sql, [brandName, image]);
}
