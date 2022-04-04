import { useState } from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

import DonateModal from './DonateModal';

interface ProfileProps {
  userId: string | string[] | undefined;
  profileImage: string;
  userName: string;
  description: string;
  websites: string[];
}

function index({
  userId,
  profileImage,
  userName,
  description,
  websites,
}: ProfileProps) {
  const [open, setOpen] = useState(false);

  const handleDonateModal = () => setOpen(true);

  return (
    <>
      <Card sx={{ height: '15rem' }}>
        <CardMedia component="img" image={profileImage} />
      </Card>

      <Typography sx={{ ml: '0.5rem', mt: '2rem' }} variant="h5">
        {userName}
      </Typography>

      <Typography sx={{ mt: '1rem' }} variant="subtitle1">
        {description}
      </Typography>

      <Box sx={{ mt: '2rem' }}>
        <IconButton disabled={websites[0] ? false : true}>
          <a
            href={websites[0]}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <InstagramIcon />
          </a>
        </IconButton>

        <IconButton disabled={websites[1] ? false : true}>
          <a
            href={websites[1]}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <TwitterIcon />
          </a>
        </IconButton>

        <IconButton disabled={websites[2] ? false : true}>
          <a
            href={websites[2]}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FacebookIcon />
          </a>
        </IconButton>
      </Box>

      <Button
        variant="contained"
        sx={{ mt: '2rem', width: '100%' }}
        onClick={handleDonateModal}
      >
        Donate
      </Button>

      <DonateModal
        open={open}
        setOpen={setOpen}
        userName={userName}
        userId={userId}
      />
    </>
  );
}

export default index;
