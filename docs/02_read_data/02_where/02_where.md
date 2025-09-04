# WHERE Clause in SQLite

META:

- Difficulty: Beginner
- Est.Time: 5 min
- Prerequisites: Basic SQL knowledge, familiarity with the demo schema
- Tags: Filtering, Selection, Conditions

## Goal
Filter records based on specific conditions in a SQLite query.

## Concept
The `WHERE` clause is used to filter out records that do not meet certain criteria during selection. It acts like a sieve, allowing only the desired rows through the query.

- Definition: Filters the results of a SELECT statement based on conditions specified within the WHERE clause.
- Analogy: Similar to filtering items in a list based on specific properties.
- Why: Enables more focused and efficient queries by eliminating unnecessary data.
- When to use: Whenever you need to select only certain records from a table or join result.
- When not (alternatives): Use `JOIN` clauses for combining tables, `HAVING` clause with aggregate functions like COUNT(), SUM(), AVG(), etc.

## Demo Schema (reference only)
```sql
CREATE TABLE customers(id INTEGER PRIMARY KEY, name TEXT, email TEXT, created_at DATETIME);
CREATE TABLE products(id INTEGER PRIMARY KEY, name TEXT, price REAL, stock INTEGER);
CREATE TABLE orders(id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers(id), order_date DATETIME);
CREATE TABLE order_items(id INTEGER PRIMARY KEY, order_id INTEGER REFERENCES orders(id), product_id INTEGER REFERENCES products(id), quantity INTEGER, price REAL);
```

## Quick Syntax
```sql
SELECT * FROM table WHERE condition;
```
- Variation 1: `SELECT column1, column2 ... FROM table WHERE condition;`
- Variation 2: `SELECT * FROM table1 JOIN table2 ON condition WHERE additional_condition;`

## Learning Steps
1. **Step 1: Simple Filtering**
```sql
-- Step 1: Simple Filtering
SELECT * FROM customers WHERE name = 'John Doe';
```

- Explanation: Retrieves all records from the `customers` table where the `name` column equals "John Doe".

2. **Step 2: Combining Conditions**
```sql
-- Step 2: Combining Conditions
SELECT * FROM customers WHERE age > 18 AND country = 'USA';
```

- Explanation: Retrieves all records from the `customers` table where both conditions are met (i.e., age is greater than 18 and country is equal to USA).

3. **Step 3: Using Operators**
```sql
-- Step 3: Using Operators
SELECT * FROM products WHERE price < 10 OR stock > 5;
```

- Explanation: Retrieves all records from the `products` table where either the price is less than 10 or the stock quantity is greater than 5.

4. **Step 4: Using LIKE Operator for Pattern Matching**
```sql
-- Step 4: Using LIKE Operator for Pattern Matching
SELECT * FROM customers WHERE name LIKE 'J%';
```

- Explanation: Retrieves all records from the `customers` table where the `name` starts with "J". The "%" symbol is a wildcard that matches any number of characters.

5. **Step 5: Using IS NULL / IS NOT NULL**
```sql
-- Step 5: Using IS NULL / IS NOT NULL
SELECT * FROM customers WHERE email IS NULL;
```

- Explanation: Retrieves all records from the `customers` table where the `email` column does not contain any value.

## Performance Notes
- Index the columns you frequently filter by to improve query performance.
- Avoid using LIKE with a wildcard at the beginning of the pattern, as it can lead to full table scans and poor performance.
- Use appropriate operators like "=" instead of broad ones like "<>".

## Common Mistakes
| Mistake | Why | Fix (3–5 rows)
|---|---|---|
| Using != or <> instead of < or > | SQLite treats them as the same, but they can lead to unintentional results. | Use < or > instead.
| Not using indexes on frequently filtered columns | This will slow down your queries significantly. | Create an index on the column(s) used for filtering.
| Using LIKE with wildcards at the beginning of the pattern | SQLite can't use an index in this case, leading to full table scans. | Use wildcards only at the end of the pattern.

## Exercises
1. List all products priced over $50.
2. Find customers who have made orders within the last month.
3. Retrieve all customers from Canada who have not provided an email address.
4. Show orders with more than 5 items per order.
5. Display the names of customers who own products priced under $10.

## Solutions
1. ```sql
SELECT * FROM products WHERE price > 50;
```
2. ```sql
SELECT c.* FROM customers AS c
JOIN orders AS o ON c.id = o.customer_id
WHERE o.order_date > DATE('now', '-1 month');
```
3. ```sql
SELECT * FROM customers WHERE country = 'Canada' AND email IS NULL;
```
4. ```sql
SELECT o.* FROM orders AS o
JOIN (
    SELECT order_id, COUNT(*) as num_items
    FROM order_items
    GROUP BY order_id
) AS oi ON o.id = oi.order_id
WHERE oi.num_items > 5;
```
5. ```sql
SELECT c.name FROM customers AS c
JOIN products AS p ON c.id IN (
    SELECT customer_id FROM order_items WHERE price < 10
);
```

## Edge Cases
- Empty Set: No records will be returned if no rows match the conditions in the WHERE clause.
- NULL Handling: Records with a NULL value for the column being filtered will only be included if the comparison is made using IS NULL or IS NOT NULL.
- Duplicates: The WHERE clause does not affect duplicate results from the SELECT statement; all duplicates will still appear in the output.

## Summary
| Aspect | Key Point (Definition, Core syntax, Pitfall, Perf tip)
|---|---|---|---|
| Definition | Filters out records that do not meet specific conditions. | Core syntax: `SELECT * FROM table WHERE condition;` | Pitfall: Using inappropriate operators or incorrect use of wildcards can lead to poor performance. | Perf tip: Index frequently filtered columns for improved query speed.

## SQLite vs Generic
| Aspect | SQLite | Others (only if differences matter)
|---|---|---|
| Case Sensitivity | Case-insensitive by default. Use the LOWER() or UPPER() function to make comparisons case-sensitive if needed. | Case-sensitive in some databases like MySQL.
| Pattern Matching | Uses LIKE operator with wildcards % and _ for pattern matching. | Different wildcard characters are used in other databases (e.g., MySQL uses % and _ as well, but also allows [] for sets).