import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

// POST like => like + 1
export const postArtworkLike = async (id: number) =>
  axios.post(HOST_ADDRESS + '/artwork/' + id + '/like', null, {
    withCredentials: true,
  });

// POST want => want + 1
export const postArtworkWant = (id: number) =>
  axios.post(HOST_ADDRESS + '/artwork/' + id + '/want', null, {
    withCredentials: true,
  });

// POST comment
export const postArtworkComment = (id: number) =>
  axios.post(HOST_ADDRESS + '/artwork/' + id + '/comment', null, {
    withCredentials: true,
  });

// Upload artwork
export const postArtworkUpload = (formData: FormData) =>
  axios.post(HOST_ADDRESS + '/user/website', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
