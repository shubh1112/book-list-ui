import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';
import { useState } from 'react';

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selectedBook, setSelectedBook] = useState(null);

  if (loading) return 'Loading books....';
  if (error) return 'Error fetching books';

  const { books } = data;

  return (
    <div>
      <ul id='book-list'>
        {books.map((book) => (
          <li key={book.id} onClick={() => setSelectedBook(book.id)}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
};

export default BookList;
