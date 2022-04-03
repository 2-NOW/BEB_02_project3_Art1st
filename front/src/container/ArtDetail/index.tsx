import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';

import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Content from './Content/index';
import Comment from './Comment/index';
import UserProfile from './UserProfile/index';

import { getArtworkById } from '@/api/artwork/get';

import { useTest } from '@/utils/hooks';
import axios from 'axios';

const wrapperCss = {
  display: 'flex',
  flexDirection: 'column',
  m: '6rem 20vw 0 20vw',
};

function index() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: artworkData,
    isError,
    isLoading,
  } = useQuery(['artwork', id], getArtworkById(id));

  if (isLoading) return <Loading />;

  console.log(artworkData);
  return (
    <Layout>
      <Box sx={wrapperCss}>
        <Content data={artworkData} id={id} />
        <Comment id={id} />
        <UserProfile creatorId={artworkData.creator_id} />
      </Box>
    </Layout>
  );
}

export default index;
