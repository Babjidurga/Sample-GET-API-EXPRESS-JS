const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");
// pre initialization of db variable value with null
let db = null;
// Since the operation is asynchronous to make it synchronous we are using async and await.
// To handle to exception we are using the try and catch methods
const intializedbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/books/");
    });
  } catch (e) {
    console.log(`server stopped due to ${e.message}`);
    process.exit(1);
  }
};
intializedbAndServer();
app.get("/books/", async (request, response) => {
  const getBooksQuery = `SELECT * FROM book ORDER BY book_id;`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
