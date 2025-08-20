# Foreign Key Constraints

   - Foreign key constraints are used to link tables together and ensure referential integrity by preventing orphaned data.
   - In SQLite, foreign key constraints can be used locally within a single database file.

   ## Goal of this lesson:
   - Understand the purpose of foreign keys
   - Learn how to define foreign key constraints in SQLite
   - Create and manage relationships between tables using foreign key constraints

   ---

   ## Use the default demo.db

   - The demo.db is a sample database containing four tables: customers, products, orders, and order_items.
   - Customers table: `id`, `name`, `email`, `created_at`
   - Products table: `id`, `name`, `price`, `stock`
   * Orders table: `id`, `customer_id` (foreign key referencing customers), `order_date`
   * Order Items table: `id`, `order_id` (foreign key referencing orders), `product_id` (foreign key referencing products), `quantity`, `price`
   - A customer has many orders, an order has many items, and each item belongs to one product.
   - Visualize the relationships using mermaid.js:
      ```mermaid
      erDiagram
          Customer ||--o{ Order : has_many
          Order ||--o{ OrderItem : has_many
          Product ||--| OrderItem : belongs_to
      ```

   ---

   ## How it works

   - Define a foreign key constraint by specifying the column name and referencing the primary key of another table.
   - Example:
      ```sql
      CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY,
          customer_id INTEGER REFERENCES customers(id)
          order_date DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      ```
   - To insert data into the orders table while maintaining referential integrity, ensure that the provided `customer_id` exists in the customers table.
   - Deleting a customer will result in orphaned orders if no foreign key constraint is defined. To prevent this, use the ON DELETE CASCADE clause to automatically delete the associated orders when deleting a customer.
   - Example:
      ```sql
      ALTER TABLE orders ADD FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;
      ```

   ---

   ## Exercise

   - Create the `orders` and `order_items` tables in demo.db, defining foreign key constraints for both tables.
   - Add a new customer to the customers table with an appropriate ID (e.g., 1).
   - Insert an order into the orders table referencing the newly created customer (customer_id = 1).
   - Insert an order item into the order_items table, referencing the inserted order and a product from the products table.
   - Delete the customer with ID 1 and observe the effect on the orders and order_items tables.

   ---

   ## Summary

   | Topic            | Explanation                                                        |
   |------------------|-------------------------------------------------------------------|
   | Foreign Key      | A constraint that links two tables together to maintain referential integrity.  |
   | Define           | Use the `REFERENCES` keyword followed by the target table's primary key column name. |
   | Cascade Deletion | Use the ON DELETE CASCADE clause to automatically delete associated rows when deleting a referenced row. |

   ---

   ## SQLite vs SQL

   | Feature            | SQLite                     | SQL (MySQL, PostgreSQL)      |
   |--------------------|----------------------------|------------------------------|
   | Supports Foreign Keys | Yes                         | Yes                           |
   | Default Support    | Local                      | Server-level                  |
   | Cascade Deletion    | ON DELETE CASCADE clause  | `ON DELETE CASCADE` or triggers|

   ```