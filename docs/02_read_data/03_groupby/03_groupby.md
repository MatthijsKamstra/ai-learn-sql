# GROUP BY

META:

- Difficulty: Intermediate
- Est.Time: 5 min
- Prerequisites: SQLite basics, knowledge of SELECT statements
- Tags: aggregation, grouping

## Goal

Organize data by a specific column.

## Concept

`GROUP BY` allows grouping rows based on one or more columns in the `SELECT` statement. The resulting groups are used to compute summary statistics or perform conditional operations.

- Definition: Organizes rows into groups for aggregation or filtering.
- Analogy: Imagine you have a box of mixed fruit and want to count the number of apples, bananas, etc. You group the fruits by their type before counting.
- When to use: Group data to compute summary statistics, perform conditional operations, or display subtotals in reports.
- When not: If there's no need to group or aggregate data. Use other SQL constructs like `JOIN`, `ORDER BY`, etc. instead.

## Demo Schema (reference only)

```sql
customers(id,name,email,created_at);
products(id,name,price,stock);
orders(id,customer_id,order_date);
order_items(id,order_id,product_id,quantity,price);
```

## Quick Syntax

1. Basic grouping: `SELECT column1, ..., columnN, COUNT(*), AVG(columnM), MIN(columnL), MAX(columnK) FROM table GROUP BY column1, ..., columnN;`
2. Grouping with aliases: `SELECT column1 AS grouped_name, COUNT(*) FROM table GROUP BY grouped_name;`
3. Grouping and ordering: `SELECT column1, COUNT(*), AVG(columnM) FROM table GROUP BY column1 ORDER BY COUNT(*);`

## Learning Steps

1. **Step 1: Basic Grouping**
    ```sql
    SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id;
    ```
    This query groups orders by their customers and returns the count of each group.
2. **Step 2: Grouping with Aliases**
    ```sql
    SELECT customer_id AS CustomerCount, COUNT(*) FROM orders GROUP BY customer_id;
    ```
    Renaming the `customer_id` column to `CustomerCount`.
3. **Step 3: Grouping and Ordering**
    ```sql
    SELECT customer_id, COUNT(*), AVG(orders.total) FROM orders INNER JOIN (SELECT id AS order_id, SUM(order_items.price * order_items.quantity) AS total FROM order_items GROUP BY order_id) AS totals ON orders.id = totals.order_id GROUP BY customer_id ORDER BY COUNT(*);
    ```
    Calculating the total amount spent by each customer and ordering them by their count.
4. **Step 4: Using HAVING**
    ```sql
    SELECT customer_id, AVG(orders.total) AS avg_spend FROM orders INNER JOIN (SELECT id AS order_id, SUM(order_items.price * order_items.quantity) AS total FROM order_items GROUP BY order_id) AS totals ON orders.id = totals.order_id GROUP BY customer_id HAVING avg_spend > 100;
    ```
    Using the `HAVING` clause to filter groups based on aggregated values.
5. **Step 5: Advanced Grouping with Multiple Columns**
    ```sql
    SELECT YEAR(order_date) AS year, COUNT(*) FROM orders GROUP BY YEAR(order_date);
    ```
    Grouping orders by the year of their order date.

## Performance Notes

- Index the column(s) used in `GROUP BY` to improve performance.
- Use `COUNT(*)` instead of `COUNT(column)` for better performance when not filtering out `NULL` values.
- Avoid using subqueries with large datasets if possible, as they can negatively impact performance.

## Common Mistakes

| Mistake | Why         | Fix (3–5 rows)                                       |
|---------|-------------|------------------------------------------------------|
| Missing `GROUP BY` clause | Results will be ungrouped and won't make sense     | Add the missing `GROUP BY` clause                    |
| Incorrect `ORDER BY` column | Grouping happens based on the `GROUP BY` clause, not the `ORDER BY` | Correct the `ORDER BY` column to match the grouping columns|
| Using `COUNT(column)` instead of `COUNT(*`) | Inefficient when filtering out `NULL` values           | Use `COUNT(*)` instead                     |

## Exercises

1. List the number of unique customers per product category. (categories: electronics, books, clothing)
2. Calculate the average order quantity for each customer.
3. Display the total amount spent by each customer grouped by their location.
4. Find the most popular product by calculating the count of distinct orders containing each product.
5. List the number of orders made in a specific year. (Hint: Use `YEAR(order_date)` function)

## Solutions

1. ...
2. ...
3. ...
4. ...
5. ...

## Edge Cases

- Empty groups: An empty group will still appear in the results, containing zero rows.
- `NULL` values: Grouping by a column with `NULL` values can cause unexpected results if not handled properly.
- Duplicate rows: If duplicate rows exist within each group, SQLite will only return one row for each group by default, but you can use the `DISTINCT ON` clause to control which row is selected.

## Summary

| Aspect     | Key Point                            |
|------------|--------------------------------------|
| Definition | Organize data into groups for aggregation or filtering   |
| Core Syntax| `SELECT column1, ..., columnN, COUNT(*), AVG(columnM), MIN(columnL), MAX(columnK) FROM table GROUP BY column1, ..., columnN;`    |
| Pitfall    | Not using the correct `GROUP BY` columns can lead to misleading results                          |
| Perf tip   | Index the column(s) used in `GROUP BY` for better performance           |

## SQLite vs Generic

| Aspect      | SQLite         | Others            |
|-------------|----------------|--------------------|
| Null Handling  | Groups include rows with `NULL` values by default     | Handling of `NULL` values may vary depending on the RDBMS (e.g., MySQL, PostgreSQL)        |