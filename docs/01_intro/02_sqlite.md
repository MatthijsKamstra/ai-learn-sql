# SQLite

   - SQLite is a C library that provides a lightweight, disk-based database with no server process. It stores all data on disk and uses tables to organize the data.

   ## Goal of this lesson:
   - Understand the basics of using SQLite locally
   - Learn about the default database structure for our tutorial
   - Create, read, update, and delete (CRUD) data in the SQLite database

   ---

   ## Use the default demo.db
   - The `demo.db` is a pre-built SQLite database that comes with some sample data. It contains four tables: customers, products, orders, and order_items.
     - customers: `id`, `name`, `email`, `created_at`
     - products: `id`, `name`, `price`, `stock`
     - orders: `id`, `customer_id` → customers, `order_date`
     - order_items: `id`, `order_id` → orders, `product_id` → products, `quantity`, `price`
   - The relationships are as follows:
      - A **customer** has many **orders**
      - An **order** has many **items**
      - Each **item** belongs to one **product**
   - Here's a simple visualization using mermaid.js:

```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : has-one
    ORDER ||--|{ ORDER_ITEM : has-many : through { order_id }
    PRODUCT |}--|{ ORDER_ITEM : belongs-to : has-many : through { product_id }
```

   ---

   ## How it works
   - To work with SQLite, you'll need to install the SQLite library and use a tool like the command line interface (CLI) or an Integrated Development Environment (IDE).
   1. Install SQLite: Follow the installation guide for your operating system at https://www.sqlite.org/download.html.
   2. Create a new database: Use the `sqlite3` CLI command to create and open a new database file. For example, `sqlite3 mydb.db`.
   3. Create tables: Define your table structure using the `CREATE TABLE` statement.
   4. Insert data: Add records to your tables with the `INSERT INTO` statement.
   5. Query data: Retrieve data from your tables using the `SELECT` statement. You can filter, sort, and manipulate data as needed.
   - Here's an example of creating a table and inserting data:

   ```sql
   CREATE TABLE customers (
       id INTEGER PRIMARY KEY,
       name TEXT NOT NULL,
       email TEXT NOT NULL,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   INSERT INTO customers (name, email) VALUES ('John Doe', 'john.doe@example.com');
   ```

   ---

   ## Exercise
   - Create 5 exercises to practice using SQLite with the default database structure.
   1. List all customers and their emails.
      ```sql
      SELECT name, email FROM customers;
      ```
   2. Insert a new customer with name 'Jane Doe' and email 'jane.doe@example.com'.
      ```sql
      INSERT INTO customers (name, email) VALUES ('Jane Doe', 'jane.doe@example.com');
      ```
   3. Update the customer with id 1 to have a new email address 'new_email@example.com'.
      ```sql
      UPDATE customers SET email = 'new_email@example.com' WHERE id = 1;
      ```
   4. Delete the customer with name 'Jane Doe'.
      ```sql
      DELETE FROM customers WHERE name = 'Jane Doe';
      ```
   5. Create a new order for the customer with id 2 and add an item with product_id 3 and quantity 2.
      ```sql
      -- First, create a new order
      INSERT INTO orders (customer_id) VALUES (2);
      -- Next, get the ID of the new order
      SELECT id FROM orders ORDER BY id DESC LIMIT 1;
      -- Finally, add an item to the new order
      INSERT INTO order_items (order_id, product_id, quantity) VALUES (<order_id>, 3, 2);
      ```

   ---

   ## Summary

   | Topic                          | Description                                               |
   |--------------------------------|-----------------------------------------------------------|
   | Introduction to SQLite        | A lightweight disk-based database with no server process. |
   | Database Structure             | Four tables: customers, products, orders, and order_items.  |
   | Creating, Reading, Updating, and Deleting Data (CRUD)    | Practical exercises to CRUD data in SQLite.              |

   ---

   ## SQLite vs SQL

   |               | SQLite                                                      | SQL (MySQL, PostgreSQL, etc.)            |
   |---------------|-------------------------------------------------------------|----------------------------------------|
   | Server        | No server process required. All data is stored locally.    | Requires a separate server process.     |
   | Size          | Lightweight and compact, suitable for small to medium projects. | Large and more complex, suited for larger projects.  |
   | Multi-user    | Limited multi-user support due to the lack of a server process.  | Supports multiple users concurrently.   |
   ```