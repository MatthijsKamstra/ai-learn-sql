# View in SQL using SQLite

   - A view is a virtual table that does not store data itself, but instead provides a calculated result set based on a SELECT statement. In other words, views allow you to create reusable queries and manipulate them like real tables.

   ## Goal of this lesson:

   - Understand the concept of views in SQLite
   - Create a view
   - Update a view
   - Delete a view
   - Use views to simplify complex queries

   ---

   ## Using the default demo.db

   - The demo.db is an SQLite database that comes pre-populated with tables and data. Here's the structure of our database:

     1. customers: `id`, `name`, `email`, `created_at`
     2. products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` (references customers), `order_date`
     * order_items: `id`, `order_id` (references orders), `product_id` (references products), `quantity`, `price`

   - Relationships:
     - A **customer** has many **orders**
     - An **order** has many **items**
     - Each **item** belongs to one **product**
   - You can visualize the relationships using mermaid.js:

     ```mermaid
     erDiagram
      Customer ||--o{ Order : has-many
      Order ||--o{ Order_Item : has-many
      Product ||--| Order_Item : belongs-to
     ```

   ---

   ## How it works

   - To create a view, you use the `CREATE VIEW` statement followed by the name of your view and the SELECT statement that defines it.
   - Here's an example of creating a simple view that selects all customers:

     ```sql
     CREATE VIEW customer_list AS
     SELECT * FROM customers;
     ```
   - To update a view, you modify the SELECT statement that defines it. For example, if you want to create a new view that only shows active customers (i.e., those with an email), you can update your `customer_list` view as follows:

     ```sql
     CREATE VIEW customer_list AS
     SELECT * FROM customers WHERE email IS NOT NULL;
     ```
   - To delete a view, you use the `DROP VIEW` statement followed by the name of your view. For example:

     ```sql
     DROP VIEW customer_list;
     ```
   - Here are five steps to create a view and manipulate it:
     1. Create a simple view that selects all records from a table.
     2. Modify the view to filter the results based on a condition.
     3. Update the underlying data in the original table and observe how the view reflects the changes.
     4. Delete the view using `DROP VIEW`.
     5. Recreate the view with a different name to demonstrate that you can have multiple views based on the same query.

   ---

   ## Exercise

   1. Create a view that selects all customers and their orders.
   2. Update the view to only show active customers and their orders.
   3. Modify the `orders` table to add a new order for an existing customer, and observe how the view reflects this change.
   4. Delete the view you created in exercise 1.
   5. Recreate the view with a different name that selects all products and their stock levels.

   ---

   ## Summary

   | Topic             | Description                                       |
   |-------------------|---------------------------------------------------|
   | View              | A virtual table based on a SELECT statement      |
   | Create View       | `CREATE VIEW view_name AS SELECT ...`            |
   | Update View       | Modify the SELECT statement                     |
   | Delete View       | `DROP VIEW view_name`                             |
   | Using Views       | Simplify complex queries, reuse common queries  |

   ---

   ## SQLite vs SQL

   | Feature          | SQLite      | SQL (MySQL, PostgreSQL) |
   |------------------|------------|--------------------------|
   | Views            | Supported   | Supported                |
   | Triggers         | Limited    | Full support             |
   | Stored Procedures| Limited    | Full support              |
   ```