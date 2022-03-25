import Layout from '@/components/Layout/index';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Content from './Content/index';
import Profile from './Profile/index';

function index() {
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} xl={4}>
          <Box
            sx={{
              width: '15rem',
              position: 'sticky',
              top: '10rem',
              m: '0 auto 0 14vw',
            }}
          >
            <Profile />
          </Box>
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
