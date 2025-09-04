# SELECT in SQLite

META:

- Difficulty: Beginner
- Est.Time: 5 min
- Prerequisites: Basic understanding of SQLite and the demo schema (customers, products, orders, order_items).
- Tags: `SELECT`, `queries`, `projections`

## Goal

Retrieve specific data from a database.

## Concept

`SELECT` is used to choose and retrieve columns from one or more tables in the database. It allows you to create a virtual table as a result of executing the query, known as a "query result" or "result set."

- Definition: A command that retrieves data from a database by specifying columns and filter criteria.
- Analogy: Imagine you have multiple boxes filled with different items (columns), and you want to pick only specific items (columns) based on certain conditions (filter criteria).
- Why: To extract, analyze, and use the required data in your application.
- When to use:
  - Querying data for a report or display.
  - Filtering records for further processing.
- When not:
  - Performing actions like `INSERT`, `UPDATE`, or `DELETE` (use `INSERT INTO`, `UPDATE`, and `DELETE FROM` instead).
  - Creating relationships between tables (SQLite does not support RIGHT/FULL OUTER JOIN, roles, GRANT, stored procedures).

## Demo Schema (reference only)

```sql
CREATE TABLE customers(id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE products(id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL, stock INTEGER NOT NULL);
CREATE TABLE orders(id INTEGER PRIMARY KEY, customer_id INTEGER NOT NULL, order_date DATETIME DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE order_items(id INTEGER PRIMARY KEY, order_id INTEGER NOT NULL, product_id INTEGER NOT NULL, quantity INTEGER NOT NULL, price REAL NOT NULL);
```

## Quick Syntax

- Basic: `SELECT column1, column2 FROM table;`
- With filtering: `SELECT column1, column2 FROM table WHERE condition;`
- Ordered by a column: `SELECT column1, column2 FROM table ORDER BY column1;`
- Limit the number of results: `SELECT column1, column2 FROM table LIMIT n;` (where `n` is the number of rows to retrieve)

## Learning Steps

1. **Basic:** Retrieve all columns from a single table.

```sql
-- Step 1: Basic query
SELECT * FROM customers;
```

2. **Filtering:** Select specific rows based on a condition.

```sql
-- Step 2: Filter by email domain
SELECT * FROM customers WHERE email LIKE '%example.com';
```

3. **Ordering:** Sort the results by a column.

```sql
-- Step 3: Order by name
SELECT * FROM customers ORDER BY name;
```

4. **Limiting:** Limit the number of rows returned in the result set.

```sql
-- Step 4: Limit to 10 rows
SELECT * FROM customers LIMIT 10;
```

5. **Selecting specific columns:** Choose only certain columns from the table.

```sql
-- Step 5: Select id and name only
SELECT id, name FROM customers;
```

## Examples

1. Basic

```sql
SELECT * FROM customers;
```

2. Practical

```sql
SELECT name, email FROM customers WHERE email LIKE '%example.com';
```

3. Join / Aggregation (not supported in SQLite)

Use multiple `SELECT` statements with `JOIN` or use subqueries for basic aggregations (e.g., COUNT). For more complex aggregations, consider using a database management system that supports it.

4. Edge / Performance variant

Optimize your queries by indexing relevant columns and using efficient WHERE clauses. Avoid using wildcard characters in the WHERE clause if possible. Use EXPLAIN QUERY PLAN to verify the query execution plan and identify potential performance issues.

## Performance Notes

- Index columns used in the `WHERE` clause, `ORDER BY`, or `JOIN ON` clauses for faster data retrieval.
- Avoid using wildcard characters (e.g., `%`) in the `WHERE` clause if possible as it may lead to full table scans.
- Limit the number of rows returned when possible to improve performance.

## Common Mistakes

| Mistake | Why        | Fix                                |
|---------|------------|-----------------------------------|
| Forgetting a comma between columns in the `SELECT` clause. | Causes syntax errors and may lead to unexpected results.      | Use a comma (`,`) to separate each column name in the `SELECT` clause. |
| Leaving out an alias or table name when using multiple tables.   | Causes ambiguity and may lead to syntax errors.                  | Ensure that each column name is explicitly qualified with its table alias or fully-qualified table name. |
| Using unsupported SQL features (e.g., RIGHT/FULL OUTER JOIN).  | Not supported in SQLite, causing syntax errors.                | Use alternative methods like subqueries or multiple `SELECT` statements to achieve the desired result set. |

## Exercises

1. List all customers who have placed orders with a total order value greater than $500.
2. Find the average price of each product in stock.
3. Display customer names and their total number of orders.
4. List all orders made by the customer with email `john_doe@example.com`.
5. Show the name of customers who have never placed an order.

## Solutions

1. ...
2. ...
3. ...
4. ...
5. ...

## Edge Cases

- Empty set: An empty result set is returned when no rows match the specified conditions.
- NULL handling: NULL values can cause issues with filtering and sorting. Use the `IS NULL` or `IS NOT NULL` operator to handle NULL values explicitly.
- Duplicates: If duplicate rows exist, the `SELECT` statement will return all of them unless you use a GROUP BY clause with an aggregate function (not supported in SQLite).

## Summary

| Aspect   | Key Point                                                                |
|----------|-------------------------------------------------------------------------|
| Definition | A command used to retrieve data from a database based on specified columns and filter criteria.          |
| Core syntax | `SELECT column1, column2 FROM table;`<br>`WHERE condition` (optional)<br>`ORDER BY column1` (optional)<br>`LIMIT n` (optional)  |
| Pitfall   | Unsupported SQL features like RIGHT/FULL OUTER JOIN.                          |
| Perf tip  | Index relevant columns, avoid wildcard characters in WHERE clause, limit row count when possible.        |

## SQLite vs Generic

| Aspect             | SQLite       | Others         |
|--------------------|--------------|----------------|
| Full OUTER JOIN    | Not supported | Supported (e.g., MySQL, PostgreSQL) |
| GRANT              | Not supported | Supported (e.g., MySQL, PostgreSQL)  |
| Stored Procedures  | Not supported | Supported (e.g., MySQL, PostgreSQL) |