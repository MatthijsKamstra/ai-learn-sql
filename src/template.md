```md
# Title of the chapter

- Explain the title of the chapter
- short description of the subject,
- explain with bullits if possible

## Goal of this lesson:

- goal 1
- goal 2
- goal 3
- ... (if needed more)

---

## Use the default demo.db

- explain the use of SQLite database
- what is the db structure
  - customers: `id`, `name`, `email`, `created_at`
  - products: `id`, `name`, `price`, `stock`
  * orders: `id`, `customer_id` → customers, `order_date`
  * order_items: `id`, `order_id` → orders,`product_id` → products, `quantity`, `price`
- Relationships
  - A **customer** has many **orders**
  - An **order** has many **items**
  - Each **item** belongs to one **product**
- Create a visualization with mermaid.js

---

## How it works

- Explain how it works
- if possible use 5 steps to explain the subject
- start with the basic and work your way up
- describe what is happening, what you want to accive
- use code to explain
- use code in code blocks

---

## Exercise

- Create 5 exercise
- use the db structure
- create a Question/user story
- Answer in code
- start with an medium difficult question and build up from there

---

## Summary

- Create a summary
- use a table to create a summary of this chapter

---

## SQLite vs SQL

- use a table to difference between SQLite vs SQL about this subject

---
```
