import { useQuery } from 'react-query';

import Layout from '@/components/Layout/index';
import Carousel from './Carousel';
import List from './List/index';

import { getTopCreators } from '@/api/artwork/get';
function index() {
  const {
    data: topUserData,
    isError,
    isLoading,
  } = useQuery(['user', 'top'], getTopCreators());

  if (isLoading) return <div>Loading...</div>;
  return (
    <Layout>
      <Carousel data={topUserData} />
      <List />
    </Layout>
  );
}

export default index;
