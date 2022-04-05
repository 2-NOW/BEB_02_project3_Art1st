import { HOST_ADDRESS } from '@/utils/constant/index';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface IArtworkSalePut {
  artwork_id: string | string[] | undefined;
  price: number;
  is_selling: boolean;
}

// PUT artwork sell
export const putArtworkSale = ({
  artwork_id,
  price,
}: {
  artwork_id: string | string[] | undefined;
  price: number;
}) => axios.put(HOST_ADDRESS + '/artwork/' + artwork_id + '/sale', { price });

// PUT artwork cancel sell
export const putArtworkCancelSale = ({
  artwork_id,
}: {
  artwork_id: string | string[] | undefined;
}) => axios.put(HOST_ADDRESS + '/artwork/' + artwork_id + '/cancelSale');

// export const putArtworkSale = ({
//   artwork_id,
//   is_selling,
//   price,
// }: {
//   artwork_id: string | string[] | undefined;
// }) => axios.post(HOST_ADDRESS + '/artwork/' + artwork_id + '/cancelSale');

// export const putArtworkSaleCancel = ({
//   artwork_id,
// }: {
//   artwork_id: string | string[] | undefined;
// }) => axios.post(HOST_ADDRESS + '/artwork/' + artwork_id + '/cancelSale');

// /artwork/:artwork_id
// [put]
// body : is_selling, price
