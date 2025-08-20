# Using HAVING in SQL with SQLite

   - The `HAVING` clause is used in SQL to filter groups, just like the `WHERE` clause filters rows. It's applied after the `GROUP BY` statement and can be used to include or exclude specific grouped records based on aggregated conditions.

   ## Goal of this lesson:
   - Understand the purpose of the `HAVING` clause in SQLite
   - Learn how to use `HAVING` to filter groups
   - Write a simple query using `HAVING`

   ---

   ## Using the default demo.db
   - This tutorial uses the SQLite database named `demo.db`. It contains four tables: `customers`, `products`, `orders`, and `order_items`.
   - The structure of the tables is as follows:
      - customers: `id`, `name`, `email`, `created_at`
      - products: `id`, `name`, `price`, `stock`
      * orders: `id`, `customer_id` → customers, `order_date`
      * order_items: `id`, `order_id` → orders,`product_id` → products, `quantity`, `price`
   - The relationships between the tables are as follows:
      - A **customer** has many **orders**
      - An **order** has many **items**
      - Each **item** belongs to one **product**
   - Here's a simple visualization using mermaid.js:

     ```mermaid
     graph LR
     customer -->|has many| order
     order -->|has many| order_item
     order_item -->|belongs to| product
     ```

   ---

   ## How it works
   - To use the `HAVING` clause, you first need to group your results using the `GROUP BY` statement. Then, you can apply the `HAVING` clause to filter those groups based on aggregated conditions.
    1. Write a query with `SELECT`, `GROUP BY`, and `HAVING`.
    2. Specify the column(s) to group by using the `GROUP BY` statement (e.g., `GROUP BY order_date`).
    3. Apply the `HAVING` clause to filter the groups based on an aggregated condition (e.g., `HAVING SUM(quantity) > 5`).
    4. The resulting rows will display only those groups that meet the specified condition.
    5. Here's a sample query:

   ```sql
   SELECT order_date, SUM(quantity) as total_items
   FROM orders
   JOIN order_items ON orders.id = order_items.order_id
   GROUP BY order_date
   HAVING SUM(quantity) > 5;
   ```

   ---

   ## Exercise
   - Exercise 1: Write a query to find the total number of orders per customer grouped by customer and having more than 3 orders.
   - Exercise 2: Find the average price of products that have been ordered more than twice.
   - Exercise 3: Determine the customers who spent more than $100 in a single order (hint: use `SUM(price)`).
   - Exercise 4: List the products with a stock level lower than 5 and the total number of orders for each such product.
   - Exercise 5: Find the top 3 customers who have spent the most in total across all their orders.

   ---

   ## Summary
   | Concept                        | Description                |
   |-------------------------------|----------------------------|
   | `HAVING` clause              | Filters groups after `GROUP BY` |
   | Grouping                      | Organizes rows into groups    |
   | Aggregated conditions         | Conditions applied to grouped data |

   ---

   ## SQLite vs SQL
   | Feature                | SQLite       | SQL (e.g., PostgreSQL) |
   |------------------------|-------------|------------------------|
   | `HAVING` clause        | Supported    | Supported              |
   ```