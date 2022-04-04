import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

axios.defaults.withCredentials = true;

interface postUserInterface {
  user_id: string;
  user_pw: string;
}

// POST user login
export const postUserLogin = ({ user_id, user_pw }: postUserInterface) =>
  axios.post(HOST_ADDRESS + '/user/login', {
    user_id,
    user_pw,
  });

// POST user signup
export const postUserSignup = ({ user_id, user_pw }: postUserInterface) =>
  axios.post(HOST_ADDRESS + '/user/signup', {
    user_id,
    user_pw,
  });

// POST user website
export const postUserProfileWebsite = (user_site: string) =>
  axios.post(HOST_ADDRESS + '/user/website', { user_site });
