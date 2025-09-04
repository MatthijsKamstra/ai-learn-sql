# SQLite Aggregation Functions

META:

- Difficulty: Intermediate
- Est.Time: 5 min
- Prerequisites: Basic SQL knowledge, familiarity with SQLite.
- Tags: Aggregation, Grouping, SQLite functions

## Goal
Aggregate data by group and perform calculations on the result set.

## Concept
Calculate summaries of a column for each distinct group in another column.

- Definition: Perform operations (sum, count, min, max) across groups defined by other columns.
- Analogy: Total sales per category in a store.
- Why: Compact data, extract meaningful insights.
- When to use: Analyzing trends, calculating averages, finding totals, etc.
- When not: For single-row queries or simple data retrieval (use SELECT instead).

## Demo Schema (reference only)
customers(id,name,email,created_at)
products(id,name,price,stock)
orders(id,customer_id,order_date)
order_items(id,order_id,product_id,quantity,price)

## Quick Syntax
1. `SELECT column, AGG_FUNCTION(column) GROUP BY grouping_column;`
2. `SELECT column1, column2, AGG_FUNCTION(column3) FROM table GROUP BY column4 HAVING AGG_FUNCTION(column3) > value;`

## Learning Steps
1. **Step 1: Basic Aggregation**
    ```sql
    SELECT product_id, COUNT(*) as total_orders
    FROM order_items
    GROUP BY product_id;
    ```
    Get the number of orders for each product.

2. **Step 2: Multiple Columns**
    ```sql
    SELECT customer_id, AVG(price) as avg_order_price
    FROM order_items
    GROUP BY customer_id;
    ```
    Get the average price of orders for each customer.

3. **Step 3: Filtered Aggregation**
    ```sql
    SELECT product_id, AVG(price) as avg_order_price
    FROM order_items
    WHERE price > 100
    GROUP BY product_id;
    ```
    Get the average price of orders for expensive products.

4. **Step 4: Multiple Grouping Columns**
    ```sql
    SELECT customer_id, YEAR(order_date) as year, COUNT(*) as num_orders
    FROM orders
    GROUP BY customer_id, YEAR(order_date);
    ```
    Get the number of orders per customer per year.

5. **Step 5: Complex Aggregation with HAVING**
    ```sql
    SELECT product_id, SUM(price * quantity) as total_revenue
    FROM order_items
    GROUP BY product_id
    HAVING SUM(price * quantity) > 1000;
    ```
    Get the products with a total revenue greater than 1000.

## Performance Notes
- Index the grouping column and the columns used in aggregation expressions for better performance.
- Use `HAVING` instead of `WHERE` when filtering groups (not rows).
- Avoid `COUNT(*)` on large tables, use `COUNT(DISTINCT column)` instead.

## Common Mistakes
| Mistake | Why     | Fix                |
|---------|---------|-------------------|
| `WHERE` instead of `HAVING`  | Filters groups incorrectly        | Use `HAVING` instead.              |
| No index on grouping column | Slow query performance            | Add an index on the grouping column.    |
| Using `COUNT(*)` on large tables | High memory usage               | Use `COUNT(DISTINCT column)`.       |

## Exercises
1. Calculate total sales per customer.
2. Find the most popular product by number of orders.
3. Get the average price of products ordered in 2021.
4. Find customers who placed more than 5 orders in 2021.
5. Calculate the total revenue for each order_date.

## Solutions
1. ...
2. ...
3. ...
4. ...
5. ...

## Edge Cases
- Empty groups: SQLite returns a zero for aggregate functions on empty groups.
- NULL values: SQLite ignores NULL values in aggregations unless explicitly specified with functions like `COUNT(non_null_column)`.
- Duplicates: SQLite treats duplicate rows as separate occurrences in aggregations.

## Summary
| Aspect     | Key Point                  |
|------------|---------------------------|
| Definition | Calculate summaries per group |
| Core syntax| `SELECT ... GROUP BY ...;`   |
| Pitfall    | Ignoring NULL values       |
| Perf tip   | Indexing grouping columns  |

## SQLite vs Generic
| Aspect     | SQLite                      | Others            |
|------------|-----------------------------|-------------------|
| Aggregates | SUM, AVG, MIN, MAX, COUNT, etc.    | Similar but syntax may vary.       |