# SQL

   - **SQL** stands for Structured Query Language, a standard language used to communicate with and manipulate databases.

   ## Goal of this lesson:

   - Understand the basics of SQL syntax
   - Learn how to create, read, update, and delete data in SQLite database
   - Get familiar with SQLite's default database structure and relationships

   ---

   ## Use the default demo.db

   The `demo.db` is a pre-populated SQLite database used for demonstration purposes. It consists of the following tables:

   - **customers**: `id`, `name`, `email`, `created_at`
   - **products**: `id`, `name`, `price`, `stock`
   * **orders**: `id`, `customer_id` (references customers), `order_date`
   * **order_items**: `id`, `order_id` (references orders), `product_id` (references products), `quantity`, `price`

   - A **customer** has many **orders**
   - An **order** has many **items**
   - Each **item** belongs to one **product**

   ![Database diagram](https://example.com/diagram.png)
   > Note: The above is an example mermaid.js visualization of the database structure, you can create your own using mermaid.js.

   ---

   ## How it works

   - **Step 1:** Establish a connection to the SQLite database
     ```sql
     sqlite3 demo.db
     ```
   - **Step 2:** Run queries to perform CRUD operations (Create, Read, Update, Delete) on the tables
     ```sql
     -- Create a new customer
     INSERT INTO customers VALUES (NULL, 'John Doe', '[john.doe@example.com](mailto:john.doe@example.com)', '2023-03-16');

     -- Read data from the customers table
     SELECT * FROM customers;
     ```
   - **Step 3:** Update existing data in a table
     ```sql
     -- Update a customer's email
     UPDATE customers SET email = 'john.doe@example.com' WHERE name = 'John Doe';
     ```
   - **Step 4:** Delete data from a table
     ```sql
     -- Delete a specific customer
     DELETE FROM customers WHERE name = 'John Doe';
     ```
   - **Step 5:** Commit the changes and close the connection to the database
     ```sql
     .quit
     ```

   ---

   ## Exercise

   1. Create a new customer with the name 'Alice' and email 'alice@example.com'.
      ```sql
      -- Your code here
      ```

   2. Read all customers from the database.
      ```sql
      -- Your code here
      ```

   3. Update Alice's email to 'alice_new@example.com'.
      ```sql
      -- Your code here
      ```

   4. Delete the customer with the name 'Alice_new'.
      ```sql
      -- Your code here
      ```

   5. Create a new product named 'Laptop' priced at 1000 and stocked with 5 units.
      ```sql
      -- Your code here
      ```

   ---

   ## Summary

   | Topic                      | Description                              |
   |----------------------------|------------------------------------------|
   | **SQL**                    | Structured Query Language for databases  |
   | **CRUD Operations**        | Create, Read, Update, Delete data         |
   | **demo.db**                | Pre-populated SQLite database             |
   | **customers**, **products** | Tables in the demo.db                      |
   | **orders**, **order_items** | Relationships between tables              |

   ---

   ## SQLite vs SQL

   | Feature                | SQLite                             | SQL (MySQL, PostgreSQL)           |
   |------------------------|-----------------------------------|----------------------------------|
   | **Local storage**      | Yes                                | Needs a server to store data       |
   | **Default database name**    | demo.db                            | N/A                              |
   | **ACID compliance**   | Yes (ATOMIC, CONSISTENCY, ISOLATION, DURABILITY) | Yes                                |
   | **Support for triggers**| Limited                            | Full support                      |
   ```