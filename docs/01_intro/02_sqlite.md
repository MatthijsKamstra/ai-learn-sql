# Introduction to SQLite

   - SQLite is a C library that provides a lightweight, disk-based, relational database management system for embedded systems and personal computers.
     It doesn't require a separate server process, making it easy to use and efficient in terms of resources.

   ## Goal of this lesson:

   - Understand the basics of SQLite and its usage.
   - Learn about the structure of a demo SQLite database.
   - Perform CRUD operations using SQLite.

   ---

   ## Using the default demo.db

   - The demo.db is a pre-populated SQLite database used for demonstration purposes.
     It contains tables for customers, products, orders, and order items.

   - The relationships between these tables are as follows:
     - A **customer** has many **orders**
     - An **order** has many **items**
     - Each **item** belongs to one **product**

   - Here's a visualization of the database structure using mermaid.js:

   ```mermaid
   graph LR
      A[Customers] --| Has Many | B[Orders]
      B --> C[Order Items]
      C --| Belongs To | D[Products]
   ```

   ---

   ## How it works

   - Connecting to SQLite:
     ```sql
     sqlite3 demo.db
     ```

   - Creating a table (example for creating the customers table):
     ```sql
     CREATE TABLE IF NOT EXISTS customers (
         id INTEGER PRIMARY KEY,
         name TEXT NOT NULL,
         email TEXT UNIQUE NOT NULL,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
     );
     ```

   - Inserting data into the table:
     ```sql
     INSERT INTO customers (name, email) VALUES ('John Doe', 'johndoe@example.com');
     ```

   - Querying data from the table:
     ```sql
     SELECT * FROM customers;
     ```

   ---

   ## Exercise

   - **Medium**: List all customers and their email addresses.
     ```sql
     SELECT name, email FROM customers;
     ```

   - **Advanced**: Add a new customer with a specified name and email address.
     ```sql
     INSERT INTO customers (name, email) VALUES ('Jane Smith', 'janesmith@example.com');
     ```

   - **Expert**: Update the email of an existing customer.
     ```sql
     UPDATE customers SET email = 'newemail@example.com' WHERE name = 'John Doe';
     ```

   - **Hard**: Delete a customer by their name.
     ```sql
     DELETE FROM customers WHERE name = 'Jane Smith';
     ```

   - **Challenging**: Retrieve the total number of orders placed by John Doe.
     ```sql
     SELECT COUNT(*) FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE name = 'John Doe');
     ```

   ---

   ## Summary

   | Step                  | Action                | Example Command          |
   |-----------------------|-----------------------|---------------------------|
   | Connect to SQLite      | `sqlite3 demo.db`      | -                         |
   | Create table           | `CREATE TABLE ...`     | -                         |
   | Insert data            | `INSERT INTO ...`      | -                         |
   | Query data             | `SELECT * FROM ...`    | -                         |
   | Update data            | `UPDATE ... SET ...`   | -                         |
   | Delete data            | `DELETE FROM ...`      | -                         |

   ---

   ## SQLite vs SQL

   | Feature                | SQLite                    | SQL                       |
   |------------------------|---------------------------|---------------------------|
   | Serverless             | Yes                       | No, requires a server     |
   | Embedded               | Yes                       | No                        |
   | Multi-user Support     | Limited or None           | Yes                       |
   | Concurrent Read/Write  | Limited or None           | Yes                       |
   | ACID Compliance         | Yes                       | Yes                       |
   ```