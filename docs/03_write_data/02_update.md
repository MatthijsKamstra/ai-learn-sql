# UPDATE

   - The `UPDATE` statement is used to modify existing rows in a table.
     - Syntax: `UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;`

   ## Goal of this lesson:

   - Understand the basic syntax and usage of the `UPDATE` statement in SQLite
   - Modify existing data based on given conditions
     - Set values for specific columns
     - Update multiple rows at once using wildcards

   ---

   ## Use the default demo.db

   - demo.db is a sample SQLite database used throughout this tutorial series. It contains tables representing customers, products, orders, and order items.
     - customers: `id`, `name`, `email`, `created_at`
     - products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` → customers, `order_date`
     * order_items: `id`, `order_id` → orders,`product_id` → products, `quantity`, `price`
   - Relationships
      - A **customer** has many **orders**
      - An **order** has many **items**
      - Each **item** belongs to one **product**
   - Create a visualization with mermaid.js:
     ```mermaid
     erDiagram
        Customer ||--o{ Order : has_many
        Product ||--|{ Order_Item : has_many
        Order ||--|{ Order_Item : has_many
        ```

   ---

   ## How it works

   - Modify existing data in a table by updating specific columns based on given conditions.
     1. Specify the table you want to update with `UPDATE` keyword.
     2. Define the new values for columns using the `SET` clause.
     3. (Optional) Use the `WHERE` clause to specify which rows should be updated.
     4. End the statement with a semicolon (`;`).
     5. Execute the query in your SQLite application or shell.
     ```sql
     UPDATE customers SET name = 'New Name' WHERE id = 1;
     ```

   ---

   ## Exercise

   1. Update a customer's email if their ID is `2`:
      ```sql
      UPDATE customers SET email = 'newemail@example.com' WHERE id = 2;
      ```
   2. Increase the stock of a specific product by `100` units based on its ID:
      ```sql
      UPDATE products SET stock += 100 WHERE id = 5;
      ```
   3. Update all orders for customer with ID `3` and set their order date to the current date:
      ```sql
      UPDATE orders SET order_date = datetime('now') WHERE customer_id = 3;
      ```
   4. Decrease the quantity of an item in the first order for a specific product by `5` units:
      ```sql
      UPDATE order_items SET quantity -= 5 WHERE order_id IN (SELECT id FROM orders WHERE customer_id = 1) AND product_id = 7;
      ```
   5. Raise the price of a product by `20%` if its ID is `6`:
      ```sql
      UPDATE products SET price *= 1.2 WHERE id = 6;
      ```

   ---

   ## Summary

   | Topic                 | Description                               |
   |-----------------------|-------------------------------------------|
   | Update statement      | Modifies existing data in a table         |
   | Syntax                | `UPDATE table_name SET column1 = value1, ... WHERE condition;`|
   | Wildcards             | Modify multiple rows at once using them    |

   ---

   ## SQLite vs SQL

   | Feature        | SQLite                     | SQL (MySQL, PostgreSQL, etc.)            |
   |----------------|----------------------------|------------------------------------------|
   | Data isolation  | Single file               | Multiple files (database server required) |
   ```