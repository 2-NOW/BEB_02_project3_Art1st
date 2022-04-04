import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';
axios.defaults.withCredentials = true;

// PUT artwork sell
export const putArtworkSale = ({
  artwork_id,
  price,
}: {
  artwork_id: string | string[] | undefined;
  price: number;
}) => axios.post(HOST_ADDRESS + '/artwork/' + artwork_id + '/sale', { price });

// PUT artwork cancel sell
export const putArtworkCancelSale = ({
  artwork_id,
}: {
  artwork_id: string | string[] | undefined;
}) => axios.post(HOST_ADDRESS + '/artwork/' + artwork_id + '/cancelSale');
