import { useQuery } from 'react-query';

import Layout from '@/components/Layout/index';
import Banner from './Banner';
import Creators from './Creators';

import axios from 'axios';

import { getMainData } from '@/api/main/get';

function index() {
  // const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
  //   axios.get('http://localhost:4000/main').then((res) => res.data)
  // );
  // console.log(data);

  axios.get('http://localhost:4000/main');

  const {
    data: testData,
    isError,
    isLoading,
  } = useQuery(['main'], () => axios.get('http://localhost:4000/main'));
  console.log(123);
  // const fetch('http://localhost:4000/main')
  // const { banner: bannerData, creators } = data;testData
  const { banner: bannerData, creators } = testData;

  return (
    <Layout>
      <Banner bannerData={bannerData} />
      <Creators creators={creators} />
    </Layout>
  );
}

export default index;
