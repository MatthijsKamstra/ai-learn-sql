# Normalization

   - Normalization is a process used in database design to organize data in a logical and efficient manner, eliminating redundancy and improving data integrity.

   ## Goal of this lesson:

   - Understand the concept of normalization
   - Learn how to normalize a database schema
   - Recognize the benefits of normalization

   ---

   ## Use the default demo.db

   - This tutorial uses SQLite as the database management system, specifically the demo.db sample database.
   - The db structure consists of:
     - customers: `id`, `name`, `email`, `created_at`
     - products: `id`, `name`, `price`, `stock`
     - orders: `id`, `customer_id` (references customers), `order_date`
     - order_items: `id`, `order_id` (references orders), `product_id` (references products), `quantity`, `price`
   - Relationships:
     - A **customer** has many **orders**
     - An **order** has many **items**
     - Each **item** belongs to one **product**
   - Visualization with [mermaid.js](https://mermaid-js.github.io/mermaid-live-editor/)

   ---

   ## How it works

   - Normalization aims to eliminate redundant data and improve data integrity by organizing data into multiple tables, each with a single focus.
   - The process involves moving related data from one table to multiple tables, creating foreign key relationships between the tables.
   - Here are 5 steps to normalize our database schema:
     1. Identify repeating groups within a table (e.g., multiple addresses for a customer).
     2. Create a new table for the repeated data.
     3. Move the repeated data to the new table and create foreign key relationships between the old and new tables.
     4. Remove the repeated data from the original table.
     5. Continue normalizing until the database schema meets the desired level of normalization (usually 3NF).
   - Here's an example using our database:
     ```sql
     -- Before normalization
     INSERT INTO customers (name, email, address1, address2, city, state) VALUES ('John Doe', 'john.doe@example.com', '123 Main St', 'Apt 456', 'Anytown', 'CA');

     -- After normalization
     INSERT INTO customers (name, email, created_at);
     INSERT INTO customer_addresses (customer_id, address1, address2, city, state) VALUES ((SELECT id FROM customers WHERE name = 'John Doe'), '123 Main St', 'Apt 456', 'Anytown', 'CA');
     ```

   ---

   ## Exercise

   - Create a new customer with multiple addresses.
   - Normalize the database schema to separate the customer's addresses into a separate table.
   - Query the normalized data to display the customer's name, email, and all addresses.

   ```sql
   -- Create a new customer with multiple addresses (before normalization)
   INSERT INTO customers (name, email, address1, address2, city, state) VALUES ('Jane Smith', 'jane.smith@example.com', '456 Oak St', 'Apt 789', 'Anytown', 'CA');
   UPDATE customers SET address2 = '10 Main Ave' WHERE name = 'Jane Smith';

   -- Normalize the database schema (insert your code here)

   -- Query the normalized data to display the customer's name, email, and all addresses
   SELECT c.name, c.email, ca.address1, ca.address2 FROM customers AS c
     JOIN customer_addresses AS ca ON c.id = ca.customer_id;
   ```

   - Add more orders and order items to the database and normalize the relationships between tables.
   - Query the normalized data to display a customer's orders and order items.

   ```sql
   -- Insert additional data (insert your code here)

   -- Query the normalized data to display a customer's orders and order items
   SELECT c.name, o.order_date, p.name, oi.quantity FROM customers AS c
     JOIN orders AS o ON c.id = o.customer_id
     JOIN order_items AS oi ON o.id = oi.order_id
     JOIN products AS p ON oi.product_id = p.id;
   ```

   - Normalize the relationships between the orders and order items tables to eliminate redundant data.
   - Query the normalized data to display a customer's orders, order items, and product information.

   ```sql
   -- Insert additional data (insert your code here)

   -- Normalize the relationships between the orders and order_items tables (insert your code here)

   -- Query the normalized data to display a customer's orders, order items, and product information
   SELECT c.name, o.order_date, p.name, oi.quantity FROM customers AS c
     JOIN orders AS o ON c.id = o.customer_id
     JOIN order_items AS oi ON o.id = oi.order_id
     JOIN products AS p ON oi.product_id = p.id;
   ```

   - Normalize the relationships between the customers and order_items tables to eliminate redundant data.
   - Query the normalized data to display a customer's orders, order items, and product information.

   ```sql
   -- Insert additional data (insert your code here)

   -- Normalize the relationships between the customers and order_items tables (insert your code here)

   -- Query the normalized data to display a customer's orders, order items, and product information
   SELECT c.name, o.order_date, p.name, oi.quantity FROM customers AS c
     JOIN orders AS o ON c.id = o.customer_id
     JOIN order_items AS oi ON o.id = oi.order_id
     JOIN products AS p ON oi.product_id = p.id;
   ```

   ---

   ## Summary

   | Step                       | Description                                                |
   |----------------------------|------------------------------------------------------------|
   | Identify repeating groups  | Find repeated data within a table and move it to new tables. |
   | Create new tables          | Create new tables for the repeated data and foreign key relationships. |
   | Move repeated data         | Move the repeated data to the new tables and remove it from the original table. |
   | Remove repeated data        | Remove the repeated data from the original table.            |
   | Continue normalizing       | Repeat the process until the desired level of normalization is achieved. |

   ---

   ## SQLite vs SQL

   | Feature                     | SQLite                           | SQL                |
   |-----------------------------|---------------------------------|---------------------|
   | Support for multiple tables | Yes                              | Yes                |
   | Normalization support       | Yes, but limited syntax          | Yes, more extensive syntax|
   ```