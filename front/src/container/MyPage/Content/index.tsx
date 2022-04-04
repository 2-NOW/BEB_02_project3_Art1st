import { useState, SyntheticEvent } from 'react';
import { useQuery } from 'react-query';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ItemList from './ItemList';
import TabPanel from './TabPanel';

import { getUserCreate, getUserCollect, getUserFavorite } from '@/api/user/get';
import Loading from '@/components/Loading';

export default function index() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  const {
    data: collectData,
    isLoading: collectIsLoading,
    isError: collectIsError,
  } = useQuery(['user', 'collect'], getUserCollect(), {
    cacheTime: 15 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
  const {
    data: createData,
    isLoading: createIsLoading,
    isError: createIsError,
  } = useQuery(['user', 'create'], getUserCreate(), {
    cacheTime: 15 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
  const {
    data: favoriteData,
    isLoading: favoriteIsLoading,
    isError: favoriteIsError,
  } = useQuery(['user', 'favorite'], getUserFavorite(), {
    cacheTime: 15 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ p: '0 3rem 0 3rem' }}
            label={<Typography variant="h5">Collect</Typography>}
          />

          <Tab
            sx={{ p: '0 3rem 0 3rem' }}
            label={<Typography variant="h5">Create</Typography>}
          />

          <Tab
            sx={{ p: '0 3rem 0 3rem' }}
            label={<Typography variant="h5">Favorite</Typography>}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {collectIsLoading ? <Loading /> : <ItemList data={collectData} />}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {createIsLoading ? <Loading /> : <ItemList data={createData} />}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {favoriteIsLoading ? <Loading /> : <ItemList data={favoriteData} />}
      </TabPanel>
    </Box>
  );
}
