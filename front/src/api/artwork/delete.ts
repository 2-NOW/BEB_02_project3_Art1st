import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

// DELETE want
export const delArtworkWant = async (id: number) => {
  const { data } = await axios.delete(
    HOST_ADDRESS + '/artwork/' + id + '/want',
    { withCredentials: true }
  );
  return data;
};

// DELETE like
export const delArtworkLike = async (id: number) => {
  const { data } = await axios.delete(
    HOST_ADDRESS + '/artwork/' + id + '/like',
    { withCredentials: true }
  );
  return data;
};
