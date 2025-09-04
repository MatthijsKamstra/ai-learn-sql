# INSERT

META:

- Difficulty: Beginner
- Est.Time: 5 min
- Prerequisites: Basic SQL knowledge, understanding of the demo schema
- Tags: Insert, Data, Table

## Goal

Insert new records into existing tables.

## Concept

The INSERT statement adds new rows to a table. It allows specifying columns and values explicitly or implicitly. When not specified, SQLite automatically assigns the next available unique ID for auto-incrementing columns.

- When to use: To add new data into tables.
- When not: When updating existing records (use UPDATE instead).

## Demo Schema (reference only)
customers(id, name, email, created_at)
products(id, name, price, stock)
orders(id, customer_id, order_date)
order_items(id, order_id, product_id, quantity, price)

## Quick Syntax

1. Explicit INSERT (table):
    ```sql
    INSERT INTO table (column1, column2, ...) VALUES (value1, value2, ...);
    ```

2. Implicit INSERT (table):
    ```sql
    INSERT INTO table VALUES (value1, value2, ...);
    ```
    If the table has auto-incrementing columns, they will be populated automatically.

## Learning Steps

1. Explicit Insert: Add a customer.
    ```sql
    -- Step 1: Insert a new customer with explicit columns
    INSERT INTO customers (name, email) VALUES ('John Doe', 'john@example.com');
    ```

2. Implicit Insert: Add an order for a specific customer.
    ```sql
    -- Step 2: Insert a new order with implicit columns
    INSERT INTO orders (customer_id, order_date) VALUES (1, '2022-12-01');
    ```

3. Implicit Insert with auto-incrementing column: Add an order item for the latest order.
    ```sql
    -- Step 3: Insert a new order item without specifying its ID
    INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (LATEST_ORDER, 1, 5, 9.99);
    ```

4. Mass Insert: Add multiple customers at once.
    ```sql
    -- Step 4: Insert multiple customers using the VALUES keyword
    INSERT INTO customers VALUES ('Jane Smith', 'jane@example.com'), ('Bob Johnson', 'bob@example.com');
    ```

5. Mass Insert with auto-incrementing column: Add multiple order items for a single order.
    ```sql
    -- Step 5: Insert multiple order items without specifying their IDs
    INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (LATEST_ORDER, 2, 3, 14.99), (LATEST_ORDER, 3, 2, 16.50);
    ```

## Performance Notes
- Index the columns used in the WHERE or JOIN clauses to improve performance.
- Avoid INSERTing large amounts of data at once as it may lead to performance issues and excessive memory usage. Instead, use transactions or bulk insert (not supported in SQLite).

## Common Mistakes
| Mistake | Why     | Fix       |
|---------|---------|-----------|
| Forgetting column names | SQLite will not throw an error but the data won't be inserted into the correct columns | Double-check your column names |
| Trying to UPDATE with INSERT | Use UPDATE instead when modifying existing records | Replace INSERT with UPDATE if updating is intended |

## Exercises
1. Add a new customer with ID auto-incrementing.
2. Insert an order for the newly added customer with the current date.
3. Add three order items for this order with their respective products and quantities.
4. Insert five customers at once without specifying IDs.
5. Insert multiple order items for each of the new customers.

## Solutions
1. ```sql
    INSERT INTO customers (name, email) VALUES ('Alice', 'alice@example.com');
    ```
2. ```sql
    INSERT INTO orders (customer_id) VALUES (LATEST_CUSTOMER);
    ```
3. ```sql
    INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (LATEST_ORDER, 1, 2, 9.99), (LATEST_ORDER, 2, 5, 14.99), (LATEST_ORDER, 3, 7, 16.50);
    ```
4. ```sql
    INSERT INTO customers VALUES ('Charlie', 'charlie@example.com'), ('David', 'david@example.com'), ('Eve', 'eve@example.com'), ('Frank', 'frank@example.com'), ('George', 'george@example.com');
    ```
5. ```sql
    INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ((SELECT LATEST_CUSTOMER FROM customers WHERE name = 'Charlie'), 1, 3, 9.99), ... ;
    ```
    Repeat for each new customer.

## Edge Cases
- Empty set: INSERT INTO table () VALUES (); will insert a blank row if the table has no auto-incrementing columns.
- NULL handling: SQLite automatically handles NULL values as you would expect, but be careful with default values and explicit NULLs.
- Duplicates: If primary key or unique constraint exists, duplicate entries will result in an error or update instead of insert depending on the settings.

## Summary
| Aspect | Key Point       |
|--------|----------------|
| Definition | Add new rows to a table using INSERT statement |
| Core syntax | Explicit or implicit column/value pairs |
| Pitfall | Mistaking INSERT for UPDATE |
| Perf tip | Index relevant columns |

## SQLite vs Generic
| Aspect | SQLite   | Others    |
|--------|---------|-----------|
| Bulk Insert | Not supported (performance issues) | Supported by other RDBMSs (e.g., MySQL, PostgreSQL) |