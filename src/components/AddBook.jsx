import { useQuery, useMutation } from '@apollo/client';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';
import { useState } from 'react';

const AddBook = () => {
  const { loading, data } = useQuery(getAuthorsQuery);
  const [mutateFunction] = useMutation(addBookMutation);
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateFunction({
      variables: formData,
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <form id='add-book' onSubmit={handleSubmit}>
      <div className='field'>
        <label>Book Name:</label>
        <input
          type='text'
          onChange={(e) =>
            setFormData((prevState) => {
              return { ...prevState, name: e.target.value };
            })
          }
        />
      </div>

      <div className='field'>
        <label>Genre:</label>
        <input
          type='text'
          onChange={(e) =>
            setFormData((prevState) => {
              return { ...prevState, genre: e.target.value };
            })
          }
        />
      </div>

      <div className='field'>
        <label>Auhor:</label>
        <select
          onChange={(e) =>
            setFormData((prevState) => {
              return { ...prevState, authorId: e.target.value };
            })
          }
        >
          {loading ? (
            <option disabled>Loading Authors...</option>
          ) : (
            <>
              <option>Select Author</option>
              {data?.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
