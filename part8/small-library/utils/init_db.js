const mongoose = require("mongoose");
const Author = require("../models/Author");
const Book = require("../models/Book");
const { MONGO_URI } = require("./config");
const authors = require("../db_init/authors.db.json");
const books = require("../db_init/books.db.json");

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error.message));

const initCollections = async () => {
  await Book.deleteMany({});
  await Author.deleteMany({});
  const recordedAuthors = await Author.insertMany(authors);
  const authoredBooks = books.map((book) => {
    const author = recordedAuthors.find((author) => author.name === book.author);
    return { ...book, author: author._id };
  });
  await Book.insertMany(authoredBooks);
  mongoose.connection.close();
};

initCollections();
