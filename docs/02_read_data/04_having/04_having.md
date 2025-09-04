# HAVING Clause

META:

- Difficulty: Intermediate
- Est.Time: 5 min
- Prerequisites: Basic SQL, Aggregate Functions
- Tags: Filters, Grouped Data

## Goal

Filter groups by aggregate values.

## Concept

The `HAVING` clause filters aggregated data in the same way as the `WHERE` clause filters regular data. It's used after a `GROUP BY` statement.

- Definition: Filters grouped data based on aggregate results.
- Analogy: `WHERE` for rows, `HAVING` for groups.
- Why: To restrict which groups are displayed in the result set.
- When to use:
  - When you want to display only specific groups that meet certain criteria.
- When not (use `WHERE` instead):
  - For individual data filtering before grouping.
  - When no aggregation functions are used.

## Demo Schema (reference only)

customers(id,name,email,created_at)
products(id,name,price,stock)
orders(id,customer_id,order_date)
order_items(id,order_id,product_id,quantity,price)

## Quick Syntax

```sql
SELECT column1, ..., columnN, aggregate_function(columnX) AS alias
FROM table
GROUP BY column1, ..., columnN
HAVING condition;
```

## Learning Steps

1. Simple `HAVING`

```sql
-- Step 1: Show customers with more than 3 orders.
SELECT customer_id, COUNT(*) AS num_orders
FROM orders
GROUP BY customer_id
HAVING num_orders > 3;
```

2. Filtering multiple groups

```sql
-- Step 2: Show customers who have spent more than $100 in total and have ordered more than 5 times.
SELECT customer_id, SUM(order_items.price * order_items.quantity) AS total_spent
FROM order_items
JOIN orders ON order_items.order_id = orders.id
GROUP BY customer_id
HAVING total_spent > 100 AND COUNT(*) > 5;
```

3. Multiple conditions (combined with `AND/OR`)

```sql
-- Step 3: Show customers who have spent more than $50 on a single product or have ordered more than 3 products.
SELECT customer_id
FROM order_items
JOIN orders ON order_items.order_id = orders.id
GROUP BY customer_id
HAVING SUM(price) > 50 OR COUNT(DISTINCT product_id) > 3;
```

## Performance Notes

- Index on `customer_id`, `order_date`, and `product_id` for optimal performance.
- Be mindful of NULL values handling in your conditions.
- Avoid using complex aggregate functions like `JSON_EXTRACT()` or `LIKE` in the `HAVING` clause when possible.

## Common Mistakes

| Mistake | Why         | Fix            |
|---------|-------------|----------------|
| Using `WHERE` instead of `HAVING`  | Filters individual data before grouping       | Use `HAVING` for filtering groups.                    |
| Ignoring NULL values in conditions  | Can result in unexpected results               | Use functions like `COALESCE()`, `IS NOT NULL`, or `IFNULL()` to handle NULL values.      |
| Using subqueries inside `HAVING`   | Suboptimal performance                         | Use `JOINs` and aggregate functions directly in the main query for better performance.  |

## Exercises

1. Show customers who have placed orders between Jan 1, 2021, and Feb 28, 2021, with a total spending of more than $300.
2. Find out the product IDs that have been sold at least 10 times and their average price.
3. List the customers who haven't ordered any items yet and their email addresses.
4. Display all products that have never been ordered or have a stock of zero.
5. Show the top 5 most expensive products and the total quantity sold for each.

## Solutions

1. ...
2. ...
3. ...
4. ...
5. ...

## Edge Cases

- When there are no groups that meet the `HAVING` condition, an empty set is returned (no rows).
- NULL values can affect the aggregation results, causing unexpected groupings or filtering outcomes. Use appropriate handling functions to avoid these issues.

## Summary

| Aspect       | Key Point            |
|--------------|----------------------|
| Definition   | Filters grouped data |
| Core syntax  | `HAVING condition`   |
| Pitfall      | Using `WHERE` instead of `HAVING` for filtering groups. |
| Perf tip    | Proper index usage and NULL handling |

## SQLite vs Generic

- In general, the use and syntax of the `HAVING` clause is similar across various database systems.
- Some databases like MySQL support window functions (analytic functions) that can be used in place of subqueries within the `HAVING` clause, but SQLite does not currently support these features.