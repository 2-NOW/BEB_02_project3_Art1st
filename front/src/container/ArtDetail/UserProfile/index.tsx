import { useQuery } from 'react-query';
import Divider from '@mui/material/Divider';

import Profile from './Profile';
import OtherWorks from './OtherWorks';

import { getUserById, getUserCreateById } from '@/api/user/get';

function index({ creatorId }: { creatorId: string | string[] | undefined }) {
  const {
    data: userData,
    isError: userIsError,
    isLoading: userIsLoading,
  } = useQuery(['user', creatorId], getUserById(creatorId));
  const {
    data: createdArtworksData,
    isError: createdArtworksIsError,
    isLoading: createdArtworksIsLoading,
  } = useQuery(
    ['user', creatorId, 'createdArtworks'],
    getUserCreateById(creatorId, 3)
  );
  if (createdArtworksIsLoading) return <div>Loading...</div>;
  if (userIsLoading) return <div>Loading...</div>;

  const { id, picture, description } = userData.user_profile;
  const { name } = userData.user;

  return (
    <>
      <Divider sx={{ mt: '20vh' }} />
      <Profile id={id} name={name} avatar={picture} description={description} />
      <OtherWorks data={createdArtworksData} />
    </>
  );
}

export default index;
