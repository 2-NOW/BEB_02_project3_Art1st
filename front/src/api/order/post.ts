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

export const postOrderDonation = ({
  to_id,
  amount,
  msg,
}: {
  to_id: string | string[] | undefined;
  amount: number;
  msg: string;
}) =>
  axios.post(HOST_ADDRESS + '/order/donation', {
    to_id,
    amount,
    msg,
  });
