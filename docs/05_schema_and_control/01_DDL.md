# Data Definition Language (DDL) with SQLite

   - DDL is a part of SQL used for defining and managing database structures such as tables, views, indexes, and stored procedures.

   ## Goal of this lesson:
   - Understand the basics of SQLite DDL statements.
   - Learn how to create tables, add columns, modify table structure, and delete tables.

   ---

   ## Use the default demo.db
   - The demo.db is a sample SQLite database provided with SQLite.
   - It contains four tables: customers, products, orders, and order_items.
     * customers: `id`, `name`, `email`, `created_at`
     * products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` (references customers), `order_date`
     * order_items: `id`, `order_id` (references orders), `product_id` (references products), `quantity`, `price`
   - Relationships exist between these tables.
     - A **customer** has many **orders**.
     - An **order** has many **items**.
     - Each **item** belongs to one **product**.
   - Here is a visualization of the database structure using mermaid.js:

      ```mermaid
      erDiagram
          CUSTOMER ||--o{ ORDER : has_many
          ORDER ||--| ODER_ITEM : has_many
          ODER_ITEM |--| PRODUCT : belongs_to
      ```

   ---

   ## How it works
   - **Step 1**: Connect to the database.
     ```sql
     sqlite3 demo.db
     ```
   - **Step 2**: Create a new table using the `CREATE TABLE` statement.
     ```sql
     CREATE TABLE my_table (id INTEGER PRIMARY KEY, name TEXT);
     ```
   - **Step 3**: Add columns to an existing table using the `ALTER TABLE` statement.
     ```sql
     ALTER TABLE my_table ADD COLUMN email TEXT;
     ```
   - **Step 4**: Modify a column using the `ALTER TABLE` statement.
     ```sql
     ALTER TABLE my_table CHANGE COLUMN name new_name TEXT;
     ```
   - **Step 5**: Delete a table using the `DROP TABLE` statement.
     ```sql
     DROP TABLE my_table;
     ```

   ---

   ## Exercise
   - **Exercise 1**: Create a new table called `products_new`. Copy the structure of the `products` table and add an additional column `description`.
     ```sql
     CREATE TABLE products_new AS SELECT * FROM products;
     ALTER TABLE products_new ADD COLUMN description TEXT;
     ```
   - **Exercise 2**: Rename the `name` column in the `orders` table to `order_title`.
     ```sql
     ALTER TABLE orders CHANGE COLUMN name order_title TEXT;
     ```
   - **Exercise 3**: Increase the stock of a specific product by 100 units. Update the `stock` column in the `products` table where the `name` is 'Product A'.
     ```sql
     UPDATE products SET stock = stock + 100 WHERE name = 'Product A';
     ```
   - **Exercise 4**: Delete all records from the `orders` table.
     ```sql
     DELETE FROM orders;
     ```
   - **Exercise 5**: Remove the `description` column from the `products_new` table.
     ```sql
     ALTER TABLE products_new DROP COLUMN description;
     ```

   ---

   ## Summary

    | Topic                 | Description                                       |
    |-----------------------|---------------------------------------------------|
    | CREATE TABLE          | Creates a new table with specified columns        |
    | ALTER TABLE           | Adds, modifies, or deletes columns in an existing table |
    | DROP TABLE            | Deletes an entire table                             |

   ---

   ## SQLite vs SQL

    | Feature                | SQLite                      | SQL (MySQL, PostgreSQL, etc.)                              |
    |------------------------|-----------------------------|----------------------------------------------------------|
    | Data types             | Limited                     | Wide variety                                            |
    | Concurrent connections | Single user                 | Multiple users                                          |
    | Transaction isolation  | None                        | Full                                                      |
   ```