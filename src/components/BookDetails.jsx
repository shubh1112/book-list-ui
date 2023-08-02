import { useLazyQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';
import { useEffect } from 'react';

const BookDetails = ({ bookId }) => {
  const [getBook, { loading, error, data }] = useLazyQuery(getBookQuery);

  useEffect(() => {
    if (bookId) {
      getBook({
        variables: {
          id: bookId,
        },
      });
    }
  }, [bookId, getBook]);

  const displayBookDetails = () => {
    if (loading) return 'Loading book details....';
    if (error) return 'Error fetching book details';

    if (data == null) return 'No book selected';
    const { book } = data;

    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All Books by This Author: </p>
        <ul id='other-books'>
          {book.author.books.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  return <div id='book-details'>{displayBookDetails()}</div>;
};

export default BookDetails;
