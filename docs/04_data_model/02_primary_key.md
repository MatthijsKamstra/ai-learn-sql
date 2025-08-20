# Primary Key

   - A primary key is a special column (or set of columns) in a database table that uniquely identifies each record (row) within the table.
     - It must contain unique, non-null values.
     - Each table can only have one primary key.

   ## Goal of this lesson:

   - Understand what a primary key is and why it's important in SQLite databases
   - Learn how to create a primary key in SQLite
   - Understand the benefits of using a primary key for data integrity

   ---

   ## Use the default demo.db

   The `demo.db` is a pre-populated SQLite database used for demonstration purposes. It consists of four tables: customers, products, orders, and order_items.

   - Customers table: `id`, `name`, `email`, `created_at`
   - Products table: `id`, `name`, `price`, `stock`
   * Orders table: `id`, `customer_id` (foreign key referencing customers), `order_date`
   * Order Items table: `id`, `order_id` (foreign key referencing orders), `product_id` (foreign key referencing products), `quantity`, `price`

   - A customer has many orders.
     - An order has many items.
     - Each item belongs to one product.

   Here's a simplified visualization of the relationships:

   ```mermaid
   graph LR
      subgraph Customers
        Customer[Customer] -->|has_many| Orders[Orders]
      end
      subgraph Orders
        Orders -->|has_many| OrderItems[Order Items]
      end
      subgraph Products
        OrderItems -->|belongs_to| Product[Product]
      end
   ```

   ---

   ## How it works

   - Creating a primary key in SQLite:

   1. Identify the column(s) that will form the primary key.
   2. Define the column(s) as the primary key using the `PRIMARY KEY` keyword.

    ```sql
    CREATE TABLE customers (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        created_at DATETIME
    );
    ```

   3. You can also define a primary key when adding new columns to an existing table.

    ```sql
    ALTER TABLE customers ADD COLUMN id INTEGER PRIMARY KEY;
    ```

   - Benefits of using a primary key:
     - Ensures data integrity by preventing duplicate entries in the table
     - Makes querying and joining tables easier due to its unique nature
     - Facilitates foreign key relationships between tables

   ---

   ## Exercise

   1. Create a new SQLite database called `my_db` and define a primary key for each table: customers, products, orders, order_items.

      ```sql
      CREATE DATABASE my_db;
      .db my_db
      CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT, created_at DATETIME);
      ... (same for products, orders, order_items)
      ```

   2. Insert records into the tables while ensuring that each primary key value is unique.

   3. Query your database to ensure that no duplicate entries exist in any of the tables based on their primary keys.

   4. Create a foreign key relationship between the 'customer_id' column in the orders table and the 'id' column in the customers table.

   5. Create a foreign key relationship between the 'order_id' column in the order_items table and the 'id' column in the orders table.

   ---

   ## Summary

   | Topic          | Description                               |
   |----------------|-------------------------------------------|
   | Primary Key    | A special column(s) that uniquely identifies each record within a table. |
   | Importance     | Ensures data integrity, makes querying easier, and facilitates foreign key relationships between tables. |
   | Creation       | Define the column(s) as `PRIMARY KEY` using the `CREATE TABLE` or `ALTER TABLE` statement. |

   ---

   ## SQLite vs SQL

   | Feature            | SQLite                         | SQL (e.g., MySQL, PostgreSQL) |
   |---------------------|-------------------------------|------------------------------|
   | Primary Key        | Supports primary key constraints | Supports primary key constraints with the `PRIMARY KEY` keyword, but also offers additional constraint types such as unique, not null, and foreign key. |

   ```