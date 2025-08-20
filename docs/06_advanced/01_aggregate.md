# Aggregate Functions

   - Aggregate functions are used to perform calculations on a group of rows and return a single value. Examples include SUM, AVG, MIN, MAX, and COUNT.

   ## Goal of this lesson:
   - Understand the purpose of aggregate functions in SQLite
   - Learn how to use common aggregate functions like SUM, AVG, MIN, MAX, and COUNT
   - Apply aggregate functions in practical examples with the default demo.db

   ---

   ## Use the default demo.db

   - The `demo.db` is a SQLite database provided for learning purposes. It contains four tables: customers, products, orders, and order_items.
     ```
     customers: `id`, `name`, `email`, `created_at`
     products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` (→ customers), `order_date`
     * order_items: `id`, `order_id` (→ orders), `product_id` (→ products), `quantity`, `price`
   - Relationships:
      - A **customer** has many **orders**
      - An **order** has many **items**
      - Each **item** belongs to one **product**
   - You can visualize the relationships using mermaid.js:
     ```mermaid
     erDiagram
        Customer ||--|{ Order : has
        Order ||--|{ Order_Item : has
        Product ||--|{ Order_Item : belongs to
     ```

   ---

   ## How it works

   - Aggregate functions can be used in the `SELECT` statement with the `GROUP BY` clause. Here's a simple example:
     1. Select the total price of all orders for a specific customer.
     2. Group by the customer ID.
     3. Use the `SUM()` function to calculate the total price.
     4. The query will return the total price for each unique customer ID.
     5. If no `GROUP BY` clause is provided, the aggregate function will apply to the entire table.
     ```sql
     SELECT customer_id, SUM(order_items.price) AS total_price
     FROM orders
     JOIN order_items ON orders.id = order_items.order_id
     GROUP BY customer_id;
     ```

   ---

   ## Exercise

   - 1. Calculate the average price of all products in the `demo.db`.
     ```sql
     SELECT AVG(products.price) FROM products;
     ```

   - 2. Find the total number of orders for a specific customer (let's say customer ID 1).
     ```sql
     SELECT COUNT(orders.id) FROM orders WHERE customer_id = 1;
     ```

   - 3. Determine the minimum and maximum prices of all products in the `demo.db`.
     ```sql
     SELECT MIN(products.price), MAX(products.price) FROM products;
     ```

   - 4. Calculate the total revenue (sum of prices * quantities) for a specific order (let's say order ID 1).
     ```sql
     SELECT SUM(order_items.price * order_items.quantity) FROM order_items WHERE order_id = 1;
     ```

   - 5. Find the average quantity of all items for a specific product (let's say product ID 1).
     ```sql
     SELECT AVG(order_items.quantity) FROM order_items JOIN products ON order_items.product_id = products.id WHERE products.id = 1;
     ```

   ---

   ## Summary

   | Function    | Purpose                         | Example                             |
   |-------------|---------------------------------|-------------------------------------|
   | SUM()       | Calculates the sum of values     | `SUM(order_items.price)`            |
   | AVG()       | Calculates the average of values  | `AVG(products.price)`               |
   | MIN()       | Returns the minimum value        | `MIN(products.price)`               |
   | MAX()       | Returns the maximum value        | `MAX(products.price)`               |
   | COUNT()     | Counts the number of rows        | `COUNT(orders.id)`                  |

   ---

   ## SQLite vs SQL

   | Feature          | SQLite           | SQL (e.g., MySQL, PostgreSQL)      |
   |------------------|------------------|----------------------------------|
   | Aggregate Functions | Supported        | Supported                        |
   ```