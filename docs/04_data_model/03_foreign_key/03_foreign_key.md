# FOREIGN KEY

META:

- Difficulty: Intermediate
- Est.Time: 5 min
- Prerequisites: Basic SQL, understanding of relational databases
- Tags: Relationships, Integrity, References

## Goal

Ensure data integrity by defining relationships between tables.

## Concept

Foreign Key: A column or set of columns that reference the primary key of another table, creating a relationship and enforcing referential integrity. Definition: `FOREIGN KEY (column1, column2...) REFERENCES table_name(primary_key);`. Analogy: It's like a link between related records in two tables. Why: To prevent invalid data by ensuring that the values in foreign keys exist as primary key values in their respective tables. When to use:
- Establish relationships between multiple tables
- Ensure data consistency

When not (bullets + alternatives):
- When it's not necessary to enforce referential integrity (e.g., testing) - Use `NO CHECK` constraint
- SQLite doesn't support foreign key constraints with AUTOINCREMENT columns, but workaround exists: create a unique index on the foreign key column

## Demo Schema (reference only)
customers(id,name,email,created_at)
products(id,name,price,stock,category_id)
orders(id,customer_id,order_date)
order_items(id,order_id,product_id,quantity,price)
categories(id,name)

## Quick Syntax

```sql
-- Step 1: Create a foreign key constraint on order_items table.
ALTER TABLE order_items ADD FOREIGN KEY (product_id) REFERENCES products(id);
```

## Learning Steps

1. **Step 1: Define the Foreign Key** - Add a foreign key to the `order_items` table referencing the `products` table's primary key.
2. **Step 2: Test Data Integrity** - Insert data with valid and invalid foreign keys, observing SQLite's referential integrity enforcement.
3. **Step 3: Update a Primary Key** - Modify a primary key in the referenced table, assessing its impact on related records in the referencing table.
4. **Step 4: Delete a Referenced Record** - Remove a record with a foreign key from the referenced table, examining SQLite's cascading deletion behavior (if ON DELETE CASCADE is set).
5. **Step 5: Create ON UPDATE or ON DELETE Triggers** - Apply actions such as setting defaults or calculating new values when a foreign key is updated or deleted, ensuring data consistency.

## Examples

1. Basic

```sql
-- Step 1: Define the Foreign Key
ALTER TABLE order_items ADD FOREIGN KEY (product_id) REFERENCES products(id);

-- Step 2: Test Data Integrity - Inserting valid data
INSERT INTO order_items(order_id, product_id, quantity) VALUES (1, 1, 5);

-- Step 2: Test Data Integrity - Inserting invalid data (SQLite prevents insertion due to referential integrity)
-- INSERT INTO order_items(order_id, product_id, quantity) VALUES (1, 0, 5);
```

2. Practical

```sql
-- Step 3: Update a Primary Key - Updating the category of product with id=1
UPDATE products SET category_id = 2 WHERE id = 1;

-- Step 4: Delete a Referenced Record - Deleting a product with orders associated (SQLite removes associated records due to ON DELETE CASCADE)
DELETE FROM products WHERE id = 1;
```

3. Join / Aggregation (if relevant)

Not applicable for this tutorial.

4. Edge / Performance variant

Not applicable for this tutorial.

## Performance Notes
- Index the foreign key column(s) for better performance when inserting, updating, or deleting records with a foreign key constraint.
- Use `ON DELETE SET DEFAULT` instead of `ON DELETE CASCADE` if only a default value should be set when referenced records are deleted.

## Common Mistakes
Table: Mistake | Why | Fix (3–5 rows)
|---|---| ---|
| Invalid Data | Trying to insert data with invalid foreign keys | Ensure the inserted data has valid foreign key values. |
| Cascading Deletion Mishaps | Removing referenced records without considering cascading deletion consequences | Use `ON DELETE SET DEFAULT` or `NO ACTION` instead of `ON DELETE CASCADE` when appropriate. |
| Ambiguous References | Having multiple tables with the same name and primary key structure | Rename conflicting table(s) or use fully-qualified table names in foreign key constraints. |

