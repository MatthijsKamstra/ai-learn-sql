# Indexing in SQL using SQLite

   - Indexes are used in databases to improve the performance of database operations, specifically SELECT, INSERT, UPDATE, and DELETE statements. They help speed up data retrieval by reducing the number of disk I/O operations.

   ## Goal of this lesson:

   - Understand what indexes are and their importance
   - Learn how to create an index in SQLite
   - Explore different types of indexes in SQLite
   - Learn when and why to use indexes

   ---

   ## Use the default demo.db

   - SQLite database is a self-contained, file-based database that can be used locally. In this lesson, we'll be using the default demo.db provided with SQLite, which contains several tables to demonstrate various SQL operations.
   - The structure of our database consists of:
     - customers: `id`, `name`, `email`, `created_at`
     - products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` → customers, `order_date`
     * order_items: `id`, `order_id` → orders,`product_id` → products, `quantity`, `price`
   - Relationships are as follows:
     - A **customer** has many **orders**
     - An **order** has many **items**
     - Each **item** belongs to one **product**
   - A visualization of the database structure can be found using mermaid.js.

   ---

   ## How it works

   - Indexing involves creating a data structure that allows for faster access to specific rows in a table. The process of indexing can be broken down into five steps:
     1. Choose the column(s) to index based on query frequency and data distribution.
     2. Create the index using the CREATE INDEX statement.
     3. SQLite automatically maintains the index during data manipulation operations (INSERT, UPDATE, DELETE).
     4. When a SELECT statement is executed, SQLite uses the index to find the required rows more efficiently.
     5. The use of indexes can significantly improve query performance.
   - Example:

   ```sql
   CREATE INDEX idx_customers_name ON customers (name);
   ```

   ---

   ## Exercise

   - Create a customer named 'John Doe' with email 'john@example.com'.
   - Create an index on the name column of the customers table.
   - Write a query to select all customers whose names start with the letter 'J'.
   - Modify the data in the products table such that the stock for product id 1 is increased by 50.
   - Write a query to retrieve the total sales (sum of price * quantity) for all orders placed on March 1st, 2022.

   ---

   ## Summary

   | Topic                     | Description                                                                                                    |
   |---------------------------|----------------------------------------------------------------------------------------------------------------|
   | Indexing in SQL          | A technique to improve query performance by creating a data structure that allows for faster access to specific rows. |
   | Creating an index         | Use the CREATE INDEX statement followed by the name of the table and the column(s) to be indexed.                |
   | Types of indexes          | SQLite supports several types of indexes, including primary keys, unique indexes, regular indexes, and full-text search indexes.|
   | Choosing columns to index | Consider query frequency and data distribution when selecting columns to index.                                     |

   ---

   ## SQLite vs SQL (Regarding Indexing)

   |          | SQLite             | SQL Server           |
   |----------|--------------------|----------------------|
   | Creation  | `CREATE INDEX`      | `CREATE INDEX`       |
   | Multiple  | No built-in support | Yes, multiple indexes allowed per table.    |
   | Auto-created| Yes (during table creation)     | Yes or No (depends on the setting) |
   ```