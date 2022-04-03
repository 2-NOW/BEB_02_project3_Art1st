import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import data from '@/data/index';
import Link from 'next/link';

interface ProfileProps {
  id: number;
  name: string;
  avatar: string;
  description: string;
}

export default function Profile({
  id,
  name,
  avatar,
  description,
}: ProfileProps) {
  return (
    <Box sx={{ display: 'flex', mt: '5vh' }}>
      <Link href={`/user/${id}`}>
        <a>
          <Avatar
            sx={{ width: '7rem', height: '7rem', mr: '2rem' }}
            src={avatar}
          />
          <Box>
            <Typography sx={{ m: '0.5rem auto 0.5rem' }} variant="h4">
              {name}
            </Typography>
            <Typography variant="subtitle1">{description} </Typography>
          </Box>
        </a>
      </Link>
    </Box>
  );
}
