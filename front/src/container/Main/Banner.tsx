import Link from 'next/link';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';

import data from '@/data/index';

interface IBanner {
  id: number;
  ipfsURI: string;
}

const imageCss = {
  width: '25rem',
  height: '30rem',
  mt: '10rem',
  ml: '14rem',
};

const buttonCss = {
  width: '10rem',
};

function Banner({ bannerData }: { bannerData: IBanner }) {
  const { id, ipfsURI } = bannerData;

  return (
    <Box sx={{ display: 'flex', pb: '5rem' }}>
      <Box sx={{ ml: '20rem' }}>
        <Typography
          sx={{ mt: '13rem' }}
          variant="h2"
          component="div"
          gutterBottom
        >
          Donate for your artist.
        </Typography>
        <Typography
          sx={{ mt: '3rem', ml: '3rem' }}
          variant="h2"
          component="div"
          gutterBottom
        >
          Create your Artwork to NFT
        </Typography>

        <Box sx={{ mt: '11rem', ml: '3.5rem' }}>
          <Link href="/discover">
            <Button sx={buttonCss} variant="contained" size="large">
              Explore
            </Button>
          </Link>

          <Button
            sx={{ ml: '1rem', ...buttonCss }}
            variant="outlined"
            size="large"
          >
            Create
          </Button>
        </Box>
      </Box>

      <Card sx={imageCss} elevation={12}>
        <Link href={`/artwork/${id}`}>
          <CardActionArea sx={{ height: '100%' }}>
            <CardMedia component="img" height="100%" image={ipfsURI} />
          </CardActionArea>
        </Link>
      </Card>
    </Box>
  );
}

export default Banner;
