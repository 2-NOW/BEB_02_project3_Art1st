import { useQuery } from 'react-query';

import Layout from '@/components/Layout/index';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Content from './Content/index';
import Profile from './Profile/index';

import data from '@/data/index';

function index() {
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} xl={4}>
          <Profile />
        </Grid>
        <Grid item xs={12} xl={8}>
          <Box sx={{ m: '6rem 16vw 0 auto' }}>
            <Content />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default index;
