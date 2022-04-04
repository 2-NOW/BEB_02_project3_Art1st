import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';
axios.defaults.withCredentials = true;

// PUT artwork sell
export const putArtworkSell = async (
  artwork_id: number,
  is_selling?: boolean,
  price?: number
) => {
  const { data } = await axios.put(HOST_ADDRESS + '/artwork/' + artwork_id, {
    is_selling,
    price,
  });
  return data;
};
