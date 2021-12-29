import { gql } from "@apollo/client";

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
  }
`;

export const ALL_AUTHORS = gql`
  ${AUTHOR_DETAILS}
  query {
    allAuthors {
      ...AuthorDetails
      bookCount
    }
  }
`;

export const EDIT_BIRTH_YEAR = gql`
  ${AUTHOR_DETAILS}
  mutation editBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
    }
    published
    genres
  }
`;

export const ALL_BOOKS = gql`
  ${BOOK_DETAILS}
  query {
    allBooks {
      ...BookDetails
    }
  }
`;

export const ADD_BOOK = gql`
  ${BOOK_DETAILS}
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }
`;

export const RECOMMENDED_BOOKS = gql`
  ${BOOK_DETAILS}
  query getBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
`;

export const BOOK_ADDED = gql`
  ${BOOK_DETAILS}
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
