import { useQuery, useMutation } from 'react-query';

import Layout from '@/components/Layout/index';
import Banner from './Banner';
import Creators from './Creators';

import { getMainData } from '@/api/main/get';

import { postArtworkComment } from '@/api/artwork/post';

function index() {
  const { data, isError, isLoading } = useQuery(['main'], getMainData());

  const testId = '4';
  const testContent = 'test';
  const testMutation = useMutation(postArtworkComment);

  const handleClick = () => {
    testMutation.mutate({ id: testId, content: testContent });
  };
  if (isLoading) return <div>Loading...</div>;
  // if (!isLoading) console.log(data);

  return (
    <Layout>
      <button onClick={handleClick}>test</button>
      <Banner bannerData={data.banner} />
      <Creators creators={data.creators} />
    </Layout>
  );
}

export default index;
