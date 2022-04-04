import { useQuery } from 'react-query';

import Header from './fragment/Header';
import ArtImage from './fragment/ArtImage';
import Description from './fragment/Description';
import Tags from './fragment/Tags';
import CheckIcons from './fragment/CheckIcons';

import { getArtworkById } from '@/api/artwork/get';
import testData from '@/data/index';

interface IArtworkData {
  title: string;
  creator_id: number;
  owner_id: number;
  owner_name: string;
  creator_name: string;
  createdAt: string;
  views: number;
  image: string;
  description: string;
  hashtags: string[];
  like_count: number;
  want_count: number;
  is_selling: boolean;
  price: number;
}

// image, description, tags, likecount, wantcount, is_selling, price

function index({
  data,
  id,
}: {
  data: IArtworkData;
  id: string | string[] | undefined;
}) {
  //todo: price, owner ui 추가

  const {
    title,
    creator_id,
    owner_id,
    owner_name,
    creator_name,
    createdAt,
    views,
    image,
    description,
    hashtags,
    like_count,
    want_count,
    is_selling,
    price,
  } = data;

  return (
    <>
      <Header
        artworkId={id}
        title={title}
        creator_id={creator_id}
        creator={creator_name}
        owner_id={owner_id}
        owner_name={owner_name}
        views={views}
        created={createdAt}
        is_selling={is_selling}
        price={price}
        artworkImage={image}
      />
      <ArtImage artImage={image} />
      <Description description={description} />
      <Tags tags={hashtags} />
      <CheckIcons id={id} likeCount={like_count} wantCount={want_count} />
    </>
  );
}

export default index;
