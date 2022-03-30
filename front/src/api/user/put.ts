import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

// PUT user name
export const putUserName = async (name: string) => {
  const { data } = await axios.put(
    HOST_ADDRESS + '/user',
    { name },
    { withCredentials: true }
  );
  return data;
};

// PUT user profile
export const putUserProfile = async (user_desc?: string, user_pic?: string) => {
  const { data } = await axios.put(
    HOST_ADDRESS + '/user/profile',
    { user_desc, user_pic },
    { withCredentials: true }
  );
  return data;
};

// PUT user profile website
export const putUserProfileWebsite = async (
  website_id: number,
  user_site: string
) => {
  const { data } = await axios.put(
    HOST_ADDRESS + '/user/website' + website_id,
    { user_site },
    { withCredentials: true }
  );
  return data;
};
