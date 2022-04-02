import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getArtworkById } from '@/api/artwork/get';

export function useTest() {
  const router = useRouter();
  const { id } = router.query;

  const { isError, isLoading } = useQuery(['artwork', id], getArtworkById(id));

  return { isError, isLoading, id };
}
