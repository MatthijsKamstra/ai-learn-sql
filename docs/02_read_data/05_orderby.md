# Order By Clause

   - The ORDER BY clause is used to sort the result-set in ascending or descending order based on one or more columns. In SQLite, we can use this clause locally.

   ## Goal of this lesson:
   - Understand how to sort the results using the ORDER BY clause.
   - Learn to use multiple column sorting and null handling in SQLite.

   ---

   ## Use the default demo.db
   - This tutorial uses a simple SQLite database named `demo.db`. It consists of four tables: customers, products, orders, and order_items.
   * customers: `id`, `name`, `email`, `created_at`
   * products: `id`, `name`, `price`, `stock`
   * orders: `id`, `customer_id` (fk to customers), `order_date`
   * order_items: `id`, `order_id` (fk to orders), `product_id` (fk to products), `quantity`, `price`
   - Visualization of the database schema can be found [here](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoieW9wZXJhdG9yIiwibWFwcGluZ3MiOnsid2luIjoicmVhbGx5Om1hcnkubmFtZSI7czo4OiJ0aHJvdWdoYXRlIiwic2NvcGUiOnsicmVhbGx5IjpudWxsLCJzaXplIjoxMzEuOTAwLDEyOC41MTI5LDAsInByaWdobilB7ImF2YXcgZnJvbSgidG8gUGFnZSwic2VhcmNoU3BlYyI6W3sibGl0aCI6IlJPTiIsInNvcnJhY3QiOjAsImRpc2NyaXB0aW9uIjp7InNvdXJjZSI6ImJvZHkiLCJ2YXJsb252ZXJhdGVkIjoibmVhc2UifQ==).

   ---

   ## How it works
   - 1. Specify the ORDER BY clause after the SELECT statement to sort the result-set.
     ```
     SELECT * FROM orders ORDER BY customer_id;
     ```
   - 2. To sort in descending order, use the DESC keyword.
     ```
     SELECT * FROM orders ORDER BY customer_id DESC;
     ```
   - 3. Sort multiple columns by separating them with commas. The sorting will be based on the first column, then the second, and so on.
     ```
     SELECT * FROM orders ORDER BY order_date, customer_id;
     ```
   - 4. Null values are handled as follows:
      1. If ascending, nulls appear before non-null values.
      2. If descending, nulls appear after non-null values.
     ```
     SELECT * FROM orders ORDER BY order_date;
     ```
   - 5. To sort first by a specific column and then ignore null values in the next column, use the NULLS FIRST/LAST modifier.
     ```
     SELECT * FROM orders ORDER BY order_date NULLS FIRST, customer_id;
     ```

   ---

   ## Exercise
   - 1. List all customers in ascending order of their email addresses.
     ```sql
     SELECT * FROM customers ORDER BY email;
     ```
   - 2. Show the top 5 most expensive products, sorted by price in descending order.
     ```sql
     SELECT * FROM products ORDER BY price DESC LIMIT 5;
     ```
   - 3. Display all orders for a specific customer (id=1) and sort them based on their order dates.
     ```sql
     SELECT * FROM orders WHERE customer_id = 1 ORDER BY order_date;
     ```
   - 4. List all orders with the total number of items for each order, sorted by the total number of items in descending order. Hint: Use a subquery to get the count of items per order.
     ```sql
     SELECT orders.id, (SELECT COUNT(*) FROM order_items WHERE orders.id = order_items.order_id) as total_items
     FROM orders
     ORDER BY total_items DESC;
     ```
   - 5. Show the most recent 10 orders for customers with email addresses containing "example", sorted by order dates in ascending order and ignoring null values in the customer names.
     ```sql
     SELECT * FROM orders
     WHERE customers.email LIKE '%example%' AND customers.name IS NOT NULL
     ORDER BY order_date, customers.name NULLS FIRST LIMIT 10;
     ```

   ---

   ## Summary

   | Topic              | Description                             |
   |--------------------|-----------------------------------------|
   | ORDER BY           | Sorts the result-set based on one or more columns |
   | ASC/DESC           | Sorts in ascending/descending order     |
   | Multiple column    | Sort multiple columns by separating with commas  |
   | NULL handling      | Null values appear before non-null values (ASC) and after (DESC) |
   | NULLS FIRST/LAST   | Ignore null values in the next column when sorting|

   ---

   ## SQLite vs SQL

   |                    | SQLite                | SQL (e.g., MySQL, PostgreSQL)     |
   |--------------------|-----------------------|----------------------------------|
   | ORDER BY clause    | Supported              | Supported                        |
   | NULL handling      | Nulls appear first by default (ASC), last by default (DESC) | Null values appear last by default, can be changed with the ORDER BY NULLS LAST option  |
   ```