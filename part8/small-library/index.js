const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { MONGO_URI, TEST_USR_PWD, JWT_SECRET } = require("./utils/config");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

const pubsub = new PubSub();

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error.message));

const typeDefs = gql`
  type Subscription {
    bookAdded: Book!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token

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
    me: (root, args, context) => context.currentUser,
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
      const books = await Book.find({}).populate("author");
      const authors = [];
      for (const book of books) {
        if (authors.length) {
          const authorFound = authors.find(
            (author) => author.name === book.author.name
          );
          if (authorFound) {
            continue
          }
        }
        authors.push(book.author);
      }

      const result = authors.map((author) => {
        const authorBooks = books.filter(
          (book) => book.author._id === author._id
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
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== TEST_USR_PWD) {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = { username: user.username, id: user._id };

      return { value: jwt.sign(userForToken, JWT_SECRET, { expiresIn: "1h" }) };
    },

    addBook: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.find({ name: args.author });
      if (!(author && author.length)) {
        const newAuthor = new Author({ name: args.author });
        try {
          author[0] = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
      }
      const book = new Book({ ...args, author: author[0]._id });
      let newBook;
      try {
        newBook = await (await book.save()).populate("author");
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

      return newBook;
    },

    editAuthor: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let author;
      try {
        author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
      return author;
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
    return { currentUser: null };
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
