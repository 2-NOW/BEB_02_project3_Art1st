import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

export const getTopCreators = () => async () => {
  const { data } = await axios.get(HOST_ADDRESS + '/user/top');
  return data;
};

export const getMostUsedTags = () => async () => {
  const { data } = await axios.get(HOST_ADDRESS + '/artwork/tag/top');
  return data;
};

export const getArtworkList =
  (isSelling: undefined | 1, tagId?: number) => async () => {
    const { data } = await axios.get(HOST_ADDRESS + '/artwork', {
      params: { tag_id: tagId, is_selling: isSelling },
    });
    return data;
  };

// artwork info
export const getArtworkById =
  (id: string | string[] | undefined) => async () => {
    const { data } = await axios.get(HOST_ADDRESS + '/artwork/' + id);
    return data;
  };

// GET comment
export const getArtworkCommentsById =
  (id: string | string[] | undefined) => async () => {
    const { data } = await axios.get(
      HOST_ADDRESS + '/artwork/' + id + '/comment'
    );
    return data;
  };

/////////////////

// GET like
export const getArtworkCommentById =
  (id: string | string[] | undefined) => async () => {
    const { data } = await axios.get(HOST_ADDRESS + '/artwork/' + id + '/like');
    return data;
  };

// GET want
export const getArtworkWantedById =
  (id: string | string[] | undefined) => async () => {
    const { data } = await axios.get(HOST_ADDRESS + '/artwork/' + id + '/want');
    return data;
  };

// GET hashtag
export const getArtworkHashTagById =
  (id: string | string[] | undefined) => async () => {
    const { data } = await axios.get(
      HOST_ADDRESS + '/artwork/' + id + '/hashtag'
    );
    return data;
  };
