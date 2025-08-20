# Data Control Language (DCL)

   - DCL statements are used to control database access and privileges for SQLite. They regulate who can perform actions on the database, such as creating tables or modifying data.

   ## Goal of this lesson:

   - Understand SQLite's DCL statements
   - Learn how to create, modify, and revoke user accounts and their privileges

   ---

   ## Use the default demo.db

   - This tutorial uses a sample SQLite database named `demo.db` for demonstration purposes.
   - The `demo.db` database consists of tables for customers, products, orders, and order items.
     - customers: `id`, `name`, `email`, `created_at`
     - products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` (references customers), `order_date`
     * order_items: `id`, `order_id` (references orders), `product_id` (references products), `quantity`, `price`
   - Relationships
     - A **customer** has many **orders**
     - An **order** has many **items**
     - Each **item** belongs to one **product**

   ![Database schema](https://i.imgur.com/HbZkfXj.png)

   ---

   ## How it works

   - Create a new user with the `sqlite3` command:

      ```
      sqlite3 demo.db ".users ADD USER username PASSWORD password"
      ```

   - Grant privileges to users using the `GRANT` statement:

      ```sql
      GRANT SELECT, INSERT, UPDATE ON customers TO username;
      GRANT SELECT, INSERT, UPDATE ON products TO username;
      ...
      ```

   - Use the `REVOKE` statement to remove privileges:

      ```sql
      REVOKE UPDATE ON orders FROM username;
      ```

   - Lock a table using the `PRAGMA` statement:

      ```sql
      PRAGMA table_info(customers);
      BEGIN IMMEDIATE TRANSACTION;
      PRAGMA table_info(customers) WITH LOCK;
      ```

   ---

   ## Exercise

   1. Create a new user named `dev` with the password `password`.
   2. Grant privileges to the user `dev` to perform all actions on the customers, products, orders, and order_items tables.
   3. Modify the password for the user `dev` to `newpassword`.
   4. Revoke the UPDATE privilege on the orders table for the user `dev`.
   5. Lock the customers table using a transaction and display its information before and after locking it.

   ---

   ## Summary

   | Topic                  | Description                                                                      |
   |------------------------|----------------------------------------------------------------------------------|
   | DCL Statements         | Control database access and privileges for SQLite users                          |
   | CREATE USER            | Create a new user account                                                        |
   | GRANT                  | Assign privileges to users                                                      |
   | REVOKE                 | Remove privileges from users                                                    |
   | PRAGMA                | Lock a table using a transaction                                                |

   ---

   ## SQLite vs SQL (DCL)

   | Feature            | SQLite                                                                          | SQL Server                                                             |
   |--------------------|----------------------------------------------------------------------------------|-------------------------------------------------------------------------|
   | Users              | Supports user-level access control but simpler compared to SQL Server           | Advanced user management with roles, permissions, and login authentication |
   | Privileges         | Less granular compared to SQL Server                                            | More granular permissions with individual object-level privileges       |
   ```