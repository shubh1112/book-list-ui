import { gql } from '@apollo/client';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query ($id: ID) {
    book(id: $id) {
      name
      id
      genre
      author {
        name
        id
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export { getAuthorsQuery, getBooksQuery, getBookQuery, addBookMutation };
