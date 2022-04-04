import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import Layout from '@/components/Layout/index';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Content from './Content/index';
import Profile from './Profile/index';

import { getUserById } from '@/api/user/get';

const profileCss = {
  width: '15rem',
  position: 'fixed',
  top: '10rem',
  m: '0 auto 0 14vw',
};

function index() {
  //todo: profile에 후원기능 추가예정

  const { id } = useRouter().query;
  const { data, isError, isLoading } = useQuery(['user', id], getUserById(id));

  if (isLoading) return <div>Loading...</div>;

  const { user, user_profile, facebook, instagram, tweeter } = data;
  const user_websites = [instagram, tweeter, facebook];

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} xl={4}>
          <Box sx={profileCss}>
            <Profile
              profileImage={user_profile.picture}
              userName={user.name}
              description={user.description}
              websites={user_websites}
            />
          </Box>
        </Grid>
        <Grid item xs={12} xl={8}>
          <Box sx={{ m: '6rem 16vw 0 auto' }}>
            <Content id={id} />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default index;
