import Box from '@mui/material/Box';

<<<<<<< HEAD
import Layout from "@/components/Layout/index";
import ArtContent from "@/container/ArtDetail/Content/index";
import ArtistProfile from "@/container/ArtDetail/UserProfile/index";
=======
import Layout from '@/components/Layout';
import Content from './Content/index';
import Comment from './Comment/index';
import UserProfile from './UserProfile/index';
>>>>>>> 6ec4d6f64b33f88c42a60f7655ff306d48dc88f8

const wrapperCss = {
  display: 'flex',
  flexDirection: 'column',
  m: '6rem 20vw 0 20vw',
};

function index() {
  return (
    <Layout>
<<<<<<< HEAD
      <div css={{ width: "80%", margin: "2rem auto 0 auto" }}>
        <Box sx={{ mb: "4rem" }}>
          <ArtContent />
        </Box>
        <ArtistProfile />
      </div>
=======
      <Box sx={wrapperCss}>
        <Content />
        <Comment />
        <UserProfile />
      </Box>
>>>>>>> 6ec4d6f64b33f88c42a60f7655ff306d48dc88f8
    </Layout>
  );
}

export default index;
