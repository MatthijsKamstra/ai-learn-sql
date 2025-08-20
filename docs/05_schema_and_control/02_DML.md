# DML (Data Manipulation Language)

   - DML is a part of SQL used to manage data in a database, including inserting, updating, querying, and deleting records.

   ## Goal of this lesson:

   - Understand the basic concepts of DML
   - Learn how to manipulate data using SQLite
   - Perform common CRUD (Create, Read, Update, Delete) operations on a simple database structure

   ---

   ## Use the default demo.db

   - demo.db is a sample SQLite database provided with this tutorial
   - The database consists of four tables: customers, products, orders, and order_items
   - Here's an overview of each table's structure:
     - customers: `id`, `name`, `email`, `created_at`
     - products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` (links to customers), `order_date`
     * order_items: `id`, `order_id` (links to orders),`product_id` (links to products), `quantity`, `price`
   - The relationships between the tables are as follows:
      - A **customer** has many **orders**
      - An **order** has many **items**
      - Each **item** belongs to one **product**
   - Below is a visualization of the database structure using mermaid.js:
     ```mermaid
     erDiagram
        Customer |||--o{ Order : has_many
        Order |||--o{ Order_Item : has_many
        Product |||--o{ Order_Item : belongs_to
     ```

   ---

   ## How it works

   - Here are the steps to perform DML operations using SQLite:
     1. Connect to the database using the `sqlite3` command-line tool or your preferred SQL client
     2. Access a specific table by running the `SELECT * FROM tablename;` command
     3. Insert new records with the `INSERT INTO tablename (column1, column2) VALUES (value1, value2);` statement
     4. Update existing records using the `UPDATE tablename SET column1 = new_value WHERE condition;` command
     5. Delete records with the `DELETE FROM tablename WHERE condition;` statement
   - Below are examples of these operations for each table in our database:

   ---

   ## Exercise

   - **Exercise 1:** Insert a new customer, product, and order
   - **Exercise 2:** Update the email address of an existing customer
   - **Exercise 3:** Delete a specific order along with its items
   - **Exercise 4:** Find all orders placed by a particular customer
   - **Exercise 5:** Calculate the total cost of all orders for a given customer

   ---

   ## Summary

   | Topic          | Description                                     |
   |----------------|-------------------------------------------------|
   | DML            | Data Manipulation Language used to manage data  |
   | SQLite         | A popular, lightweight SQL database             |
   | CRUD           | Create, Read, Update, Delete operations         |

   ---

   ## SQLite vs SQL

   | Feature        | SQLite                    | SQL                     |
   |----------------|---------------------------|-------------------------|
   | Local Use      | Supports local databases  | Requires a server       |
   | Embeddable     | Can be embedded in apps   | Separate from applications |
   | ACID Compliant | Yes                       | Yes                     |
   | Concurrency    | Limited                   | High                    |
   ```