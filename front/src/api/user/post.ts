import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

interface postUserInterface {
  userId: string;
  password: string;
}

// POST user login
export const postUserLogin = ({ userId, password }: postUserInterface) =>
  axios.post(HOST_ADDRESS + '/user/login', {
    userId,
    password,
  });

// POST user signup
export const postUserSignup = ({ userId, password }: postUserInterface) =>
  axios.post(HOST_ADDRESS + '/user/signup', {
    userId,
    password,
  });

// // POST create new user profile
// // 굳이 안해도 될 듯
// export const postUserProfileDiscription = () =>
//   axios.post(HOST_ADDRESS + '/user/profile', null, {
//     withCredentials: true,
//   });

// POST user website
export const postUserProfileWebsite = (user_site: string) =>
  axios.post(
    HOST_ADDRESS + '/user/website',
    { user_site },
    { withCredentials: true }
  );
