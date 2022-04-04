import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';
axios.defaults.withCredentials = true;

// DELETE user logout
export const deleteUserLogout = () =>
  axios.delete(HOST_ADDRESS + '/user/logout');

// DELETE user profile website
export const delUserProfileWebsite = async (website_id: number) => {
  const { data } = await axios.delete(
    HOST_ADDRESS + '/user/website' + website_id,
    { withCredentials: true }
  );
  return data;
};
