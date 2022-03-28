import Layout from '@/components/Layout/index';
import Carousel from './Carousel';
import List from './List/index';

function index() {
  return (
    <Layout>
      <Carousel />
      <List />
    </Layout>
  );
}

export default index;
