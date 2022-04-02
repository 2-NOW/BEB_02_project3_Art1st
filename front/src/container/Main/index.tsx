import { useQuery } from 'react-query';

import Layout from '@/components/Layout/index';
import Banner from './Banner';
import Creators from './Creators';

import { getMainData } from '@/api/main/get';

function index() {
  const { data, isError, isLoading } = useQuery(['main'], getMainData());
  const { banner: bannerData, creators } = data;

  return (
    <Layout>
      <Banner bannerData={bannerData} />
      <Creators creators={creators} />
    </Layout>
  );
}

export default index;
