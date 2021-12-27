const { ApolloServer, gql } = require("apollo-server");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./utils/config");
const Book = require("./models/Book");
const Author = require("./models/Author");

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error.message));

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.find({}).count(),
    authorCount: async () => await Author.find({}).count(),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate("author");
      if (args.author) {
        books = books.filter((book) => book.author.name === args.author);
      }
      if (args.genre) {
        books = books.filter((book) => book.genres.includes(args.genre));
      }
      return books;
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({});
      const result = authors.map((author) => {
        const authorBooks = books.filter(
          (book) => book.author.toString() === author._id.toString()
        );
        const bookCount = authorBooks.length;
        return {
          id: author._id,
          name: author.name,
          born: author.born,
          bookCount,
        };
      });
      return result;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.find({ name: args.author });
      if (!(author && author.length)) {
        const newAuthor = new Author({ name: args.author });
        author[0] = await newAuthor.save();
      }
      const book = new Book({ ...args, author: author[0]._id });
      const newBook = await (await book.save()).populate("author");
      return newBook;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
