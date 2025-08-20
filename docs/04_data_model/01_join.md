# JOIN

   - JOIN is a SQL operation that combines rows from two or more tables based on a related column between them. This allows you to query data across multiple tables as if it were a single table.

   ## Goal of this lesson:

   - Understand the concept of JOIN in SQLite
   - Learn how to perform different types of JOINs using SQLite syntax
   - Practice writing SQL queries that combine data from multiple tables using JOIN

   ---

   ## Use the default demo.db

   - The `demo.db` is a simple SQLite database provided for this tutorial, consisting of four tables: customers, products, orders, and order_items.
   - Here's the structure of each table:
     - customers: `id`, `name`, `email`, `created_at`
     - products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` (→ customers), `order_date`
     * order_items: `id`, `order_id` (→ orders), `product_id` (→ products), `quantity`, `price`
   - Relationships:
     1. A **customer** has many **orders**
     2. An **order** has many **items**
     3. Each **item** belongs to one **product**
   - Visualization using mermaid.js can be found [here](link_to_mermaid_diagram).

   ---

   ## How it works

   - To perform a JOIN, you use the `JOIN` keyword followed by the table name you want to join with and the related column.
   - Here are five steps to help you understand how it works:
     1. Identify the tables you want to combine. In our case, customers and orders.
     2. Choose a join type (INNER JOIN, LEFT JOIN, RIGHT JOIN or FULL OUTER JOIN).
     3. Write the SELECT statement, specifying the columns you want to retrieve.
     4. Use the JOIN clause to combine the tables based on the related column (e.g., `customers.id = orders.customer_id`).
     5. Run the query and inspect the results.
   - Here's an example of an INNER JOIN:

   ```sql
   SELECT customers.name, orders.order_date
   FROM customers
   INNER JOIN orders ON customers.id = orders.customer_id;
   ```

   ---

   ## Exercise

   - Exercise 1: Write a query to get the names of all customers who have placed an order in February 2023.
   - Exercise 2: Write a query to get the total price of all items purchased by the customer named John Doe.
   - Exercise 3: Write a query to list all orders, including the product name and quantity for each item.
   - Exercise 4: Write a query to find the average order value (total order amount divided by the number of items) for each product.
   - Exercise 5: Write a query to list all customers who have not placed any orders yet.

   ---

   ## Summary

   | Topic                   | Description                                                                                            |
   |-------------------------|--------------------------------------------------------------------------------------------------------|
   | JOIN                    | Combines rows from two or more tables based on a related column                                          |
   | INNER JOIN              | Returns only the matching rows from both tables involved in the join                                      |
   | LEFT (OUTER) JOIN       | Returns all rows from the left table (table listed first), along with the matching rows from the right table|
   | RIGHT (OUTER) JOIN      | Returns all rows from the right table, along with the matching rows from the left table                |
   | FULL OUTER JOIN        | Returns all rows when there is a match in either the left or right table                                 |

   ---

   ## SQLite vs SQL

   | Feature           | SQLite                                                              | SQL                                            |
   |-------------------|------------------------------------------------------------------|-----------------------------------------------|
   | JOIN syntax       | Simplified JOIN syntax (omits the `ON` clause in some cases)    | More verbose syntax requiring an explicit `ON` clause                  |
   | Subqueries        | Supported                                                         | Supported                                      |
   | Transactions      | Supports transactions with `BEGIN`, `COMMIT`, and `ROLLBACK`       | Supports transactions, with more features and options             |
   | Indexes           | Limited indexing capabilities compared to other SQL databases  | More robust indexing capabilities              |
   ```