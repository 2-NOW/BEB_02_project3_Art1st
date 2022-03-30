import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

// DELETE user logout
export const delUserLogout = async () => {
  const { data } = await axios.delete(HOST_ADDRESS + '/user/logout', {
    withCredentials: true,
  });
  return data;
};

// DELETE user profile website
export const delUserProfileWebsite = async (website_id: number) => {
  const { data } = await axios.delete(
    HOST_ADDRESS + '/user/website' + website_id,
    { withCredentials: true }
  );
  return data;
};
