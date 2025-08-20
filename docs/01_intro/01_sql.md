# Getting Started with SQL using SQLite

   - This chapter focuses on introducing you to SQL basics, utilizing SQLite as the database management system. SQLite is a C programming library that provides a lightweight and embeddable relational database engine.

   ## Goal of this lesson:

   - Understand the fundamentals of SQL and its syntax.
   - Learn how to create tables, insert data, query data, and perform basic operations in SQLite.
   - Familiarize yourself with creating and managing relationships between tables.

   ---

   ## Using the default demo.db

   - In this tutorial, we will use an SQLite database called `demo.db`. This database includes four tables: customers, products, orders, and order_items.

     - customers: `id`, `name`, `email`, `created_at`
     - products: `id`, `name`, `price`, `stock`
     - orders: `id`, `customer_id` → customers, `order_date`
     - order_items: `id`, `order_id` → orders, `product_id` → products, `quantity`, `price`

   - In this database, a **customer** has many **orders**, an **order** has many **items**, and each **item** belongs to one **product**. A visualization of the relationships can be seen below using mermaid.js:

     ```mermaid
     graph LR
      A[Customers] --|> B{Orders}
      B --> C[Order Items]
      C --|> D[Products]
     ```

   ---

   ## How it works

   - Step 1: Create a new SQLite database using the `sqlite3` command-line tool.
     ```
     $ sqlite3 demo.db
     ```
   - Step 2: Navigate to the desired table and list its contents with the `SELECT` statement.
     ```
     sqlite> SELECT * FROM customers;
     ```
   - Step 3: Insert new data into a table using the `INSERT INTO` statement.
     ```
     sqlite> INSERT INTO customers (name, email) VALUES ('John Doe', 'john@example.com');
     ```
   - Step 4: Query specific data from a table using the `WHERE` clause and various operators such as `=`, `<`, `>`, etc.
     ```
     sqlite> SELECT * FROM customers WHERE name = 'John Doe';
     ```
   - Step 5: Perform join operations to combine data from multiple tables based on common columns.
     ```
     sqlite> SELECT customers.name, order_items.quantity FROM customers JOIN order_items ON customers.id = order_items.customer_id WHERE order_items.product_id = 1;
     ```

   ---

   ## Exercise

   - 1. Create a new customer named 'Alice' with the email address alice@example.com.
     ```
     sqlite> INSERT INTO customers (name, email) VALUES ('Alice', 'alice@example.com');
     ```
   - 2. List all products and their current stock levels.
     ```
     sqlite> SELECT * FROM products;
     ```
   - 3. Find the total number of orders for a specific customer.
     ```
     sqlite> SELECT COUNT(*) FROM orders WHERE customer_id = (SELECT id FROM customers WHERE name = 'John Doe');
     ```
   - 4. Query the order details for a specific order, including the items and their quantities.
     ```
     sqlite> SELECT * FROM order_items JOIN orders ON order_items.order_id = orders.id WHERE orders.customer_id = (SELECT id FROM customers WHERE name = 'John Doe');
     ```
   - 5. Update the stock level of a product by its ID and add the quantity purchased in an order.
     ```
     sqlite> UPDATE products SET stock = stock + 10 WHERE id = 1;
     ```

   ---

   ## Summary

   | Topic                    | Description                                                                        |
   |--------------------------|------------------------------------------------------------------------------------|
   | Creating a new database   | Using the `sqlite3` command-line tool to create a new SQLite database.             |
   | Listing table contents   | Utilizing the `SELECT` statement to list data from a specific table.              |
   | Inserting data            | Adding new rows of data into a table with the `INSERT INTO` statement.           |
   | Querying data            | Filtering and selecting specific data using the `WHERE`, `=`, `<`, `>` operators, etc.|
   | Joining tables            | Combining data from multiple tables based on common columns.                       |
   | Updating data             | Modifying existing rows of data with the `UPDATE` statement.                      |

   ---

   ## SQLite vs SQL

   | Criteria          | SQLite                | SQL (MySQL, PostgreSQL)            |
   |-------------------|-----------------------|------------------------------------|
   | Embeddable         | Yes                    | No (Requires separate installation) |
   | ACID Compliance    | Yes                    | Yes                                |
   | Concurrent Access  | Limited               | Supports multi-user access          |
   | File Format        | Single file            | Database server with multiple files |
   ```