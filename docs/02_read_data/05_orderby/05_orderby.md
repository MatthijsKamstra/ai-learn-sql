# ORDER BY

META:

- Difficulty: Beginner
- Est.Time: 5 min
- Prerequisites: Basic SQL knowledge, familiarity with SQLite tables and SELECT statements.
- Tags: Sorting, Query results organization.

## Goal

Sort query results in ascending or descending order.

## Concept

The ORDER BY clause allows sorting the output of a query based on specified columns. Ascending order (default) is indicated by no symbol (`ASC`), while descending order is denoted by `DESC`.

- Use when you want to organize the data according to a particular column or set of columns.
- Do not use if the ordering does not matter for your query results, as it may affect performance.

## Demo Schema (reference only)

```sql
CREATE TABLE customers(id INTEGER PRIMARY KEY, name TEXT, email TEXT, created_at DATETIME);
CREATE TABLE products(id INTEGER PRIMARY KEY, name TEXT, price REAL, stock INTEGER);
CREATE TABLE orders(id INTEGER PRIMARY KEY, customer_id INTEGER, order_date DATETIME);
CREATE TABLE order_items(id INTEGER PRIMARY KEY, order_id INTEGER, product_id INTEGER, quantity INTEGER, price REAL);
```

## Quick Syntax

```sql
SELECT column1, column2, ... FROM table ORDER BY column1 ASC|DESC, column2 ASC|DESC, ...;
```

## Learning Steps

1. **Basic**

```sql
-- Step 1: Sort customers by name in ascending order
SELECT * FROM customers ORDER BY name ASC;
```

2. **Practical**

```sql
-- Step 2: Sort products by price in descending order and stock in ascending order
SELECT * FROM products ORDER BY price DESC, stock ASC;
```

3. **Join / Aggregation (if relevant)**

In this case, we'll sort order items by their `price`. Since the `order_items` table does not have a GROUP BY clause, it will be sorted independently for each `order_id`.

```sql
-- Step 3: Join orders and order_items tables and sort order_items by price in ascending order
SELECT o.*, oi.* FROM orders AS o JOIN order_items AS oi ON o.id = oi.order_id ORDER BY oi.price ASC;
```

4. **Edge / Performance variant**

SQLite doesn't support indexes on expressions or computed columns. If you frequently use complex expressions in your ORDER BY clause, consider creating a separate column with the expression for better performance.

## Performance Notes

- When ordering by an expression or calculated value, create an index on that expression if possible to improve query performance.
- Avoid using multiple levels of subqueries within the ORDER BY clause as it can negatively impact performance.

## Common Mistakes

| Mistake           | Why                   | Fix (3–5 rows) |
|-------------------|-----------------------|---------------|
| Incorrect order   | Wrong ASC/DESC symbol  | Use correct ASC/DESC symbols |
| Case-sensitivity  | Column names case     | Ensure column names are consistent with case sensitivity |
| Not specifying    | Missing ORDER BY clause  | Always include an ORDER BY clause when needed |

## Exercises

1. Sort customers by email in descending order.
2. List orders with the highest total price (order_items.price multiplied by order_items.quantity) for each order in descending order.
3. Find the 5 most expensive products sorted by their names in ascending order.
4. Show all customers created before a given date, sorted alphabetically by name.
5. Display products with the smallest stock levels, in ascending order of price.

## Solutions

1. ```sql
SELECT * FROM customers ORDER BY email DESC;
```
2. ```sql
SELECT o.*, SUM(oi.price*oi.quantity) AS total_price FROM orders AS o JOIN order_items AS oi ON o.id = oi.order_id GROUP BY o.id ORDER BY total_price DESC;
```
3. ```sql
SELECT * FROM products WHERE stock IN (SELECT MIN(stock) FROM products GROUP BY price ORDER BY price ASC LIMIT 5);
```
4. ```sql
SELECT * FROM customers WHERE created_at < 'your-date' ORDER BY name ASC;
```
5. ```sql
SELECT * FROM products WHERE stock = (SELECT MIN(stock) FROM products WHERE stock > 0);
```

## Edge Cases

- Empty set: No rows are returned, so there is no ordering to be done.
- NULL values: Ordering by a column with NULL values will sort them based on their presence and absence (NULLs appear first in ascending order and last in descending order).
- Duplicates: SQLite does not guarantee the order of duplicate rows in query results. To ensure deterministic ordering, use the DISTINCT keyword if needed.

## Summary

| Aspect          | Key Point                                              |
|-----------------|------------------------------------------------------|
| Definition      | ORDER BY clause sorts query results based on specified columns. |
| Core syntax     | SELECT column1, column2, ... FROM table ORDER BY column1 ASC|DESC, column2 ASC|DESC, ...; |
| Pitfall         | Avoid using multiple levels of subqueries within the ORDER BY clause for better performance. |
| Perf tip        | Index an expression or calculated value if frequently used in the ORDER BY clause. |

## SQLite vs Generic

- Aspect            | SQLite      | Others          |
|-------------------|------------|----------------|
| Case sensitivity   | Case sensitive by default    | Case insensitive (PostgreSQL, MySQL) |
| Expression indexes | Not supported                     | Supported (PostgreSQL, MySQL)          |