# ACID Properties in SQLite

   - The ACID properties (Atomicity, Consistency, Isolation, Durability) are fundamental concepts in database management systems, ensuring data integrity during transactions. In this lesson, we'll focus on how these properties apply to SQLite.

   ## Goal of this lesson:

   - Understand the ACID properties and their importance in SQLite
   - Recognize the implications of each property on database operations
   - Perform transactions using SQLite with a focus on maintaining data integrity

   ---

   ## Using the default demo.db

   - The demo.db SQLite database will be used for this tutorial. It contains tables such as customers, products, orders, and order_items, with defined relationships between them.

   - **customers**: `id`, `name`, `email`, `created_at`
     **products**: `id`, `name`, `price`, `stock`
     **orders**: `id`, `customer_id` → customers, `order_date`
     **order_items**: `id`, `order_id` → orders, `product_id` → products, `quantity`, `price`

   - A **customer** has many **orders**, an **order** has many **items**, and each **item** belongs to one **product**. Mermaid.js visualization will be provided below.

   ---

   ## How it works

   - 1. **Atomicity**: Each operation within a transaction is treated as a single, indivisible unit. If any part of the operation fails, the entire operation is rolled back to maintain data integrity.
     ```sql
     BEGIN TRANSACTION;
     UPDATE customers SET email = 'new_email' WHERE id = 1;
     IF NOT FOUND THEN ROLLBACK;
     COMMIT;
     ```
   - 2. **Consistency**: Transactions should only commit if they maintain the database in a valid state according to defined rules (e.g., ensuring no negative stock levels).
     ```sql
     BEGIN TRANSACTION;
     UPDATE products SET stock = stock - 10 WHERE id = 1;
     IF stock < 0 THEN ROLLBACK;
     COMMIT;
     ```
   - 3. **Isolation**: Concurrent transactions should not interfere with each other, ensuring that the database remains in a consistent state.
     ```sql
     BEGIN TRANSACTION;
     UPDATE products SET price = price * 2 WHERE id = 1;
     COMMIT;

     BEGIN TRANSACTION;
     SELECT * FROM products WHERE id = 1; -- Get current price
     UPDATE orders SET total_price = total_price + old_price WHERE id = 1; -- Use the previous price (before update)
     COMMIT;
     ```
   - 4. **Durability**: Once a transaction is committed, the changes should be permanent and protected against failures (e.g., power outages).

   ---

   ## Exercise

   - 1. Create a new customer with an email that already exists in the database. Demonstrate that the transaction fails due to atomicity.
   - 2. Update the price of a product such that the stock becomes negative after the update. Verify that the transaction is rolled back due to consistency.
   - 3. Execute two concurrent transactions, one updating the price of a product and another retrieving the data from that same product. Demonstrate that the isolation property is maintained.
   - 4. Execute a series of transactions that change the stock levels of multiple products while maintaining consistency between them.
   - 5. Perform a transaction that modifies the total price of an order by updating the individual order items' prices and ensuring durability after committing.

   ---

   ## Summary

   | Topic               | Explanation                                                       |
   |---------------------|-------------------------------------------------------------------|
   | Atomicity          | Each transaction is treated as a single, indivisible unit           |
   | Consistency        | Maintains the database in a valid state according to defined rules |
   | Isolation          | Concurrent transactions do not interfere with each other             |
   | Durability         | Committed changes are permanent and protected against failures      |

   ---

   ## SQLite vs SQL

   | Feature        | SQLite                                  | SQL (e.g., MySQL, PostgreSQL)           |
   |----------------|----------------------------------------|-----------------------------------------|
   | Transaction support | Yes                              | Yes                               |
   | Auto-commit    | On by default                      | Configurable                        |
   | Savepoints     | Not supported                     | Supported                          |
   ```