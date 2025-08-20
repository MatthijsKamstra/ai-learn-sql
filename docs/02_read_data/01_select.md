# SELECT

   - The `SELECT` statement is used to retrieve data from one or more tables in SQLite database.

   ## Goal of this lesson:

   - Understand the basic syntax of the `SELECT` statement
   - Learn how to filter and sort results using clauses like `WHERE`, `ORDER BY`, etc.
   - Discover how to use aggregate functions such as `COUNT`, `SUM`, `AVG`, etc.
   - Learn about JOIN operations to retrieve data from multiple tables.

   ---

   ## Use the default demo.db

   - SQLite database is a self-contained, lightweight disk database that can be used in various software applications.
   - The demo.db contains four tables: `customers`, `products`, `orders`, and `order_items`.
     - customers: `id`, `name`, `email`, `created_at`
     - products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` → customers, `order_date`
     * order_items: `id`, `order_id` → orders,`product_id` → products, `quantity`, `price`
   - A **customer** has many **orders**, an **order** has many **items**, and each **item** belongs to one **product**.
   - Here's a simple visualization using mermaid.js:

     ```mermaid
     graph LR
      A[Customers] --|> B[Orders]
      B --|> C[Order Items]
      C --|> D[Products]
     ```

   ---

   ## How it works

   - The `SELECT` statement starts with the keyword `SELECT`, followed by one or more columns to retrieve.
     ```sql
     SELECT column1, column2 FROM table_name;
     ```
   - To filter the results, you can use the `WHERE` clause:
     ```sql
     SELECT * FROM customers WHERE name = 'John Doe';
     ```
   - To sort the results, use the `ORDER BY` clause. For example, to sort customers by their email address:
     ```sql
     SELECT * FROM customers ORDER BY email;
     ```
   - Use aggregate functions like `COUNT`, `SUM`, `AVG`, etc. to perform calculations on the data returned:
     ```sql
     SELECT AVG(price) FROM products WHERE price > 50;
     ```
   - To retrieve data from multiple tables, use JOIN operations. For example, join the `customers` and `orders` table to get customer information along with their orders:
     ```sql
     SELECT customers.name, orders.order_date FROM customers INNER JOIN orders ON customers.id = orders.customer_id;
     ```

   ---

   ## Exercise

   - 1. Retrieve the name and email of all customers who have placed an order.
     ```sql
     SELECT name, email FROM customers WHERE id IN (SELECT customer_id FROM orders);
     ```
   - 2. Find out how many unique products are available in the database.
     ```sql
     SELECT COUNT(DISTINCT product_id) FROM order_items;
     ```
   - 3. Calculate the average price of all products whose stock is greater than 10.
     ```sql
     SELECT AVG(price) FROM products WHERE stock > 10;
     ```
   - 4. List all orders placed on a specific date (e.g., '2022-01-01').
     ```sql
     SELECT * FROM orders WHERE order_date = '2022-01-01';
     ```
   - 5. Show the total price of each order, along with its customer name and order date.
     ```sql
     SELECT customers.name, orders.order_date, SUM(order_items.price * order_items.quantity) AS total FROM customers INNER JOIN orders ON customers.id = orders.customer_id INNER JOIN order_items ON orders.id = order_items.order_id GROUP BY orders.id;
     ```

   ---

   ## Summary

   | Topic                    | Description                                                                        |
   |--------------------------|------------------------------------------------------------------------------------|
   | `SELECT` statement       | Retrieves data from one or more tables in SQLite database                          |
   | Filtering results        | Using the `WHERE` clause to filter data based on conditions                         |
   | Sorting results          | Using the `ORDER BY` clause to sort data in ascending or descending order           |
   | Aggregate functions      | Performing calculations like counting, summing, averaging using functions such as `COUNT`, `SUM`, `AVG`, etc. |
   | Joining tables           | Combining data from multiple tables using JOIN operations                           |

   ---

   ## SQLite vs SQL

   | Feature                | SQLite                      | SQL (MySQL, PostgreSQL, etc.)    |
   |------------------------|-----------------------------|---------------------------------|
   | Database engine        | Embedded                    | Server-based                     |
   | Data types             | Limited                     | More extensive                  |
   | Transactions           | Atomic                      | Support for savepoints, etc.     |
   | Concurrent access      | Single writer, multiple readers| Multiple writers and readers    |
   ```