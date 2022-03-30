import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import data from '@/data/index';

interface ProfileProps {
  name: string;
  avatar: string;
  description: string;
}

export default function Profile({ name, avatar, description }: ProfileProps) {
  return (
    <Box sx={{ display: 'flex', mt: '5vh' }}>
      <Avatar
        sx={{ width: '7rem', height: '7rem', mr: '2rem' }}
        src={data[3]}
      />
      <Box>
        <Typography sx={{ m: '0.5rem auto 0.5rem' }} variant="h4">
          Artist
        </Typography>
        <Typography variant="subtitle1">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
          natus nisi quos, dolorum corrupti voluptate! Hic dicta quo nihil
          eligendi?
        </Typography>
      </Box>
    </Box>
  );
}
