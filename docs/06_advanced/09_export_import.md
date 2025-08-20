# Exporting and Importing SQLite Databases

   - This chapter covers exporting and importing SQLite databases, allowing you to backup, share, or transfer your data easily.

   ## Goal of this lesson:

   - Understand how to export a SQLite database.
   - Learn how to import an SQLite database into a new one or overwrite an existing one.

   ---

   ## Using the default demo.db

   - We will be working with the demo.db database, which is pre-populated with data for customers, products, orders, and order items.
   - The database structure consists of:
     - customers table with columns `id`, `name`, `email`, `created_at`
     - products table with columns `id`, `name`, `price`, `stock`
     - orders table with columns `id`, `customer_id` (links to the customers table), and `order_date`
     - order_items table with columns `id`, `order_id` (links to the orders table), `product_id` (links to the products table), `quantity`, and `price`
   - A **customer** has many **orders**, an **order** has many **items**, and each **item** belongs to one **product**.
   - Here's a visualization of our database structure using [mermaid.js](https://mermaid-js.github.io/mermaid-live-editor/) (view the live demo below):

      ```mermaid
      erDiagram
          Customer ||--o{ Order : has_many
          Order ||--| OrderItem : has_many
          Product |--| OrderItem : belongs_to
      ```

   ---

   ## How it works

   - Exporting a SQLite database:
     1. Open the terminal or command prompt.
     2. Navigate to the directory containing your SQLite database file (e.g., `demo.db`).
     3. Run the following command to create an SQLite backup of the database as a .sqlite3 file:
        ```
        sqlite3 demo.db .backup path/to/your/backup_file.sqlite3
        ```
   - Importing an SQLite database:
     1. Open the terminal or command prompt and navigate to the directory where you want your new or existing SQLite database file (e.g., `new_demo.db`).
     2. Run the following command to replace the current database with the imported one or create a new database if it doesn't exist:
        ```
        sqlite3 new_demo.db < path/to/your/backup_file.sqlite3
        ```
   - If you want to import the data into an existing database without overwriting its current content, use `.read` instead of `<` :
      ```
      sqlite3 demo.db ".read path/to/your/backup_file.sqlite3"
      ```

   ---

   ## Exercise

   1. Create a backup of the demo.db database as demo_backup.sqlite3.
   2. Delete the original demo.db database file.
   3. Import the demo_backup.sqlite3 into a new SQLite database called fresh_demo.db.
   4. Open the fresh_demo.db database and check that all data has been imported correctly.
   5. Export the fresh_demo.db database as a compressed .zip file called fresh_demo_exported.zip.

   ---

   ## Summary

   | Step                     | Description                       |
   |--------------------------|----------------------------------|
   | Export                   | Create a backup of the SQLite db   |
   | Delete (optional)        | Remove the original database file  |
   | Import                   | Restore the backup to a new or old db|
   | Check data               | Ensure that all data has been imported correctly  |
   | Export (optional)        | Compress the database into a .zip file  |

   ---

   ## SQLite vs SQL

   | Feature                  | SQLite                            | SQL                      |
   |--------------------------|----------------------------------|--------------------------|
   | Backup/Restore           | Built-in with `.backup` and `.read` commands  | External tools or scripts are commonly used |
   | Compression              | Can be exported as a .zip file       | Not natively supported    |

   ```