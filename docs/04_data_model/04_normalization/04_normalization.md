# Normalization

META:

- Difficulty: Intermediate
- Est.Time: 10 min
- Prerequisites: Basic SQL knowledge
- Tags: Database Design, Data Integrity, Redundancy Elimination

## Goal

Avoid data redundancy and improve data consistency through structuring tables.

## Concept

* Normalization is the process of organizing data in a database to minimize redundancy and improve data integrity.
* Think of it as arranging puzzle pieces so each piece fits in one place, reducing unnecessary copies.
* Use normalization when you have repeated groups of data across multiple tables or when updating data in one table affects other unrelated ones.

## Demo Schema (reference only)

customers(id,name,email,created_at)
products(id,name,price,stock)
orders(id,customer_id,order_date)
order_items(id,order_id,product_id,quantity,price)

## Quick Syntax

1. Select data from one table:
```sql
SELECT * FROM customers;
```
2. Inner Join two tables:
```sql
SELECT c.name, o.order_date
FROM customers AS c
INNER JOIN orders AS o ON c.id = o.customer_id;
```

## Learning Steps

1. **Identify Redundancy**: Analyze the demo schema to find redundant data. In this case, customer details are repeated in each order if a customer makes multiple orders.
2. **Create Normalized Tables**: Separate redundant data into separate tables and link them using foreign keys. Here we'll create a `customer_orders` table with `customer_id`, `order_id`, and `quantity`.
3. **Move Redundant Data**: Move repeated customer details to the new table, `customer_orders`, along with order-specific data like quantity.
4. **Remove Repeated Data**: Remove redundant columns from the orders table (i.e., customer_id, email, created_at).
5. **Update Joins**: Modify the existing joins to use the new structure.

## Examples

1. Before Normalization:
```sql
SELECT c.name, o.customer_id, o.order_date, oi.quantity FROM customers AS c
INNER JOIN orders AS o ON c.id = o.customer_id
INNER JOIN order_items AS oi ON o.id = oi.order_id;
```
2. After Normalization:
```sql
SELECT c.name, co.order_id, co.quantity, o.order_date FROM customers AS c
INNER JOIN customer_orders AS co ON c.id = co.customer_id
INNER JOIN orders AS o ON co.order_id = o.id;
```

## Performance Notes

* Use indexes on foreign keys for faster joins.
* Avoid updating multiple rows at once when working with normalized tables to prevent cascading effects.

## Common Mistakes

* Normalizing too much, leading to complex relationships and slow queries.
* Failing to normalize data and allowing redundancy, causing inconsistencies and inefficiencies.

## Exercises

1. Identify the redundant data in the demo schema.
2. Create a normalized `order_products` table that stores each product's details for each order.
3. Move repeated data from orders to the new table, and remove redundant columns from the orders table.
4. Modify joins to use the new structure.
5. Index the foreign keys in the normalized tables.

## Solutions

1. The `orders` table repeats the customer details (id, name, email) for each order a customer makes.
2. Create a `order_products` table with columns: `id`, `order_id`, `product_id`, `quantity`, `price`.
3. Move repeated data from orders to the new table, and remove redundant columns from the orders table.
4. Modify joins to use the new structure.
5. Index foreign keys in the normalized tables:
```sql
CREATE INDEX order_products_order_id ON order_products(order_id);
CREATE INDEX order_products_product_id ON order_products(product_id);
CREATE INDEX customer_orders_customer_id ON customer_orders(customer_id);
```

## Edge Cases

* Empty tables: Handle with NULL or default values.
* Duplicate rows in normalized tables: Use UNIQUE constraints to prevent duplicates.

## Summary

| Aspect | Key Point         |
|--------|-------------------|
| Definition | Reducing data redundancy and improving data consistency |
| Core Syntax | Creating new tables, foreign keys, and modifying joins |
| Pitfall  | Over-normalization causing complex relationships and slow queries |
| Perf tip  | Use indexes on foreign keys for faster joins |

## SQLite vs Generic

| Aspect       | SQLite          | Others         |
|--------------|------------------|---------------|
| Index types  | Only BTREE indexes are supported | Other index types like HASH, R-tree, B+tree may be available in other databases |