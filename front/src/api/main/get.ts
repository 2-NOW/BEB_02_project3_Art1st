import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

// GET user info
export const getMainData = () => async () => {
  const { data } = await axios.get(HOST_ADDRESS + '/main');
  // const { data } = await axios.get('http://localhost:4000/main');
  return data;
};
