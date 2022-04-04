import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface IPutEditUser {
  user_desc?: string;
  user_name?: string;
  user_picture?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
}

export const putEditUser = ({
  user_name,
  user_desc,
  user_picture,
  instagram,
  twitter,
  facebook,
}: IPutEditUser) =>
  axios.put(HOST_ADDRESS + '/user', {
    user_name,
    user_desc,
    user_picture,
    instargram: instagram,
    tweeter: twitter,
    facebook,
  });

export const putUserPfp = ({ user_picture }: { user_picture: string }) =>
  axios.put(HOST_ADDRESS + '/user', { user_picture });

// balance
export const putUserBalancePlus = ({ balance }: { balance: string }) =>
  axios.put(HOST_ADDRESS + '/user/balance', { balance, action: 'buy' });

export const putUserBalanceMinus = ({ balance }: { balance: string }) =>
  axios.put(HOST_ADDRESS + '/user/balance', { balance, action: 'sell' });

/////////////
// user_desc, user_picture, user_name, instargram, tweeter, facebook

// PUT user name
export const putUserName = async (name: string) => {
  const { data } = await axios.put(HOST_ADDRESS + '/user', { name });
  return data;
};

// PUT user profile
export const putUserProfile = async (user_desc?: string, user_pic?: string) => {
  const { data } = await axios.put(HOST_ADDRESS + '/user/profile', {
    user_desc,
    user_pic,
  });
  return data;
};

// PUT user profile website
export const putUserProfileWebsite = async (
  website_id: number,
  user_site: string
) => {
  const { data } = await axios.put(
    HOST_ADDRESS + '/user/website' + website_id,
    { user_site }
  );
  return data;
};