## Exercises
1. Add a foreign key constraint to the `orders` table, referencing the `customers` table's primary key.
2. Insert an order with an invalid customer_id value and observe SQLite's referential integrity enforcement.
3. Update a customer's id and assess its impact on related orders.
4. Remove a customer record with associated orders, examining the cascading deletion behavior (if ON DELETE CASCADE is set).
5. Create an `ON UPDATE` trigger that sets a default value for the product_id column in the order_items table when the corresponding product is deleted from the products table.

## Solutions
1.
```sql
ALTER TABLE orders ADD FOREIGN KEY (customer_id) REFERENCES customers(id);
```
2.
```sql
-- Inserting invalid data (SQLite prevents insertion due to referential integrity)
-- INSERT INTO orders(customer_id, order_date) VALUES (-1, '2023-01-01');
```
3.
```sql
-- Updating a customer's id and assessing its impact on related orders
UPDATE customers SET id = -1 WHERE name = 'John Doe';
-- Update the orders table to reflect the new customer_id value (assuming SQLite automatically updates foreign key values)
UPDATE orders SET customer_id = -1;
```
4.
```sql
-- Removing a customer record with associated orders (SQLite removes associated records due to ON DELETE CASCADE)
DELETE FROM customers WHERE name = 'John Doe';
```
5.
```sql
CREATE TRIGGER update_order_items_on_delete
AFTER DELETE ON products
FOR EACH ROW
BEGIN
  UPDATE order_items SET product_id = 1 WHERE product_id = OLD.id;
END;
```

## Edge Cases
2. If a foreign key column is NULL, SQLite doesn't enforce referential integrity because NULL can represent unknown or non-existing data.
3. When deleting multiple rows with cascading delete, order of removal may impact the outcome.
4. In case of duplicate primary keys in the referenced table, SQLite still enforces referential integrity but may raise an error or use the first matching record.

## Summary
Table: Aspect | Key Point (Definition, Core syntax, Pitfall, Perf tip)
|---|---| ---| ---|
| Definition | A foreign key is a column that references the primary key of another table to maintain data integrity. | The core syntax for defining a foreign key is `FOREIGN KEY (column1, column2...) REFERENCES table_name(primary_key);`. Pitfall: SQLite doesn't support foreign key constraints with AUTOINCREMENT columns, but a workaround exists. Performance tip: Index the foreign key column(s) for better performance when inserting, updating, or deleting records with a foreign key constraint. |
| Referential Integrity | SQLite enforces referential integrity by preventing invalid data from being inserted, updating, or deleted that would violate the relationship defined by the foreign key constraint. | If an attempt to violate referential integrity occurs, SQLite raises an error and prevents the operation from being performed. |
| Cascading Deletion | Enabling ON DELETE CASCADE on a foreign key causes associated records in the referencing table to be deleted when the referenced record is removed from the referenced table. | Use ON DELETE SET DEFAULT instead of ON DELETE CASCADE if only a default value should be set when referenced records are deleted. |
| Ambiguous References | Having multiple tables with the same name and primary key structure can lead to ambiguous references when defining foreign keys, which can cause errors during data manipulation. | Rename conflicting table(s) or use fully-qualified table names in foreign key constraints to avoid ambiguity. |

## SQLite vs Generic
Table: Aspect | SQLite | Others (only if differences matter)
|---|---| ---|
| Foreign Key Constraints with AUTOINCREMENT Columns | Not supported, but a workaround exists using unique indices. | Most other RDBMS systems support foreign key constraints with AUTOINCREMENT columns directly. |
| ON UPDATE Triggers and Cascading Updates | Not natively supported, but can be achieved by using INSTEAD OF triggers. | Some RDBMS systems have native support for cascading updates through ON UPDATE triggers. |