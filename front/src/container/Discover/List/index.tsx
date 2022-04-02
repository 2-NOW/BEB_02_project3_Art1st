import { useState } from 'react';
import { useQuery } from 'react-query';

import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

import Tags from '@/container/Discover/List/Tags';
import ItemList from '@/container/Discover/List/ItemList';

import { getMostUsedTags, getArtworkList } from '@/api/artwork/get';

import data from '@/data/index';

function index() {
  //todo: isSelling, tagId에 따라 새로운 요청이 가는지 확인 필요
  const testData = [...data];

  const [checked, setChecked] = useState(false);

  const [isSelling, setIsSelling] = useState<0 | 1>(0);
  const [tagId, setTagId] = useState<undefined | number>(undefined);

  const handleCheckboxChange = () => {
    setIsSelling(checked ? 1 : 0);
    setChecked(!checked);
  };

  const {
    data: topTagData,
    isLoading,
    isError,
  } = useQuery(['tag', 'top'], getMostUsedTags());

  const {
    data: artworkListData,
    isLoading: isLoadingArtworkList,
    isError: isErrorArtworkList,
  } = useQuery(
    ['artwork', 'list', ['tag', tagId], ['isSell', isSelling]],
    getArtworkList(isSelling, tagId)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isLoadingArtworkList) return <div>Loading...</div>;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ m: '6rem auto 0 16vw' }} variant="h3">
          Discover
        </Typography>

        <FormControlLabel
          sx={{ m: '7rem 16vw 0 auto' }}
          value="start"
          control={
            <Checkbox checked={checked} onChange={handleCheckboxChange} />
          }
          label="For Sale"
          labelPlacement="start"
        />
      </Box>

      <Tags data={topTagData} setTagId={setTagId} />

      <ItemList data={artworkListData} />
    </>
  );
}

export default index;
