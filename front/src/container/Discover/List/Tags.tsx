import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import testLabelData from './data';

function Tags() {
  const [clickedTagIndex, setClickedTagIndex] = useState(0);

  const handleTagClick = (index: number) => {
    setClickedTagIndex(index);
  };
  const tagCss = {
    width: '70vw',
    m: '2rem auto 0 16vw',
    '& .MuiChip-label': { m: '0.5rem', fontSize: '1rem' },
    '& .MuiChip-sizeMedium': { height: '2.3rem', borderRadius: '2rem' },
  };

  return (
    <>
      <Box sx={tagCss}>
        {testLabelData.map((label, index) => {
          return (
            <Chip
              sx={{ m: '0.2rem' }}
              color="primary"
              key={index}
              onClick={() => handleTagClick(index)}
              label={label}
              variant={index === clickedTagIndex ? 'filled' : 'outlined'}
            />
          );
        })}
      </Box>
    </>
  );
}

export default Tags;
