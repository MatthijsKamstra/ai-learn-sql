# SQL with SQLite

   - Learn how to work with SQL using SQLite locally. This tutorial will focus on creating, querying, and managing a simple database.

   ## Goal of this lesson:

   - Understand basic SQL syntax
   - Create tables and manage data in SQLite
   - Query data from created tables
   - Understand relationships between tables

   ---

   ## Use the default demo.db

   - This tutorial uses the `demo.db` SQLite database for practical examples. It has four main tables: customers, products, orders, and order_items.
     - customers: `id`, `name`, `email`, `created_at`
     - products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` (references customers), `order_date`
     * order_items: `id`, `order_id` (references orders), `product_id` (references products), `quantity`, `price`
   - A **customer** has many **orders**. An **order** has many **items**. Each **item** belongs to one **product**.
   - Visualize relationships with mermaid.js:

      ```mermaid
      erDiagram
        Customer ||--o{ Order : has_one
        Order ||--|{ OrderItem : has_many
        Product ||--|{ OrderItem : belongs_to
      ```

   ---

   ## How it works

   - Start by creating tables for customers, products, orders, and order items.
   - Insert data into the tables.
   - Query the data from the tables using SELECT statements.
     - Filter results with WHERE clause.
     - Sort results with ORDER BY clause.
     - Limit the number of rows returned with LIMIT clause.
   - Learn about JOIN statements to combine data from multiple tables.
     - INNER JOIN to return only matching rows.
     - LEFT JOIN to return all left-table rows, even if there are no matching right-table rows.
   - Use aggregate functions like SUM, AVG, COUNT, and GROUP BY to analyze data.

   ---

   ## Exercise

   - 1. Create tables for customers, products, orders, and order items with given schema.
     ```sql
     CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT, created_at DATETIME);
     ...
     ```

   - 2. Insert data into the tables.
     ```sql
     INSERT INTO customers (name, email) VALUES ('John Doe', 'john@example.com');
     ...
     ```

   - 3. Query data from the tables using SELECT statements and JOINs.
     ```sql
     SELECT customers.name, orders.order_date FROM customers INNER JOIN orders ON customers.id = orders.customer_id;
     ```

   - 4. Use aggregate functions to analyze data.
     ```sql
     SELECT SUM(order_items.quantity) FROM order_items GROUP BY order_items.order_id;
     ```

   - 5. Write a query to find the customer with the most orders.
     ```sql
     SELECT customers.name, COUNT(orders.id) as num_of_orders FROM customers INNER JOIN orders ON customers.id = orders.customer_id GROUP BY customers.name ORDER BY num_of_orders DESC LIMIT 1;
     ```

   ---

   ## Summary

   | Topic                      | Description                                           |
   |----------------------------|-------------------------------------------------------|
   | Tables                     | Create, manage tables for customers, products, orders, order items.         |
   | Data management            | Insert, update, delete data in the tables.             |
   | Querying data             | Use SELECT statements to retrieve data from tables.  |
   | JOINs                      | Combine data from multiple tables using JOIN statements.               |
   | Aggregate functions        | Analyze data using aggregate functions like SUM, AVG, COUNT.          |

   ---

   ## SQLite vs SQL

   |                           | SQLite                    | SQL (MySQL, PostgreSQL) |
   |---------------------------|---------------------------|-------------------------|
   | File-based                | Yes                       | No (uses server)        |
   | Server                    | Not required              | Required                |
   | Installation              | Easier                    | More complex           |
   | Concurrency               | Limited                   | High                    |
   | Embedded in applications   | Common                    | Rarely used            |

   ```