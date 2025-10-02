const { MongoClient } = require("mongodb");
const uri = 'mongodb://localhost:27017/plp_bookstore';

const client = new MongoClient(uri);
async function main() {
    try{
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db('plp_bookstore');
        const books = db.collection('books');

        //Find all books in a specific genre
        const fantasyBooks = await books.find({ genre: "Fantasy" }).toArray();
        console.log("Fantasy Books:", fantasyBooks);

        //find  books published after a  certain year
        const recentBooks = await books.find({ published_year: { $gt: 1930 } }).toArray();
        console.log("Books published after 1930:", recentBooks);

        //find books by a specific author
        const authorBooks = await books.find({ author: "Jane Austen" }).toArray();
        console.log("Books by Jane Austen:", authorBooks);

        //Update the price of a specific book
        const updatePrice = await books.updateOne(
            {title: "Moby Dick"},
            { $set: { price: 13.5 } }
        );
        console.log("Updated Price Result:", updatePrice);

        //Delete a book by title
        const deleteBook = await books.deleteOne({ title: "Animal Farm" });
        console.log("Deleted Book Result:", deleteBook);

        //Write a query to find books that are both in stock and published after 2010
        const inStockRecentBooks = await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray();
        console.log("In-stock books published after 2010:", inStockRecentBooks);

        //Use projection to return only the title, author, and price fields in your queries
        const projectedBooks = await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray();
        console.log("Projected Books (title, author, price):", projectedBooks);

        //Implement sorting to display books by price (both ascending and descending)
        const sortedBooksAsc = await books.find().sort({ price: 1 }).toArray();
        console.log("Books sorted by price (ascending):", sortedBooksAsc);
        const sortedBooksDesc = await books.find().sort({ price: -1 }).toArray();
        console.log("Books sorted by price (descending):", sortedBooksDesc);

        //Use the `limit` and `skip` methods to implement pagination (5 books per page)
        const page = 1; // Change this to get different pages
        const booksPerPage = 5;
        const paginatedBooks = await books.find()
            .skip((page - 1) * booksPerPage)
            .limit(booksPerPage)
            .toArray();
        console.log(`Books on page ${page}:`, paginatedBooks);

        // Create an aggregation pipeline to calculate the average price of books by genre
        const avgPriceByGenre = await books.aggregate([
            { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
        ]).toArray();
        console.log("Average price of books by genre:", avgPriceByGenre);

        //Create an aggregation pipeline to find the author with the most books in the collection
        const authorWithMostBooks = await books.aggregate([
            { $group: { _id: "$author", bookCount: { $sum: 1 } } },
            { $sort: { bookCount: -1 } },
            { $limit: 1 }
        ]).toArray();
        console.log("Author with the most books:", authorWithMostBooks);

        // Implement a pipeline that groups books by publication decade and counts them
        const booksByDecade = await books.aggregate([
            {
                $group: {_id: { $concat: [ { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } }, "s" ] }, count: { $sum: 1 } }
            },
            { $sort: { _id: 1 } }
        ]).toArray();
        console.log("Books grouped by publication decade:", booksByDecade);

        //Create an index on the `title` field for faster searches
        const titleIndex = await books.createIndex({ title: 1 });
        console.log("Created index on title field:", titleIndex);

        //Create a compound index on `author` and `published_year`
        const authorYearIndex = await books.createIndex({ author: 1, published_year: -1 });
        console.log("Created compound index on author and published_year:", authorYearIndex);

        // Use the `explain()` method to demonstrate the performance improvement with your indexes
        const explainResult = await books.find({ author: "George Orwell" }).explain("executionStats");
        console.log("Explain result for query on author 'George Orwell':", explainResult);


        

    } catch (err) {
        console.error("An error occurred:", err);
    }
    finally {
        await client.close();
        console.log("Connection closed");
    }

    
}

main().catch(console.error);

