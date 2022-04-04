import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const postOrderArtwork = ({
  artwork_id,
}: {
  artwork_id: string | string[] | undefined;
}) =>
  axios.post(HOST_ADDRESS + '/order/purchase', {
    artwork_id,
  });
