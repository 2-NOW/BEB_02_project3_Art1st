import { useState, SyntheticEvent } from 'react';
import { useQuery } from 'react-query';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ItemList from './ItemList';
import TabPanel from './TabPanel';

import { getUserCreate, getUserCollect, getUserFavorite } from '@/api/user/get';

export default function index() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  const {
    data: collectData,
    isLoading: collectIsLoading,
    isError: collectIsError,
  } = useQuery(['user', 'collect'], getUserCollect());
  const {
    data: createData,
    isLoading: createIsLoading,
    isError: createIsError,
  } = useQuery(['user', 'create'], getUserCreate());
  const {
    data: favoriteData,
    isLoading: favoriteIsLoading,
    isError: favoriteIsError,
  } = useQuery(['user', 'favorite'], getUserFavorite());

  if (collectIsLoading) return <div>Loading...</div>;
  if (createIsLoading) return <div>Loading...</div>;
  if (favoriteIsLoading) return <div>Loading...</div>;
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
        <ItemList data={collectData} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ItemList data={createData} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <ItemList data={favoriteData} />
      </TabPanel>
    </Box>
  );
}
