import { useState, SyntheticEvent } from 'react';
import { useQuery } from 'react-query';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ItemList from './ItemList';
import TabPanel from './TabPanel';

import { getUserCreateById, getUserCollectById } from '@/api/user/get';

export default function index({ id }: { id: string | string[] | undefined }) {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  const {
    data: collectData,
    isError: collectIsError,
    isLoading: collectIsLoading,
  } = useQuery(['user', 'collect', id], getUserCreateById(id), {
    cacheTime: 15 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });

  const {
    data: createData,
    isError: createIsError,
    isLoading: createIsLoading,
  } = useQuery(['user', 'create', id], getUserCreateById(id), {
    cacheTime: 15 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });

  if (collectIsLoading) return <div>Loading...</div>;
  if (createIsLoading) return <div>Loading...</div>;

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
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ItemList data={collectData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ItemList data={createData} />
      </TabPanel>
    </Box>
  );
}
