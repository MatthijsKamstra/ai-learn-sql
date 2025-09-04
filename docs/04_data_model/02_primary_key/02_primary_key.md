# PRIMARY KEY

META:
- Difficulty: Beginner
- Est.Time: 5 min
- Prerequisites: Basic SQL knowledge
- Tags: Data Integrity, Unique Identifiers

## Goal

Create a unique identifier for each row in a table.

## Concept

A PRIMARY KEY is a column (or set of columns) that uniquely identifies each record in a table. It enforces data integrity by preventing duplicate values and ensuring faster queries with indexes.

- Definition: A column declared as the `PRIMARY KEY` constraint guarantees its unique values within the table.
- Analogy: Imagine a library's book number system that assigns a unique number to each book, making it easily searchable and preventing duplicates.
- Why: To maintain data integrity, optimize queries, and provide a reference for foreign keys.
- When to use: For every table where uniqueness is required, and as the target of FOREIGN KEY constraints.
- When not: Columns with large, constantly changing values like timestamps usually aren't used as primary keys due to performance concerns. Use alternative unique constraints or surrogate keys (autoincrementing integers) instead.

## Demo Schema (reference only)
customers(id,name,email,created_at)
products(id,name,price,stock)
orders(id,customer_id,order_date)
order_items(id,order_id,product_id,quantity,price)

## Quick Syntax

```sql
CREATE TABLE table_name (column_name datatype PRIMARY KEY);
ALTER TABLE table_name ADD COLUMN column_name datatype PRIMARY KEY;
```

## Learning Steps

1. Create a new table with a primary key:

```sql
-- Step 1: Creating a table with primary key
CREATE TABLE my_table (id INTEGER PRIMARY KEY, value TEXT);
```

2. Add a primary key to an existing table:

```sql
-- Step 2: Adding primary key to an existing table
ALTER TABLE my_table ADD COLUMN id INTEGER PRIMARY KEY;
```

3. Check if a column is the primary key:

```sql
-- Step 3: Checking primary key existence
PRAGMA TABLE_INFO(my_table);
```

## Examples

1. Basic

```sql
-- Step 4: Inserting unique values into a table with primary key
INSERT INTO my_table (value) VALUES ('example1');
INSERT INTO my_table (id, value) VALUES (1, 'example2');
```

2. Practical
In the provided demo schema, consider setting `customer_id`, `product_id`, and `order_id` as primary keys in their respective tables.

3. Join / Aggregation (not applicable for this tutorial)

4. Edge / Performance variant
Use auto-incrementing integers as primary keys for optimal performance, especially when dealing with large datasets.

## Performance Notes
- Index the primary key column to optimize query performance.
- Avoid NULL values in primary keys; use surrogate keys instead if necessary.
- Avoid using columns with large or frequently changing values (e.g., timestamps) as primary keys due to potential performance issues.

## Common Mistakes
| Mistake | Why | Fix |
| ---     | --- | --- |
| Duplicate values in the primary key column | Violates the uniqueness constraint | Remove duplicates or correct data entry |
| Using non-unique columns as primary keys | Results in an invalid table structure | Choose unique columns to declare as primary keys |

## Exercises
1. Create a new table named `orders_items` with `id`, `order_id`, `product_id`, and `quantity` as primary key columns.
2. Add a primary key to the `customers` table using the `email` column.
3. Index the primary key in the `products` table for performance improvements.
4. Verify that there are no duplicate values in the primary keys of any tables.
5. Correct an error where a non-unique column is declared as the primary key in the `orders_items` table.

## Solutions
1. ```sql
CREATE TABLE orders_items (id, order_id, product_id, quantity, PRIMARY KEY(id, order_id, product_id));
```
2. ```sql
ALTER TABLE customers ADD COLUMN id INTEGER PRIMARY KEY;
```
3. ```sql
CREATE INDEX idx_products_id ON products (id);
```
4. Verify that the `PRAGMA TABLE_INFO` command returns no duplicate primary key entries in any tables.
5. Correct the error by removing or altering the `orders_items` table definition to use a unique column as the primary key.

## Edge Cases
- Empty set: The PRIMARY KEY constraint allows null values only if explicitly defined using a UNIQUE CONSTRAINT WITH NULLS. However, it's not recommended for the primary key since it loses its uniqueness property.
- Duplicates: Duplicate primary keys are not allowed; SQLite will return an error message when inserting duplicate rows with a primary key constraint.

## Summary
| Aspect | Key Point            |
| ---    | -------------------- |
| Definition | A PRIMARY KEY is a column or set of columns that uniquely identifies each record in a table.      |
| Core syntax   | Declare the PRIMARY KEY constraint using `CREATE TABLE` or `ALTER TABLE ADD COLUMN`.     |
| Pitfall    | Avoid using non-unique or frequently changing columns as primary keys for performance reasons.  |
| Perf tip   | Index the primary key column to optimize query performance.                            |

## SQLite vs Generic
| Aspect | SQLite         | Others        |
| ---    | --------------|---------------|
| Primary Key Support | Yes, natively supported with automatic indexing and unique constraints  | Varies; some DBMSs require explicit declaration of primary key and/or clustered indexes. |