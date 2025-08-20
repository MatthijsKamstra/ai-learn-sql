# Subqueries

   - Subqueries are SQL statements nested inside other SQL statements. They allow you to retrieve data based on the results of another query.

   ## Goal of this lesson:

   - Understand the concept of subqueries
   - Learn how to write and use subqueries in SQLite
   - Be able to retrieve data based on the results of another query

   ---

   ## Use the default demo.db

   - The demo.db is a simple SQLite database used for learning purposes. It contains tables for customers, products, orders, and order items.
   - Customers table: `id`, `name`, `email`, `created_at`
     - Products table: `id`, `name`, `price`, `stock`
     - Orders table: `id`, `customer_id` → customers, `order_date`
     - Order items table: `id`, `order_id` → orders, `product_id` → products, `quantity`, `price`
   - A **customer** has many **orders**. An **order** has many **items**. Each **item** belongs to one **product**.

   ![Database structure](img/database-structure.png)

   ---

   ## How it works

   - Subqueries allow you to retrieve data based on the results of another query. Here's a simple example:
     1. Write a SELECT statement to get all customers with an email ending in `.com`. Save this as subquery_1.
     2. Write another SELECT statement to get the orders for the customers returned by subquery_1.

   ```sql
   SELECT * FROM customers WHERE email LIKE '%.com';
   ```

   ```sql
   SELECT * FROM orders WHERE customer_id IN (subquery_1);
   ```

   ---

   ## Exercise

   1. Find all customers who have placed an order with a product costing more than $50.
      ```sql
      SELECT name FROM customers WHERE id IN (SELECT customer_id FROM order_items WHERE product_id IN (SELECT id FROM products WHERE price > 50));
      ```
   2. Find the names of all customers who have placed an order with a total cost exceeding $100.
      ```sql
      SELECT name FROM customers WHERE id IN (SELECT DISTINCT customer_id FROM orders AS o INNER JOIN (SELECT order_id, SUM(quantity * price) as total_cost FROM order_items GROUP BY order_id HAVING total_cost > 100) AS total ON o.id = total.order_id);
      ```
   3. Find the names of all customers who have placed an order for a product that was purchased more than 5 times in total.
      ```sql
      SELECT name FROM customers WHERE id IN (SELECT DISTINCT customer_id FROM orders AS o INNER JOIN (SELECT order_id, COUNT(*) as num_purchases FROM order_items GROUP BY order_id HAVING num_purchases > 5) AS total ON o.id = total.order_id);
      ```
   4. Find the names of all customers who have placed an order for a product that was purchased more than once by another customer.
      ```sql
      SELECT name FROM customers WHERE id IN (SELECT DISTINCT c1.customer_id FROM orders AS o1 INNER JOIN orders AS o2 ON o1.product_id = o2.product_id AND o1.order_date < o2.order_date INNER JOIN customers AS c1 ON o1.customer_id = c1.id);
      ```
   5. Find the names of all customers who have placed an order for a product that was never out of stock during the entire order period.
      ```sql
      SELECT name FROM customers WHERE id IN (SELECT DISTINCT c.id FROM orders AS o JOIN products AS p ON o.product_id = p.id JOIN customers AS c ON o.customer_id = c.id WHERE p.stock >= (SELECT stock FROM products WHERE id = o.product_id AND order_date <= o.order_date) AND p.stock >= (SELECT stock FROM products WHERE id = o.product_id AND order_date >= o.order_date));
      ```

   ---

   ## Summary

   | Goal                            | Query Example                                                                       |
   |---------------------------------|-------------------------------------------------------------------------------------|
   | Find customers with orders over $50 | `SELECT name FROM customers WHERE id IN (SELECT customer_id FROM order_items WHERE product_id IN (SELECT id FROM products WHERE price > 50));` |
   | Find customers with total cost > $100 | `SELECT name FROM customers WHERE id IN (SELECT DISTINCT customer_id FROM orders AS o INNER JOIN (SELECT order_id, SUM(quantity * price) as total_cost FROM order_items GROUP BY order_id HAVING total_cost > 100) AS total ON o.id = total.order_id);` |
   | Find customers with a product purchased more than 5 times | `SELECT name FROM customers WHERE id IN (SELECT DISTINCT customer_id FROM orders AS o INNER JOIN (SELECT order_id, COUNT(*) as num_purchases FROM order_items GROUP BY order_id HAVING num_purchases > 5) AS total ON o.id = total.order_id);` |
   | Find customers with a product purchased by another customer | `SELECT name FROM customers WHERE id IN (SELECT DISTINCT c1.customer_id FROM orders AS o1 INNER JOIN orders AS o2 ON o1.product_id = o2.product_id AND o1.order_date < o2.order_date INNER JOIN customers AS c1 ON o1.customer_id = c1.id);` |
   | Find customers with a product never out of stock | `SELECT name FROM customers WHERE id IN (SELECT DISTINCT c.id FROM orders AS o JOIN products AS p ON o.product_id = p.id JOIN customers AS c ON o.customer_id = c.id WHERE p.stock >= (SELECT stock FROM products WHERE id = o.product_id AND order_date <= o.order_date) AND p.stock >= (SELECT stock FROM products WHERE id = o.product_id AND order_date >= o.order_date));` |

   ---

   ## SQLite vs SQL

   | Feature            | SQLite         | SQL (MySQL, PostgreSQL, etc.)       |
   |---------------------|----------------|-----------------------------------|
   | Subqueries         | Supported      | Supported                         |
   | Joins              | Simplified     | More complex with `JOIN` syntax  |
   ```