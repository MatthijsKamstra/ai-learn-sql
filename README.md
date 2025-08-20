# ai-learn-sql

Use AI (ollama) for the creation of a SQL tutorial

## DP-900

When I was learning for the DP-900 exam, I noticed that my SQL skills were not up to par. I had to learn a lot of things in a short time, so I decided to create this repository to help myself and others learn SQL(ite).

But I also wanted to use AI to help me learn SQL(ite). So I decided to use ollama to create a SQL(ite) tutorial that would help me learn SQL based upon the information used in DP-900.

Note: This absolute not a complete tutorial, but an experiment to create tutorials with LLM.

## Features

- Uses ollama to generate SQL queries and explanations
- Uses SQLite to execute the queries
- Uses docsify to create a documentation website
- Uses Node.js to run the application

## Getting Started

- Docsify v4
- ollama
- https://docsify.js.org/#/
  https://docsify.js.org/#/quickstart?id=manual-initialization

- models:

- https://ollama.com/
- `mistral:7b-instruct-v0.3-q5_K_M`
- `mistral:7b-instruct`

## Installation

- In the root of the project: `npm install`

## Install ollama

```bash
curl -sSfL https://ollama.com/download.sh | sh
```

## Install SQLite

```bash
brew install sqlite
```

op osx moest ik vragen naar `.tables` om een db te genereren..

```bash
sqlite3 mijnDatabase.db
```

antwoord was

```bash
SQLite version 3.43.2 2023-10-10 13:08:14
Enter ".help" for usage hints.
sqlite> .tables
```

## output query to file

```bash
sqlite> .mode csv
sqlite> .output test.csv
sqlite> select * from tbl1;
sqlite> .output stdout
```

// return not .mode list
