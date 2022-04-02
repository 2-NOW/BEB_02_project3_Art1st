import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

// DELETE like
export const delArtworkLike = async (id: string | string[] | undefined) =>
  axios.delete(HOST_ADDRESS + '/artwork/' + id + '/like', {
    withCredentials: true,
  });

// DELETE want
export const delArtworkWant = async (id: string | string[] | undefined) =>
  axios.delete(HOST_ADDRESS + '/artwork/' + id + '/want', {
    withCredentials: true,
  });
