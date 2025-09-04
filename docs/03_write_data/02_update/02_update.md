# UPDATE

META:

- Difficulty: Intermediate
- Est.Time: 5 min
- Prerequisites: Basic SQL, SELECT
- Tags: Data Manipulation Language (DML), Updating records

## Goal

Modify existing rows in a table.

## Concept

UPDATE alters the values of columns for rows in a table based on matching conditions.

- Definition: Modifies selected columns of a specified table with the new data specified by the VALUES clause or a subquery.
- Analogy: Editing a document, changing specific words/phrases while leaving others intact.
- Why: To make changes to existing records in your database without deleting and reinserting them.
- When to use: You have an existing record that needs modifications based on certain conditions.
- When not (Alternatives): DELETE + INSERT, REPLACE, using transactions for multiple updates.

## Demo Schema (reference only)

```sql
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT, created_at DATETIME);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, stock INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, order_date DATETIME);
CREATE TABLE order_items (id INTEGER PRIMARY KEY, order_id INTEGER, product_id INTEGER, quantity INTEGER, price REAL);
```

## Quick Syntax

```sql
-- Basic: Update a single column
UPDATE table SET column = value WHERE condition;

-- Multiple columns and values
UPDATE table SET col1 = val1, col2 = val2, ... WHERE condition;

-- Using subquery (SET FROM)
UPDATE table SET column = (SELECT expression FROM other_table WHERE other_condition);
```

## Learning Steps

1. Update a single column: Increase the price of all products that have stock less than 5.

```sql
-- Step 1: Increase prices for low-stock products
UPDATE products SET price *= 1.2 WHERE stock < 5;
```

2. Multiple columns and values: Set the email column of a specific customer to a new value.

```sql
-- Step 2: Change customer's email
UPDATE customers SET email = 'new_email@example.com' WHERE id = 1;
```

3. Using subquery (SET FROM): Update the stock based on average product prices in a category.

```sql
-- Step 3: Adjust stock levels using avg price
UPDATE order_items SET stock = stock - quantity, price = AVG(price)
FROM products p WHERE order_items.product_id = p.id GROUP BY category;
```

## Performance Notes

- Index the relevant columns involved in the condition or subquery for faster lookups.
- Avoid using UPDATE statements with OR conditions when possible, as they require a full table scan. Use multiple UPDATE statements instead.
- NULL handling: Consider using COALESCE() to handle NULL values if needed.

## Common Mistakes

| Mistake | Why   | Fix (3–5 rows)                                        |
|---------|-------|------------------------------------------------------|
| Forgetting the WHERE clause | Unintended updates may occur throughout the table | Add a WHERE clause to limit updates to specific rows.      |
| Using OR in conditions       | A full table scan may be performed, impacting performance  | Split the conditions into multiple UPDATE statements or use JOINs to improve performance.            |
| Using an incorrect alias   | Mismatched column names could lead to unexpected results | Verify that aliases match when using subqueries.           |
| Leaving out transaction control | Multiple updates can interfere with each other if not properly coordinated    | Use transactions to manage multiple updates and ensure data integrity.            |

## Exercises

1. Update the name of all customers whose emails are 'example@example.com'.
2. Increase the stock level for a specific product by 50%.
3. Set the price of each order item to its respective product's average price within a category.
4. Update the email column with the new domain 'email-new.com' for all customers whose current emails end in '.old-domain.com'.
5. Increase the stock level for each product whose stock is below the average stock across all products in its category.

## Solutions

1.
```sql
UPDATE customers SET name = 'New Name' WHERE email = 'example@example.com';
```
2.
```sql
-- Assuming id 1 represents the specific product
UPDATE products SET stock *= 1.5 WHERE id = 1;
```
3.
```sql
-- Assuming category is a column in both products and order_items tables
UPDATE order_items SET price = AVG(p.price) FROM products p WHERE order_items.product_id = p.id GROUP BY category;
```
4.
```sql
UPDATE customers SET email = CONCAT(email, '@email-new.com');
```
5.
```sql
-- Assuming avg_stock is a subquery that returns the average stock for each product in its category
UPDATE products SET stock = AVG_STOCK + 50 WHERE id IN (SELECT product_id FROM order_items o JOIN products p ON o.product_id = p.id GROUP BY category HAVING AVG(p.stock) < AVG_STOCK);
```

## Edge Cases

- Empty set: No rows match the condition, no update is made (no error).
- NULL handling: If a column with NULL values is being updated using an expression or subquery that may return NULL, the result will be NULL. Use COALESCE() to handle this case if necessary.
- Duplicates: If multiple rows match the condition, each row will be updated independently. Use transactions and unique indices for consistent results in complex update scenarios.

## Summary

| Aspect     | Key Point                             |
|------------|--------------------------------------|
| Definition | Modifies existing records based on conditions.          |
| Core Syntax | `UPDATE table SET column = value WHERE condition;`      |
| Pitfall   | Forgetting the WHERE clause may result in unintended updates.     |
| Perf tip  | Index relevant columns for faster lookups.                 |

## SQLite vs Generic

| Aspect     | SQLite         | Others          |
|------------|----------------|-----------------|
| Row-level locks | Supported (default) | Not supported (MySQL, PostgreSQL) |