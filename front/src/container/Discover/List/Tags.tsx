import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import testLabelData from './data';

interface IData {
  id: number;
  hashtag: string;
}

interface TagsProps {
  data: IData[];
  setTagId: (id: number | undefined) => void;
}

function Tags({ data, setTagId }: TagsProps) {
  // 전체 tag id를 0으로 두고 각각의 tagid는 id+1로 설정
  const [clickedTagIndex, setClickedTagIndex] = useState(0);

  const handleTagClick = (index: number) => {
    setClickedTagIndex(index);
    setTagId(index === 0 ? undefined : index - 1);
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
        <Chip
          sx={{ m: '0.2rem' }}
          color="primary"
          onClick={() => handleTagClick(0)}
          label="전체"
          variant={0 === clickedTagIndex ? 'filled' : 'outlined'}
        />

        {data.map((item) => {
          const { id, hashtag } = item;
          return (
            <Chip
              sx={{ m: '0.2rem' }}
              color="primary"
              key={id + 1}
              onClick={() => handleTagClick(id + 1)}
              label={hashtag}
              variant={id + 1 === clickedTagIndex ? 'filled' : 'outlined'}
            />
          );
        })}
      </Box>
    </>
  );
}

export default Tags;
