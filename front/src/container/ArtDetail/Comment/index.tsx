import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import Card from '@mui/material/Card';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Loading from '@/components/Loading';

import { getArtworkCommentsById } from '@/api/artwork/get';

function index({ id }: { id: string | string[] | undefined }) {
  const {
    data: commentData,
    isError: commentIsError,
    isLoading: commentIsLoading,
  } = useQuery(['comment', id], getArtworkCommentsById(id));

  if (commentIsLoading) return <Loading />;

  return (
    <Card sx={{ mt: '13vh' }} elevation={2}>
      <CommentInput id={id} />
      <CommentList commentData={commentData} />
    </Card>
  );
}

export default index;
