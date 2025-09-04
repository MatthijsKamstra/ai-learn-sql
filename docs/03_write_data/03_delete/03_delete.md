# DELETE

META:

- Difficulty: Beginner
- Est.Time: 5 min
- Prerequisites: Basic SQL knowledge, SELECT and UPDATE commands
- Tags: Data deletion, SQLite

## Goal

Delete rows from tables.

## Concept

- Deletes specified rows from a table based on a WHERE clause.
- Removes data but not the table structure or constraints.
- Useful for data pruning, error correction, and privacy management.
- When to use:
	1. Data no longer needed or relevant.
	2. Correction of errors or inconsistencies.
	3. Compliance with privacy regulations (e.g., GDPR).
- When not:
	1. Avoid deleting entire tables, use TRUNCATE instead if appropriate.
	2. Backup data before deleting.
	3. Do not delete rows without a WHERE clause to prevent loss of all data.

## Demo Schema (reference only)
customers(id,name,email,created_at)
products(id,name,price,stock)
orders(id,customer_id,order_date)
order_items(id,order_id,product_id,quantity,price)

## Quick Syntax

```sql
DELETE FROM table_name WHERE condition;
```

## Learning Steps

1. **Delete a single row**: Delete an order item with id 3 from the `order_items` table.

    ```sql
    DELETE FROM order_items WHERE id = 3;
    ```

2. **Delete multiple rows**: Delete all orders where customer id is 1 from the `orders` table.

    ```sql
    DELETE FROM orders WHERE customer_id = 1;
    ```

3. **Soft deletion**: Instead of physically removing rows, set a flag (e.g., `is_deleted=1`) to mark them as deleted.

    ```sql
    UPDATE customers SET is_deleted = 1 WHERE id = 1;
    ```

4. **Joining tables for deletion**: Delete all order items where the quantity is zero from both `order_items` and `orders`.

    ```sql
    DELETE oi, o FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE oi.quantity = 0;
    ```

5. **Using a subquery**: Delete customers who have not made any orders.

    ```sql
    DELETE FROM customers WHERE id NOT IN (SELECT customer_id FROM orders);
    ```

## Performance Notes

- Ensure the column(s) in the WHERE clause are indexed to optimize performance.
- Avoid using DELETE when you can achieve the same results with an UPDATE + SELECT statement.

## Common Mistakes

| Mistake | Why   | Fix            |
|---------|-------|----------------|
| Forgetting WHERE clause | Deletes all rows in the table       | Add a WHERE clause to specify conditions |
| Not backing up data     | Data loss can occur                | Backup data before deleting                    |
| Deleting entire tables  | Use TRUNCATE instead if appropriate | Use TRUNCATE when appropriate and backup data |

## Exercises
1. Delete all products where the price is greater than $50.
2. Mark all customers who have not made any orders as inactive (`is_active=0`).
3. Remove all order items with a quantity less than 5.
4. Soft delete all customers whose emails contain `example.com`.
5. Delete all orders that are older than 1 year (assuming `order_date` is a DATETIME type).

## Solutions
1. ```sql
DELETE FROM products WHERE price > 50;
```
2. ```sql
UPDATE customers SET is_active = 0 WHERE NOT EXISTS (SELECT * FROM orders WHERE customers.id = orders.customer_id);
```
3. ```sql
DELETE FROM order_items WHERE quantity < 5;
```
4. ```sql
UPDATE customers SET is_deleted = 1 WHERE email LIKE '%example.com%';
```
5. ```sql
DELETE FROM orders WHERE order_date < DATE('now','-365 days');
```

## Edge Cases

* Empty set: Does not affect the database; no rows are deleted if there are no matching rows.
* NULL values: Deletes only rows where the column value is NOT NULL, unless a COALESCE function is used to handle NULL values.
* Duplicate rows: Deletes all matching rows in the table, regardless of how many exist.

## Summary

| Aspect       | Key Point                                                |
|--------------|--------------------------------------------------------|
| Definition   | Removes specified rows based on a WHERE clause          |
| Core Syntax  | DELETE FROM table_name WHERE condition;                |
| Pitfall      | Deletes all rows if no WHERE clause is provided         |
| Performance  | Index the column(s) in the WHERE clause for better speed|

## SQLite vs Generic

| Aspect        | SQLite   | Others (only if differences matter)       |
|---------------|---------|-------------------------------------------|
| Supported     | Yes     | Yes                                        |
| TRUNCATE      | No      | Yes (supported in other databases like MySQL)|
| Soft deletion | Yes     | Varies depending on the database           |