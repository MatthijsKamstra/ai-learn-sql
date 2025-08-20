# Snowflake Schema Design

   - A Snowflake schema is a method of organizing data in a database, where each table has a unique identifier (ID) as its primary key and foreign keys that reference other tables. This design helps reduce redundancy and improve performance by minimizing the number of joins needed to access related data.

   ## Goal of this lesson:

   - Understand the Snowflake schema design
   - Create a Snowflake-structured database in SQLite
   - Practice creating, modifying, and querying tables following the Snowflake schema

   ---

   ## Use the default demo.db

   - In this tutorial, we will use an SQLite database called `demo.db` as our starting point. The database structure includes four tables: customers, products, orders, and order_items.

   ```sql
   -- demo.db schema

   CREATE TABLE IF NOT EXISTS customers (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       email TEXT NOT NULL UNIQUE,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE IF NOT EXISTS products (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       price REAL NOT NULL,
       stock INTEGER NOT NULL
   );

   CREATE TABLE IF NOT EXISTS orders (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       customer_id INTEGER NOT NULL REFERENCES customers(id),
       order_date DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE IF NOT EXISTS order_items (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       order_id INTEGER NOT NULL REFERENCES orders(id),
       product_id INTEGER NOT NULL REFERENCES products(id),
       quantity INTEGER NOT NULL,
       price REAL NOT NULL
   );
   ```

   - The database has relationships defined: a customer has many orders, an order has many items, and each item belongs to one product.
   - We will use mermaid.js to visualize the database structure.

   ---

   ## How it works

   - To create a Snowflake-structured database in SQLite, we start by designing tables with unique primary keys (ID) for each table and foreign keys referencing other tables' IDs.
   - Next, we insert data into the tables, ensuring that foreign key constraints are not violated.
   - To query related data, we join the tables on their foreign keys.

   ---

   ## Exercise

   1. Create a customer with an email address that does not already exist in the customers table.
      ```sql
      INSERT INTO customers (name, email) VALUES ('John Doe', 'johndoe@example.com');
      ```

   2. Add a product to the products table with a name, price, and stock.
      ```sql
      INSERT INTO products (name, price, stock) VALUES ('Laptop', 1000.00, 5);
      ```

   3. Create an order for the customer from step 1, referencing the product from step 2. Update the quantity of the product in the products table to reflect the purchased quantity.
      ```sql
      INSERT INTO orders (customer_id) SELECT id FROM customers WHERE email = 'johndoe@example.com';
      UPDATE products SET stock = stock - 1 WHERE id = (SELECT product_id FROM order_items WHERE order_id = (SELECT MAX(id) FROM orders));

      INSERT INTO order_items (order_id, product_id, quantity, price) SELECT id, LAST_INSERT_ROWID(), 1, 1000.00 FROM orders;
      ```

   4. Create a second customer and place an order for another product, updating the stock accordingly.
      (Note: You may need to adjust your SQL queries based on the new customer ID and product ID values.)

   5. Query the data from all tables, joining them as needed to get related information. For example, you could find out who the most recent customer is and what they ordered.

   ---

   ## Summary

   | Topic                           | Snowflake Schema Design |
   |---------------------------------|-------------------------|
   | Goal                            | Understand and implement Snowflake schema in SQLite |
   | Key Concepts                    | Primary keys, foreign keys, table relationships, data normalization |
   | Practice Exercises              | Creating, modifying, querying tables following the Snowflake schema |

   ---

   ## SQLite vs SQL

   | Feature                        | SQLite                         | SQL (MySQL/PostgreSQL)      |
   |---------------------------------|---------------------------------|-------------------------------|
   | File-based storage              | ✔️                               | ✖️                            |
   | Concurrent access              | Limited                       | Supported                   |
   | Built-in functions              | Limited                       | Extensive                   |
   | Triggers and stored procedures  | Not supported               | Supported                    |
   ```