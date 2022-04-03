import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

interface TagsProps {
  tags: string[];
}

function Tags({ tags }: TagsProps) {
  return (
    <Box sx={{ mt: '15vh' }}>
      {tags?.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          variant="outlined"
          sx={{ m: '0.4rem 0.3rem auto 0', fontSize: '1rem' }}
        />
      ))}
    </Box>
  );
}

export default Tags;
