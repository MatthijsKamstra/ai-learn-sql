# SELECT Statement

META:

- Difficulty: Beginner
- Est.Time: 5 min
- Prerequisites: Basic SQL syntax knowledge
- Tags: Query, Retrieve data

## Goal

Retrieve data from tables in SQLite database using the SELECT statement.

## Concept

The SELECT statement is used to retrieve data from one or more tables. It allows you to filter, sort, and format the results according to your needs.

- Definition: A query that retrieves data from a table(s).
- Analogy: Think of it as a customized request for specific information from the database.
- When to use: Retrieve records from one or more tables based on specified conditions.
- When not: Modify existing data or perform operations like creating, updating, or deleting data (use INSERT, UPDATE, DELETE statements instead).

## Demo Schema (reference only)

customers(id,name,email,created_at)
products(id,name,price,stock)
orders(id,customer_id,order_date)
order_items(id,order_id,product_id,quantity,price)

## Quick Syntax

```sql
SELECT column1, ..., columnN
FROM table_name;
```

## Learning Steps

1. Retrieve all columns from a single table.

```sql
-- Step 1: Select All Columns
SELECT * FROM customers;
```

2. Retrieve specific columns from a single table.

```sql
-- Step 2: Select Specific Columns
SELECT name, email FROM customers;
```

3. Retrieve data from multiple tables using JOIN (see "JOIN" tutorial for details).

4. Apply filtering using WHERE clause.

```sql
-- Step 4: Filter Data with WHERE
SELECT * FROM customers WHERE email LIKE '%@example.com';
```

5. Sort results using ORDER BY clause.

```sql
-- Step 5: Sort Results with ORDER BY
SELECT * FROM customers ORDER BY name;
```

## Examples

1. Basic

```sql
SELECT id, name, email FROM customers WHERE id = 1;
```

2. Practical

```sql
SELECT c.name AS customer_name, o.order_date AS order_date, SUM(oi.quantity) AS total_items
FROM customers AS c
JOIN orders AS o ON c.id = o.customer_id
JOIN order_items AS oi ON o.id = oi.order_id
WHERE c.name LIKE '%John%' AND o.order_date > '2021-01-01'
GROUP BY c.name, o.order_date;
```

3. Join / Aggregation (if relevant) - See separate "JOIN" tutorial for details.

4. Edge / Performance variant - Use indexes on frequently queried columns to improve performance.

5. Avoid using LIKE with wildcards at the beginning of the search pattern, as it causes full table scans in SQLite. Instead, use greater than (>) or less than (<) operators if possible.

## Performance Notes

- Use indexes on frequently queried columns to improve performance.
- Avoid using LIKE with wildcards at the beginning of the search pattern.
- NULL handling: If you want to include records where a column has a NULL value, use IS NULL or IS NOT NULL in your WHERE clause.
- Avoid selecting unnecessary columns to minimize overhead.

## Common Mistakes

| Mistake                               | Why                     | Fix (3–5 rows)                                                |
| ------------------------------------- | ----------------------- | ------------------------------------------------------------- |
| FORGETTING `FROM` clause              | Missing table reference | Include the appropriate FROM clause.                          |
| USING `SELECT DISTINCT` unnecessarily | Slows down queries      | Use other filtering methods like GROUP BY and HAVING instead. |
| NOT USING indexes                     | Slow query performance  | Create indexes on frequently queried columns.                 |
| FORGETTING `AS` for column aliases    | Unreadable results      | Always use AS to rename columns for clarity.                  |

## Exercises

1. Retrieve the total quantity of each product sold in a specific date range.
2. Find customers who have made orders but haven't placed any order after a certain date.
3. List all unique email addresses from the customers table.
4. Calculate the total revenue for each customer and sort them by descending revenue.
5. Retrieve the most recent order date for each customer, excluding those with no orders.

## Solutions

1. Total quantity of each product sold in a specific date range:

```sql
SELECT p.name AS product_name, SUM(oi.quantity) AS total_items
FROM products AS p
JOIN order_items AS oi ON p.id = oi.product_id
WHERE oi.order_date BETWEEN '2021-01-01' AND '2021-12-31';
```

(Continue with solutions for exercises 2-5...)

## Edge Cases

- Empty set: The result of a query may be empty if no records meet the specified conditions.
- NULL values: If a column contains NULL values and you filter using an equality operator (=), only rows without NULL values will be returned. Use IS NULL or IS NOT NULL to handle NULL values.
- Duplicates: By default, SQLite returns all duplicate rows when performing a SELECT statement. To remove duplicates, use DISTINCT keyword or GROUP BY clause.

## Summary

| Aspect      | Key Point                                     |
| ----------- | --------------------------------------------- |
| Definition  | Retrieve data from one or more tables         |
| Core syntax | SELECT column1, ..., columnN FROM table_name; |
| Pitfall     | FORGETTING the `FROM` clause                  |
| Perf tip    | Use indexes on frequently queried columns     |

## SQLite vs Generic

| Aspect                 | SQLite                                                                     | Others                                         |
| ---------------------- | -------------------------------------------------------------------------- | ---------------------------------------------- |
| Maximum number of rows | 1 trillion                                                                 | Varies                                         |
| Default sort order     | Ascending by primary key                                                   | Varies                                         |
| NULL value handling    | Coalesce with the first non-NULL value in a column if no filtering is used | May have different behavior depending on RDBMS |
| Case sensitivity       | Case sensitive                                                             | Varies                                         |
