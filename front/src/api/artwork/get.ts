import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

// GET artwork info
export const getArtworkById = async (id: number) => {
  const { data } = await axios.get(HOST_ADDRESS + '/artwork/' + id);
  return data;
};

// GET like
export const getArtworkCommentById = async (id: number) => {
  const { data } = await axios.get(HOST_ADDRESS + '/artwork/' + id + '/like');
  return data;
};

// GET want
export const getArtworkWantedById = async (id: number) => {
  const { data } = await axios.get(HOST_ADDRESS + '/artwork/' + id + '/want');
  return data;
};

// GET comment
export const getArtworkCommentsById = async (id: number) => {
  const { data } = await axios.get(
    HOST_ADDRESS + '/artwork/' + id + '/comment'
  );
  return data;
};

// GET hashtag
export const getArtworkHashTagById = async (id: number) => {
  const { data } = await axios.get(
    HOST_ADDRESS + '/artwork/' + id + '/hashtag'
  );
  return data;
};
