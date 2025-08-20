# DELETE

   - The `DELETE` statement is used to delete records from a table.
   - This chapter will cover how to use the `DELETE` command on SQLite.

   ## Goal of this lesson:
   - Understand the basics of the `DELETE` command in SQLite.
   - Learn how to delete rows from a single table and multiple tables using joins.
   - Understand cascading deletes.

   ---

   ## Use the default demo.db
   - SQLite is a C-language based software library for providing a lightweight, fast, and reliable relational database management system (RDBMS) for small devices and applications.
   - The demo.db consists of four tables: customers, products, orders, and order_items. Here's the structure of each table:
      - customers: `id`, `name`, `email`, `created_at`
      - products: `id`, `name`, `price`, `stock`
      * orders: `id`, `customer_id` (FK), `order_date`
      * order_items: `id`, `order_id` (FK), `product_id` (FK), `quantity`, `price`
   - A **customer** has many **orders**. An **order** has many **items**. Each **item** belongs to one **product**.
   - Here's a visualization of the relationships:

      ```mermaid
      graph LR
        customer -->|has many| order
        order -->|has many| order_item
        product --|belongs to| order_item
      ```

   ---

   ## How it works
   - 1. Identify the table you want to delete rows from.
     ```sql
     DELETE FROM table_name;
     ```
   - 2. If you want to delete specific rows, use a `WHERE` clause.
     ```sql
     DELETE FROM table_name WHERE column_name = value;
     ```
   - 3. To delete rows from multiple tables using joins, use the `JOIN` statement with a `WHERE` clause.
     ```sql
     DELETE a
     FROM table1 a
     JOIN table2 b ON a.id = b.foreign_key
     WHERE condition;
     ```
   - 4. To delete all rows and cascade the deletion to related tables, use the `ON DELETE CASCADE` clause in foreign key constraints.
     ```sql
     ALTER TABLE table2 ADD FOREIGN KEY (foreign_key) REFERENCES table1(primary_key) ON DELETE CASCADE;
     ```
   - 5. To delete rows and only cascade the deletion if a certain condition is met, use the `ON UPDATE CASCADE` clause with triggers.
     ```sql
     CREATE TRIGGER trigger_name AFTER DELETE ON table2
     FOR EACH ROW
     BEGIN
       DELETE FROM table1 WHERE id = OLD.foreign_key;
     END;
     ```

   ---

   ## Exercise
   - 1. Delete all rows from the customers table.
     ```sql
     DELETE FROM customers;
     ```
   - 2. Delete a specific customer based on their email address.
     ```sql
     DELETE FROM customers WHERE email = 'example@example.com';
     ```
   - 3. Delete all orders and related order_items for a specific customer using joins.
     ```sql
     DELETE o, i
     FROM orders o
     JOIN order_items i ON o.id = i.order_id
     WHERE o.customer_id = 1;
     ```
   - 4. Set up cascading deletes so that if a customer is deleted, all their related orders and order_items are also deleted.
     ```sql
     ALTER TABLE orders ADD FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;
     ALTER TABLE order_items ADD FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;
     ```
   - 5. Create a trigger that cascades the deletion of customers and their related orders and order_items only if there are no remaining products for the customer.
     ```sql
     CREATE TRIGGER delete_customer AFTER DELETE ON customers
     FOR EACH ROW
     BEGIN
       SELECT COUNT(*) FROM products WHERE id IN (SELECT product_id FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE customer_id = OLD.id));
       IF (COUNT = 0) THEN
         DELETE FROM orders WHERE customer_id = OLD.id;
         DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE customer_id = OLD.id);
       END IF;
     END;
     ```

   ---

   ## Summary

   | Topic              | Description                                                                                        |
   | ------------------ | -------------------------------------------------------------------------------------------------- |
   | `DELETE` command   | Used to delete rows from a table.                                                                   |
   | Single-table deletes | Delete rows from a single table using the `DELETE` statement and optionally a `WHERE` clause.       |
   | Multi-table deletes | Delete rows from multiple tables using joins and a `WHERE` clause.                                  |
   | Cascading deletes   | Automatically delete related rows in other tables when a row is deleted using foreign key constraints or triggers. |

   ---

   ## SQLite vs SQL

   | Features          | SQLite                | SQL (MySQL, PostgreSQL)    |
   | ------------------|-----------------------|----------------------------|
   | Cascading deletes | Supports with FK constraints and triggers. | Supports with FK constraints but requires separate DELETE triggers for each table. |
   ```