import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

import Tags from '@/container/Discover/List/Tags';
import ItemList from '@/container/Discover/List/ItemList';

import data from '@/data/index';

function index() {
  const testData = [...data];

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

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

      <Tags />

      <ItemList />
    </>
  );
}

export default index;
