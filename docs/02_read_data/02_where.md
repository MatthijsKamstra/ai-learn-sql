# Using the WHERE Clause with SQLite

   - The `WHERE` clause is used in SQL queries to filter data based on specific conditions. In this chapter, we will learn how to use it effectively in our SQLite databases.

   ## Goal of this lesson:

   - Understand the `WHERE` clause and its usage in SQLite
   - Filter records using multiple conditions with `AND` and `OR` operators
   - Utilize wildcards for pattern matching
   - Order filtered results using the `ORDER BY` clause

   ---

   ## Using the default demo.db

   - We'll be working with a pre-defined SQLite database called `demo.db`. This database contains four tables: customers, products, orders, and order_items.
     ```
     customers: `id`, `name`, `email`, `created_at`
     products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` → customers, `order_date`
     * order_items: `id`, `order_id` → orders,`product_id` → products, `quantity`, `price`
     ```
   - A **customer** has many **orders**, an **order** has many **items**, and each **item** belongs to one **product**.
   - Here's a simple visualization of our database structure using mermaid.js:

     ```mermaid
     erDiagram
      Customer ||--|{ Order : has_many
      Order ||--|{ OrderItem : has_many
      Product ||--|{ OrderItem : belongs_to
     ```
   ---

   ## How it works

   - The `WHERE` clause is used after the `FROM` clause in a SQL query. It filters the records based on the conditions specified inside the parentheses following the `WHERE` keyword. Here's an example:

     ```sql
     SELECT * FROM customers WHERE name = 'John Doe';
     ```
   - Let's break down the steps to use the `WHERE` clause effectively:
     1. Start with a basic query, selecting all columns from a table (in this case, customers).
     2. Add the `WHERE` keyword after the `FROM` clause.
     3. Specify the condition inside the parentheses following the `WHERE` keyword. In our example, we're looking for rows where the name is 'John Doe'.
     4. Execute the query to see the filtered results.
     5. Use logical operators (`AND`, `OR`) to combine conditions if needed. For instance:

         ```sql
         SELECT * FROM customers WHERE name = 'John Doe' AND email LIKE '%example.com';
         ```
   ---

   ## Exercise

   1. Write a query to find all customers with the email ending in '@example.com'.
      ```sql
      SELECT * FROM customers WHERE email LIKE '%@example.com';
      ```
   2. Find all orders placed by John Doe between 01-01-2023 and 07-01-2023.
      ```sql
      SELECT * FROM orders WHERE customer_id = (SELECT id FROM customers WHERE name = 'John Doe') AND order_date BETWEEN '2023-01-01' AND '2023-07-01';
      ```
   3. Get the total price of all items in John Doe's orders on 01-01-2023.
      ```sql
      SELECT SUM(price) FROM order_items WHERE order_id = (SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE name = 'John Doe') AND order_date = '2023-01-01');
      ```
   4. List all products with stock less than 5 and price greater than 10.
      ```sql
      SELECT * FROM products WHERE stock < 5 AND price > 10;
      ```
   5. Find the names of customers who have placed orders for products costing more than 20, but not for any product priced over 30.
      ```sql
      SELECT name FROM customers c
      JOIN orders o ON c.id = o.customer_id
      JOIN order_items oi ON o.id = oi.order_id
      WHERE oi.price > 20 AND NOT EXISTS (SELECT * FROM order_items i WHERE i.product_id = oi.product_id AND i.price > 30);
      ```
   ---

   ## Summary

    | Topic           | Description                                                                 |
    |-----------------|-----------------------------------------------------------------------------|
    | `WHERE` Clause  | Filter records based on specific conditions in SQLite queries             |
    | Conditions      | Use `=`, `<`, `>`, `LIKE`, and logical operators (`AND`, `OR`) to filter data |
    | Wildcards       | Use wildcards (`%`, `_`) for pattern matching                              |
    | Multiple Tables | Filter records across multiple tables using joins                          |

   ---

   ## SQLite vs SQL

   | Feature           | SQLite                     | SQL Server, MySQL, PostgreSQL |
    |-------------------|---------------------------|------------------------------|
    | Supported         | Yes (Default SQL dialect)  | Yes (SQL-92 standard)        |
    | Syntax            | Similar but may vary slightly from SQL databases                          |
    | Wildcards         | Supports `%` and `_`              | Supports more advanced wildcards |
   ```