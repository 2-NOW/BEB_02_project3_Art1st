import { useQuery } from 'react-query';

import Layout from '@/components/Layout/index';
import Banner from './Banner';
import Creators from './Creators';

import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { getMainData } from '@/api/main/get';

function index() {
  const { data, isError, isLoading } = useQuery(['main'], getMainData());

  if (isError) return <Error />;

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner bannerData={data.banner} />
          <Creators creators={data.creators} />
        </>
      )}
    </Layout>
  );
}

export default index;
