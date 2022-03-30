import Box from '@mui/material/Box';

import Layout from '@/components/Layout';
import Content from './Content/index';
import Comment from './Comment/index';
import UserProfile from './UserProfile/index';

const wrapperCss = {
  display: 'flex',
  flexDirection: 'column',
  m: '6rem 20vw 0 20vw',
};

function index() {
  return (
    <Layout>
      <Box sx={wrapperCss}>
        <Content />
        <Comment />
        <UserProfile />
      </Box>
    </Layout>
  );
}

export default index;
