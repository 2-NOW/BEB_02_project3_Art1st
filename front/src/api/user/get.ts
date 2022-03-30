import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

// GET user profile
export const getUserProfileById = async (id: number) => {
  const { data } = await axios.get(HOST_ADDRESS + '/user/' + id + '/profile');
  return data;
};

// GET user profile website
export const getUserProfileWebsiteById = async (id: number) => {
  const { data } = await axios.get(HOST_ADDRESS + '/user/' + id + '/profile');
  return data;
};
