import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';

// PUT artwork sell
export const putArtworkSell = async (
  artwork_id: number,
  is_selling?: boolean,
  price?: number
) => {
  const { data } = await axios.put(
    HOST_ADDRESS + '/artwork/' + artwork_id,
    { is_selling, price },
    { withCredentials: true }
  );
  return data;
};
