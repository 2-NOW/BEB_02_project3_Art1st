import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';
axios.defaults.withCredentials = true;

// user
export const getUser = () => async () => {
  const { data } = await axios.get(HOST_ADDRESS + '/user/');
  return data;
};

// user islogin
export const getUserIslogin = () => async () => {
  const { data } = await axios.get(HOST_ADDRESS + '/user/islogin');
  return data;
};

// user create
export const getUserCreate = () => async () => {
  const { data } = await axios.get(HOST_ADDRESS + '/user/created');
  return data;
};

// user collect
export const getUserCollect = () => async () => {
  const { data } = await axios.get(HOST_ADDRESS + '/user/collected');
  return data;
};

// user favorite
export const getUserFavorite = () => async () => {
  const { data } = await axios.get(HOST_ADDRESS + '/user/favorite');
  return data;
};

// other user info
export const getUserById = (id: undefined | string | string[]) => async () => {
  const { data } = await axios.get(HOST_ADDRESS + '/user/' + id);
  return data;
};

// other user create
export const getUserCreateById =
  (id: undefined | string | string[], limit?: number) => async () => {
    const { data } = await axios.get(
      HOST_ADDRESS + '/user/' + id + '/created',
      { params: { limit } }
    );
    return data;
  };

export const getUserCollectById =
  (id: undefined | string | string[]) => async () => {
    const { data } = await axios.get(
      HOST_ADDRESS + '/user/' + id + '/collected'
    );
    return data;
  };

////////////////

// GET user profile
export const getUserProfileById =
  (id: undefined | string | string[]) => async () => {
    const { data } = await axios.get(HOST_ADDRESS + '/user/' + id + '/profile');
    return data;
  };

// GET user profile website
export const getUserProfileWebsiteById =
  (id: undefined | string | string[]) => async () => {
    const { data } = await axios.get(HOST_ADDRESS + '/user/' + id + '/profile');
    return data;
  };
