# MongoDB Queries Script

This project demonstrates how to use the **MongoDB Node.js Driver** to interact with a local MongoDB database.  
The script (`queries.js`) connects to a MongoDB instance running on your computer, performs various CRUD operations, and demonstrates advanced queries using aggregation and indexes.

---

## 📌 Prerequisites

- [Node.js](https://nodejs.org/) installed on your system  
- [MongoDB](https://www.mongodb.com/) installed and running locally (default connection string: `mongodb://localhost:27017`)  
- Install the MongoDB driver:
    ```bash
    npm install mongodb
    ```

## 🚀 How to Run the Script

1. Make sure MongoDB is running locally (you can check with `mongod` in your terminal).  
2. Clone this repository or copy the `queries.js` file.  
3. Open a terminal in the project directory.  
4. Run the script:
     ```bash
     node queries.js
     ```

## ⚙️ What the Script Does

The script connects to the database `plp_bookstore` and interacts with the `books` collection.

**Operations Implemented:**

- **🔌 Connection**  
    Connects to local MongoDB using `MongoClient`.

- **📖 Read Queries**  
    - Finds all books in the genre "Fantasy".  
    - Finds books published after 1930.  
    - Finds books written by "Jane Austen".

- **✏️ Update**  
    - Updates the price of "Moby Dick".

- **🗑️ Delete**  
    - Deletes "Animal Farm" by title.

- **🔍 Combined Query**  
    - Finds books that are both `in_stock: true` and published after 2010.

- **📝 Projection**  
    - Returns only `title`, `author`, and `price` fields for all books.

- **📊 Sorting**  
    - Sorts books by price (ascending and descending).

- **📚 Pagination**  
    - Displays 5 books per page using `.skip()` and `.limit()`.

- **🧩 Aggregation Pipelines**  
    - Calculates the average price of books by genre.  
    - Finds the author with the most books.  
    - Groups books by publication decade and counts them.

- **⚡ Indexes**  
    - Creates an index on the `title` field for faster lookups.  
    - Creates a compound index on `author` and `published_year`.  
    - Uses `.explain()` to show query performance details.

## 🔒 Closing Connection

Closes the MongoDB connection after execution to prevent leaks.
