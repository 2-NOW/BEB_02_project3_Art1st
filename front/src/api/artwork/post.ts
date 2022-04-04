import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';
axios.defaults.withCredentials = true;

// POST like => like + 1
export const postArtworkLike = async (id: string | string[] | undefined) =>
  axios.post(HOST_ADDRESS + '/artwork/' + id + '/like');

// POST want => want + 1
export const postArtworkWant = (id: string | string[] | undefined) =>
  axios.post(HOST_ADDRESS + '/artwork/' + id + '/want');

// POST comment
export const postArtworkComment = ({
  id,
  content,
}: {
  id: string | string[] | undefined;
  content: string;
}) => axios.post(HOST_ADDRESS + '/artwork/' + id + '/comment', { content });

// Upload artwork
export const postArtworkUpload = (formData: FormData) =>
  axios.post(HOST_ADDRESS + '/artwork', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
