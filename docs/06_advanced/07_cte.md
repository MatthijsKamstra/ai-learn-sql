# Common Table Expressions (CTEs)

   - A CTE, or Common Table Expression, is a temporary result set that you can reference within a single SELECT, INSERT, UPDATE, DELETE, or ANALYZE SQL statement.

   ## Goal of this lesson:

   - Understand the purpose and use cases of CTEs in SQLite
   - Create a simple CTE and understand its functionality
   - Apply CTEs to complex queries for better readability and maintainability

   ---

   ## Use the default demo.db

   - This tutorial uses the SQLite database named `demo.db`. It consists of several tables: customers, products, orders, and order_items, which are related as follows:
     - A **customer** has many **orders**
     - An **order** has many **items**
     - Each **item** belongs to one **product**
   - You can find the table structure below:
     ```
     customers: `id`, `name`, `email`, `created_at`
     products: `id`, `name`, `price`, `stock`
     orders: `id`, `customer_id` → customers, `order_date`
     order_items: `id`, `order_id` → orders,`product_id` → products, `quantity`, `price`
     ```
   - The relationships between the tables are shown in the following mermaid diagram:

   ```mermaid
   graph LR
      customer -->|has one| order
      order -->|has many| order_item
      product -->|belongs to one| order_item
   ```

   ---

   ## How it works

   - A CTE is defined using the `WITH` keyword followed by a name, and the SELECT statement that defines the temporary result set. The CTE can be referenced within the SQL statement following the `AS` keyword.
     ```sql
     WITH cte_name AS (
         SELECT ...
     )
     SELECT ... FROM cte_name;
     ```
   - Here are 5 steps to create and use a CTE:
     1. Define the CTE with a `SELECT` statement, providing an alias for the result set.
     2. Use the defined CTE as if it were a regular table in subsequent SQL statements.
     3. Perform operations on the CTE like you would on a regular table (e.g., filtering, joining, aggregating).
     4. The results of each operation on the CTE will be based on the temporary result set defined by the CTE.
     5. Repeat this process as needed for multiple CTEs and nested CTEs within a single SQL statement.

   ---

   ## Exercise

   - Create 5 exercises to practice using CTEs in SQLite:

   1. Write a query that uses a CTE to calculate the total sales by customer for the last month.
      ```sql
      WITH total_sales AS (
          SELECT customer_id, SUM(order_items.price * order_items.quantity) as total_sales
          FROM orders
          JOIN order_items ON orders.id = order_items.order_id
          WHERE orders.order_date >= DATE('now', 'month ago')
          GROUP BY customer_id
      )
      SELECT customers.name, total_sales.total_sales
      FROM customers
      JOIN total_sales ON customers.id = total_sales.customer_id;
      ```
   2. Create a CTE to find the most expensive product in stock and then find all orders that have at least one item of this product.
      ```sql
      WITH most_expensive AS (
          SELECT products.name, MAX(products.price) as max_price
          FROM products
          WHERE stock > 0
          GROUP BY products.name
          LIMIT 1
      )
      SELECT orders.*
      FROM orders
      JOIN order_items ON orders.id = order_items.order_id
      JOIN most_expensive ON order_items.product_id = most_expensive.products_id AND order_items.price = most_expensive.max_price;
      ```
   3. ... (add 3 more exercises of increasing difficulty)

   ---

   ## Summary

   | Step | Description |
   |------|-------------|
   | 1 | Define the CTE with a `SELECT` statement, providing an alias for the result set. |
   | 2 | Use the defined CTE as if it were a regular table in subsequent SQL statements. |
   | 3 | Perform operations on the CTE like you would on a regular table (e.g., filtering, joining, aggregating). |
   | 4 | The results of each operation on the CTE will be based on the temporary result set defined by the CTE. |
   | 5 | Repeat this process as needed for multiple CTEs and nested CTEs within a single SQL statement. |

   ---

   ## SQLite vs SQL

   | Feature | SQLite | SQL (e.g., MySQL, PostgreSQL) |
   |---------|--------|-------------------------------|
   | CTEs    | Available | Available                      |
   ```