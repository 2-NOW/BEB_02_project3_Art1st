import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

// POST user login
export const postUserLogin = async (userId: string, password: string) => {
  const { data } = await axios.post(HOST_ADDRESS + '/user/login', {
    userId,
    password,
  });
  return data;
};

// POST user signup
export const postUserSignup = async (
  userId: string,
  password: string,
  name: string
) => {
  const { data } = await axios.post(HOST_ADDRESS + '/user/signup', {
    userId,
    password,
    name,
  });
  return data;
};

// POST create new user profile
// 굳이 안해도 될 듯
export const postUserProfileDiscription = async () => {
  const { data } = await axios.post(HOST_ADDRESS + '/user/profile', null, {
    withCredentials: true,
  });
  return data;
};

// POST user website
export const postUserProfileWebsite = async (user_site: string) => {
  const { data } = await axios.post(
    HOST_ADDRESS + '/user/website',
    { user_site },
    { withCredentials: true }
  );
  return data;
};
