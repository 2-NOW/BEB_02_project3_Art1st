import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Content from './Content/index';
import Profile from './Profile/index';

function index() {
  return (
    <>
      <Grid container>
        <Grid item xl={4}>
          <Profile />
        </Grid>
        <Grid item xl={8}>
          <Box sx={{ m: '6rem 16vw 0 auto' }}>
            <Content />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default index;
