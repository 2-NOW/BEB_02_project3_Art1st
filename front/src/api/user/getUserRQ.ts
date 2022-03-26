import { useQuery } from 'react-query';
import axios from 'axios';

const getUser = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

// custom hooks example
export default function useGetUser(url: string) {
  return useQuery(['user'], () => getUser(url));
}

// use with custom hooks
import { useGetUser } from '@/api/user/getUserRQ'

export function Home2() {
  const { status, data, error, isFetching } = useGetUser(url)

  return (
    ...
  );
}

// without custom hooks
import { getUser } from './getUserRQ'

export function Home() {
  const { status, data, error, isFetching } = useQuery(['user'], getUser(url))

  return (
    ...
  );
}