import fs from 'fs-extra';
import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import chapterList from '../chapters.js';
import { DB_BUILD_DIR, OUTPUT_DIR, ROOT_DIR } from '../config.js';

await fs.mkdir(DB_BUILD_DIR, { recursive: true });

const DB_FILE = path.join(DB_BUILD_DIR, 'demo.db'); // basis DB die we kopiëren

const customers = [
	["Alice Johnson", "alice@example.com"],
	["Bob Smith", "bob@example.com"],
	["Foo Bar", "foo@bar.com"],
	["Charlie Lee", "charlie@example.com"]
];
const products = [
	["Laptop", 999.99, 10],
	["Mouse", 25.50, 200],
	["Keyboard", 45.00, 150],
	["Monitor", 199.99, 30],
	["USB-C Cable", 9.99, 300]
];
const orders = [
	[1, "2024-04-01"],
	[2, "2024-04-02"],
	[1, "2024-04-03"]
];
const order_items = [
	[1, 1, 1, 999.99],
	[1, 2, 2, 25.50],
	[2, 3, 1, 45.00],
	[3, 1, 1, 999.99],
	[3, 5, 2, 9.99]
];

async function createDatabase() {
	try {
		await fs.unlink(DB_FILE);
	} catch (_) { }

	console.log(`🔨 Building base database at: ${DB_FILE}`);

	const db = await open({
		filename: DB_FILE,
		driver: sqlite3.Database
	});

	await db.exec('PRAGMA foreign_keys = ON;');

	await db.exec(`
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS customers;
  `);

	await db.exec(`
    CREATE TABLE customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    );

    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      order_date TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    );

    CREATE TABLE order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

	const insertCustomer = await db.prepare("INSERT INTO customers (name, email) VALUES (?, ?)");
	for (const c of customers) await insertCustomer.run(c);
	await insertCustomer.finalize();

	const insertProduct = await db.prepare("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)");
	for (const p of products) await insertProduct.run(p);
	await insertProduct.finalize();

	const insertOrder = await db.prepare("INSERT INTO orders (customer_id, order_date) VALUES (?, ?)");
	for (const o of orders) await insertOrder.run(o);
	await insertOrder.finalize();

	const insertItem = await db.prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
	for (const i of order_items) await insertItem.run(i);
	await insertItem.finalize();

	await db.close();
	console.log('✅ Base database created');
}

async function copyDatabaseToTutorials() {
	console.log(`📤 Copying base DB into lesson folders under: ${OUTPUT_DIR}`);
	for (const [filePath] of chapterList) {
		const dirPath = path.join(OUTPUT_DIR, filePath);
		const destPath = path.join(dirPath, 'demo.db');
		await fs.mkdir(dirPath, { recursive: true });
		await fs.copyFile(DB_FILE, destPath);
		console.log(`   → ${destPath.replace(ROOT_DIR + path.sep, '')}`);
	}
	console.log('✅ Copy complete');
}

async function run() {
	await createDatabase();
	await copyDatabaseToTutorials();
}

run();
