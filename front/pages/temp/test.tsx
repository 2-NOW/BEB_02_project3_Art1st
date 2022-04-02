import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

import Link from 'next/link';

export default function App() {
  const { data } = useQuery('user', () => axios.get('/api/test'));
  console.log(data);
  const mutation = useMutation((newTodo) => {
    return axios.post('/api/test', newTodo);
  });

  return (
    <div>
      <div>{data?.data}</div>
      {mutation.isLoading ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry' });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}
