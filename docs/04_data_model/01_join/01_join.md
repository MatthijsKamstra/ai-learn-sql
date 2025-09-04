# JOIN

META:

- Difficulty: Intermediate
- Est.Time: 10 min
- Prerequisites: Basic SQL knowledge, understanding of tables and columns
- Tags: Join, SQLite, Relational Algebra, Inner Join, Left Join, Right Join, Cross Join

## Goal

Combine rows from two or more tables based on a related column.

## Concept

JOIN combines rows from multiple tables, based on a common column between them. It allows for data analysis and querying across multiple tables.

- When to use: To extract relevant data from multiple tables.
- When not: For simple queries involving only one table. Use subqueries or CTEs instead.

## Demo Schema (reference only)
```sql
customers(id, name, email, created_at)
products(id, name, price, stock)
orders(id, customer_id, order_date)
order_items(id, order_id, product_id, quantity, price)
```

## Quick Syntax
- Inner Join: `SELECT customers.name, products.name FROM customers INNER JOIN products ON customers.id = products.customer_id;`
- Left Join: `SELECT customers.name, products.name FROM customers LEFT JOIN products ON customers.id = products.customer_id;`
- Right Join: Unsupported in SQLite (use a subquery instead).
- Cross Join: `SELECT * FROM customers CROSS JOIN products;`

## Learning Steps
1. **Step 1: Inner Join**
```sql
SELECT customers.name, products.name FROM customers INNER JOIN products ON customers.id = products.customer_id;
```
Combines rows from both tables where the join condition is true.

2. **Step 2: Left Join**
```sql
SELECT customers.name, products.name FROM customers LEFT JOIN products ON customers.id = products.customer_id;
```
Returns all rows from the left table and matching rows from the right table. If no match is found, NULL values are used for right-side columns.

3. **Step 3: Customize Join**
```sql
SELECT customers.name, products.name FROM customers INNER JOIN products ON customers.id = products.customer_id WHERE customers.email='john@example.com';
```
Filter the joined data using a WHERE clause.

4. **Step 4: Aliasing Tables**
```sql
SELECT c.name, p.name FROM customers AS c INNER JOIN products AS p ON c.id = p.customer_id;
```
Alias tables for easier referencing.

5. **Step 5: Multiple Joins**
```sql
SELECT orders.order_date, products.name FROM orders INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN products ON order_items.product_id = products.id;
```
Chain multiple joins to combine data from more than two tables.

## Examples
1. Basic
```sql
SELECT customers.name, products.name FROM customers INNER JOIN products ON customers.id = products.customer_id WHERE customers.email='john@example.com';
```
2. Practical
```sql
SELECT c.name, p.name, oi.quantity FROM customers AS c LEFT JOIN orders AS o ON c.id = o.customer_id
                                        INNER JOIN order_items AS oi ON o.id = oi.order_id;
```
3. Join / Aggregation
```sql
SELECT customers.name, SUM(oi.quantity) as total_purchased FROM customers
                                     LEFT JOIN orders ON customers.id = orders.customer_id
                                     INNER JOIN order_items ON orders.id = order_items.order_id
GROUP BY customers.name;
```
4. Edge / Performance variant
```sql
SELECT c.name, p.name FROM customers AS c
JOIN (
    SELECT order_id, product_id, MIN(quantity) as min_qty
    FROM order_items GROUP BY order_id, product_id
) AS oi ON c.id = oi.customer_id AND p.id = oi.product_id;
```
## Performance Notes
- Use indexes on columns used in joins and WHERE clauses.
- Avoid excessive use of subqueries or multiple joins for performance reasons.

## Common Mistakes
| Mistake | Why | Fix (3–5 rows)
|---|---|---|
| Incorrect join condition | Mismatched column names, data types or operators | Use correct columns and ensure they are compatible.
| Using a cross join unintentionally | Combines all possible combinations of records from both tables | Use an inner join instead to filter the results.
| Not handling NULL values appropriately | Affects query results when left/right joining data with missing values | Use COALESCE or IFNULL functions for handling NULL values.

## Exercises
1. List all customers who have purchased a product costing more than $50.
2. Find the total quantity of each product ordered by John Doe (john@example.com).
3. Show the name of every customer that hasn't placed any orders yet.
4. Display the email addresses of customers who have placed orders with at least 10 items in total.
5. Show the order date for all orders containing a product with stock below 5.

## Solutions
1. ...
2. ...
3. ...
4. ...
5. ...

## Edge Cases
- Empty set: No rows returned when no matching data exists between tables.
- NULL values: Affect query results in left/right joins when no match is found for a particular column.
- Duplicates: Multiple matches may result in duplicate rows when joining tables. Use DISTINCT to remove duplicates or group by the relevant columns.

## Summary
| Aspect | Key Point (Definition, Core syntax, Pitfall, Perf tip)
|---|---|---|---|
| Definition | Combines data from multiple tables based on a common column. | JOIN operation allows for data analysis and querying across multiple tables. | Avoid excessive use of subqueries or multiple joins for performance reasons.
| Core syntax | Inner Join: `SELECT ... FROM table1 INNER JOIN table2 ON table1.id = table2.id;`<br> Left Join: `SELECT ... FROM table1 LEFT JOIN table2 ON table1.id = table2.id;` | Use aliases for tables and ensure correct join condition.
| Pitfall | Incorrect join condition can lead to unexpected results. | Use correct columns and ensure they are compatible.
| Perf tip | Indexes on joined columns improve query performance. | Create indexes on columns used in joins and WHERE clauses.

## SQLite vs Generic
| Aspect | SQLite | Others (only if differences matter)
|---|---|---|
| Right Join | Not supported (use a subquery instead). | Supported in most RDBMSs (PostgreSQL, MySQL, etc.).