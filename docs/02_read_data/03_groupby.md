# Group By

   - The GROUP BY statement is used to group rows that have the same value for one or more columns and perform aggregating functions on a specified column within each group.

   ## Goal of this lesson:

   - Understand how to use the `GROUP BY` statement in SQLite
   - Group results by one or more columns
   - Perform aggregate functions (SUM, AVG, COUNT, etc.) on a specified column within each group

   ---

   ## Use the default demo.db

   - In this tutorial, we will use the `demo.db` SQLite database which includes four tables: `customers`, `products`, `orders`, and `order_items`.
   - The structure of these tables is as follows:
      - customers: `id`, `name`, `email`, `created_at`
      - products: `id`, `name`, `price`, `stock`
      * orders: `id`, `customer_id` (references customers), `order_date`
      * order_items: `id`, `order_id` (references orders), `product_id` (references products), `quantity`, `price`
   - Relationships:
      - A **customer** has many **orders**
      - An **order** has many **items**
      - Each **item** belongs to one **product**
   - Visualization:
     ```mermaid
     graph LR
     customer-->|has many|order
     order-->|has many|order_item
     product-->|belongs to one|order_item
     ```

   ---

   ## How it works

   - Step 1: Select the columns you want to group by.
     ```sql
     SELECT customer_id, COUNT(*) AS num_orders
     FROM orders
     GROUP BY customer_id;
     ```
   - Step 2: Perform an aggregate function on a specified column within each group.
     ```sql
     SELECT product_id, AVG(price) AS avg_price
     FROM order_items
     GROUP BY product_id;
     ```
   - Step 3: Use the `HAVING` clause to filter groups based on the result of an aggregate function.
     ```sql
     SELECT product_id, SUM(quantity) AS total_stock
     FROM order_items
     GROUP BY product_id
     HAVING SUM(quantity) > 100;
     ```
   - Step 4: Use multiple `GROUP BY` clauses to group by more than one column.
     ```sql
     SELECT customer_name, order_date, COUNT(*) AS num_orders
     FROM customers JOIN orders ON customers.id = orders.customer_id
     GROUP BY customer_name, order_date;
     ```
   - Step 5: Combine `GROUP BY` with other SQL operations like `JOIN`, `WHERE`, and `HAVING`.
     ```sql
     SELECT customers.name AS customer_name, SUM(order_items.quantity) AS total_purchases
     FROM customers JOIN orders ON customers.id = orders.customer_id
                      JOIN order_items ON orders.id = order_items.order_id
     WHERE customers.name LIKE '%John%'
     GROUP BY customer_name
     HAVING total_purchases > 100;
     ```

   ---

   ## Exercise

   - 1. List all customers and the number of orders they have made.
     ```sql
     SELECT customer_id, COUNT(*) AS num_orders
     FROM orders
     GROUP BY customer_id;
     ```
   - 2. Calculate the total quantity of each product sold.
     ```sql
     SELECT product_id, SUM(quantity) AS total_sold
     FROM order_items
     GROUP BY product_id;
     ```
   - 3. Find out which products have an average price above $100.
     ```sql
     SELECT product_id, AVG(price) AS avg_price
     FROM products JOIN order_items ON products.id = order_items.product_id
     GROUP BY product_id
     HAVING avg_price > 100;
     ```
   - 4. List the number of orders each customer has made in a specific month.
     ```sql
     SELECT customer_name, YEAR(order_date) AS year, MONTHNAME(order_date) AS month, COUNT(*) AS num_orders
     FROM customers JOIN orders ON customers.id = orders.customer_id
     WHERE MONTH(order_date) = 10 AND YEAR(order_date) = 2022
     GROUP BY customer_name, year, month;
     ```
   - 5. Display the total sales (sum of prices) for each customer who has made more than 5 orders.
     ```sql
     SELECT customers.name AS customer_name, SUM(order_items.price) AS total_sales
     FROM customers JOIN orders ON customers.id = orders.customer_id
                      JOIN order_items ON orders.id = order_items.order_id
     WHERE orders.customer_id IN (
         SELECT customer_id
         FROM orders
         GROUP BY customer_id
         HAVING COUNT(*) > 5
     )
     GROUP BY customer_name;
     ```

   ---

   ## Summary

   | Topic              | Group By                    |
   |--------------------|-----------------------------|
   | Goal               | Understand `GROUP BY`        |
   | How to use         | Select and group columns, perform aggregate functions, filter groups  |
   | Example usage      | Group by customer_id, product_id, order_date                          |
   | Exercise           | 5 exercises based on the db structure                               |

   ---

   ## SQLite vs SQL

   | Feature       | SQLite                     | SQL (MySQL/PostgreSQL)            |
   |---------------|-----------------------------|------------------------------|
   | GROUP BY      | Supported                  | Supported                         |
   | Aggregate Functions | Supported (SUM, AVG, COUNT, MAX, MIN, etc.)   | Supported (same functions)     |
   | HAVING Clause    | Supported                  | Supported                      |
   ```