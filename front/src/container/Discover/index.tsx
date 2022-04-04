import { useQuery } from 'react-query';

import Layout from '@/components/Layout/index';
import Carousel from './Carousel';
import List from './List/index';

import { getTopCreators } from '@/api/artwork/get';
import Loading from '@/components/Loading';
function index() {
  const {
    data: topUserData,
    isError,
    isLoading,
  } = useQuery(['user', 'top'], getTopCreators());

  console.log(topUserData);

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Carousel data={topUserData} />
          <List />
        </>
      )}
    </Layout>
  );
}

export default index;
