import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const profileImageCss = {
  position: 'relative',
  width: '100%',
  height: '15rem',
};

interface ProfileProps {
  profileImage: string;
  userName: string;
  description: string;
  websites: string[];
}

function index({
  profileImage,
  userName,
  description,
  websites,
}: ProfileProps) {
  return (
    <>
      <Box sx={profileImageCss}>
        <Image
          src={profileImage}
          quality={100}
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Typography sx={{ ml: '0.5rem', mt: '2rem' }} variant="h5">
        {userName}
      </Typography>

      <Typography sx={{ mt: '1rem' }} variant="subtitle1">
        {description}
      </Typography>

      <Box sx={{ mt: '2rem' }}>
        <IconButton>
          <a
            href={websites[0]}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <InstagramIcon />
          </a>
        </IconButton>

        <IconButton>
          <a
            href={websites[1]}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <TwitterIcon />
          </a>
        </IconButton>

        <IconButton>
          <a
            href={websites[2]}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FacebookIcon />
          </a>
        </IconButton>
      </Box>

      <Button sx={{ mt: '2rem', width: '100%' }} variant="contained">
        Donate
      </Button>
    </>
  );
}

export default index;
