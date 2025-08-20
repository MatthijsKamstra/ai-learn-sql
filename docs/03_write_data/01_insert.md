# INSERT

   - The `INSERT` statement is used to add new rows into a database table. This tutorial will cover how to use the `INSERT` command with SQLite.

   ## Goal of this lesson:

   - Understand the syntax of the `INSERT` statement in SQLite.
   - Learn to insert data into different tables (customers, products, orders, order_items) using the `INSERT` command.
   - Master the usage of various clauses like `DEFAULT`, `VALUES`, and `ON CONFLICT` with `INSERT`.

   ---

   ## Use the default demo.db

   - This tutorial will use the SQLite database named "demo.db". The database consists of four tables: customers, products, orders, and order_items.
     ```markdown
     customers: `id`, `name`, `email`, `created_at`
     products: `id`, `name`, `price`, `stock`
     orders: `id`, `customer_id` (customers), `order_date`
     order_items: `id`, `order_id` (orders), `product_id` (products), `quantity`, `price`
     ```
   - Relationships exist between these tables. A customer has many orders, an order has many items, and each item belongs to one product.
   - Here is a visualization of the database structure using mermaid.js:

      ```mermaid
      graph LR
          A[Customers] -- One to Many --> B[Orders]
          B -- One to Many --> C[Order Items]
          D[Products] -- One to Many --> C
      ```

   ---

   ## How it works

   - The `INSERT` statement follows this basic structure:
     ```sql
     INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);
     ```
   - To insert a new row into the customers table:
     ```sql
     INSERT INTO customers (name, email, created_at) VALUES ('John Doe', 'john.doe@example.com', '2022-12-01');
     ```
   - To insert data using the default values for columns not specified:
     ```sql
     INSERT INTO customers (name, email) VALUES ('Jane Smith');
     ```
   - The `VALUES` keyword can also be replaced with a subquery to insert multiple rows at once.
   - To handle conflicts during the insertion of duplicate data using the `ON CONFLICT` clause:
     ```sql
     INSERT OR IGNORE INTO customers (name, email) VALUES ('John Doe', 'john.doe@example.com');
     ```
   - This command will either insert the row if it doesn't exist or ignore the operation if the row already exists in the table.

   ---

   ## Exercise

   - Create a new customer with email address "new.customer@example.com"
     ```sql
     INSERT INTO customers (name, email) VALUES ('New Customer', 'new.customer@example.com');
     ```
   - Insert a product with name "New Product" and stock level of 10.
     ```sql
     INSERT INTO products (name, stock) VALUES ('New Product', 10);
     ```
   - Create an order for the new customer with the current date as the order date.
     ```sql
     INSERT INTO orders (customer_id, order_date) SELECT id FROM customers WHERE name = 'New Customer';
     ```
   - Add an item to the latest order for the new product with quantity 2 and price $50.
     ```sql
     INSERT INTO order_items (order_id, product_id, quantity, price) SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE name = 'New Customer') LIMIT 1;
     INSERT INTO order_items (quantity, price) VALUES (2, 50);
     ```
   - Insert a duplicate row for the new product but ignore the insertion if it already exists.
     ```sql
     INSERT OR IGNORE INTO products (name, stock) VALUES ('New Product', 10);
     ```

   ---

   ## Summary

   | Topic                | Explanation                                                                        |
   |----------------------|------------------------------------------------------------------------------------|
   | `INSERT` Statement    | Used to add new rows into a database table.                                          |
   | Syntax                | `INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);`         |
   | Default Values        | Columns not specified will use their default values.                                |
   | Subquery             | To insert multiple rows at once by using a subquery.                              |
   | `ON CONFLICT` Clause  | Handle conflicts during the insertion of duplicate data.                           |

   ---

   ## SQLite vs SQL

   | Feature            | SQLite                             | SQL (MySQL, PostgreSQL)         |
   |--------------------|-----------------------------------|---------------------------------|
   | Implicit Transactions  | Yes (auto-commit mode)          | No (explicit transactions required)               |
   | Stored Procedures    | Limited support                  | Extensive support               |
   | Triggers             | Limited support                  | Extensive support               |
   ```