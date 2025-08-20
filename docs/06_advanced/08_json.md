# Working with JSON in SQLite

   - JSON (JavaScript Object Notation) is a popular data interchange format that allows for storing and exchanging data as a human-readable text. In SQLite, you can store JSON values in a column using the BLOB (Binary Large OBject) data type or TEXT data type.

   ## Goal of this lesson:

   - Understand how to store JSON data in SQLite
   - Learn how to extract and manipulate JSON data in SQL queries
   - Know how to use built-in functions for working with JSON in SQLite

   ---

   ## Using the default demo.db

   - The SQLite database we'll be using is named `demo.db`. It includes four tables: `customers`, `products`, `orders`, and `order_items`.
     - customers: `id`, `name`, `email`, `created_at`
     - products: `id`, `name`, `price`, `stock`
     * orders: `id`, `customer_id` (foreign key), `order_date`
     * order_items: `id`, `order_id` (foreign key), `product_id` (foreign key), `quantity`, `price`
   - Relationships:
     - A **customer** has many **orders**
     - An **order** has many **items**
     - Each **item** belongs to one **product**
   - Visualization with mermaid.js (you can view the diagram at [this link](https://mermaid-js.github.io/mermaid-live-editor/)):

      ```
      graph LR
        customer -->|has many| orders
        order -->|has many| items
        item -->|belongs to| product
      ```

   ---

   ## How it works

   - To store JSON data in SQLite, you can use the `json` function to convert a dictionary (Python) or object (JavaScript) into a JSON string.

   1. Store JSON data in a column:
      ```sql
      INSERT INTO products VALUES (?, ?, ?, ?, ?);
      json_data = {'color': 'red', 'size': 'large'};
      cursor.execute("UPDATE products SET options=? WHERE id=?;", (json.dumps(json_data), 1));
      ```
   2. Retrieve JSON data from a column:
      ```sql
      SELECT options FROM products WHERE id = ?;
      ```
   3. Extract values from the retrieved JSON data:
      ```sql
      SELECT json_extract(options, '$.color') AS color FROM products WHERE id = ?;
      ```
   4. Manipulate JSON data in SQL queries:
      ```sql
      SELECT json_array(json_each(options)) AS pairs FROM products WHERE id = ?;
      ```
   5. Use built-in functions for working with JSON in SQLite:
      - `json_extract`: Extracts a value from the JSON data based on its path.
      - `json_array`: Converts a JSON array to an array in SQL.
      - `json_each`: Iterates through each key-value pair in the JSON object and returns them as a table.

   ---

   ## Exercise

   1. Store some sample data for products, customers, orders, and order items in your local demo.db. Make sure to include some JSON data for product options.
      ```sql
      INSERT INTO products VALUES (?, ?, ?, ?, json_encode({'color': 'red', 'size': 'large'}));
      INSERT INTO customers VALUES (?, ?, ?);
      INSERT INTO orders VALUES (?, ?);
      INSERT INTO order_items VALUES (?, ?, ?, ?, ?, ?);
      ```
   2. Retrieve the JSON data for a specific product and extract its color value.
      ```sql
      SELECT json_extract(options, '$.color') AS color FROM products WHERE id = ?;
      ```
   3. Iterate through each key-value pair in the JSON data for all products and display them as a table.
      ```sql
      SELECT json_each(options) AS pairs FROM products;
      ```
   4. Filter the orders by the extracted color value of the corresponding product's options.
      ```sql
      SELECT orders.id, customers.name, products.name, json_extract(products.options, '$.color') as color FROM orders
          JOIN customers ON orders.customer_id = customers.id
          JOIN order_items ON orders.id = order_items.order_id
          JOIN products ON order_items.product_id = products.id
          WHERE json_extract(products.options, '$.color') = ?;
      ```
   5. Calculate the total cost of an order by summing up the prices of its items and rounding it to two decimal places.
      ```sql
      SELECT orders.id, round(sum(order_items.price * order_items.quantity), 2) as total_cost FROM orders
          JOIN order_items ON orders.id = order_items.order_id
          GROUP BY orders.id;
      ```

   ---

   ## Summary

   | Step                                | Description                                             |
   |-------------------------------------|---------------------------------------------------------|
   | Store JSON data in a column         | Use the `json_encode` function to convert Python dicts or JavaScript objects into JSON strings. |
   | Retrieve JSON data from a column    | Execute SELECT statements and access the JSON column.  |
   | Extract values from the retrieved JSON data | Use the `json_extract` function to extract values based on their path.     |
   | Manipulate JSON data in SQL queries | Utilize built-in functions like `json_array`, `json_each`, and `json_extract`.    |

   ---

   ## SQLite vs SQL

   | Feature              | SQLite                        | SQL (MySQL, PostgreSQL)            |
   |----------------------|------------------------------|-----------------------------------|
   | Built-in JSON Support | Yes                           | No                                |
   | JSON Data Type        | BLOB or TEXT                 | json or jsonb                     |
   | Extracting Values    | `json_extract`               | `JSON_EXTRACT`                    |
   | Manipulating JSON    | `json_array`, `json_each`     | `JSON_ARRAYAGG`, `JSON_OBJECTAGG`|
   ```