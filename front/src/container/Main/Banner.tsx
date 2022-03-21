import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import data from '@/data/index';

const imageCss = {
  width: '25rem',
  height: '30rem',
  mt: '10rem',
  ml: '14rem',
};

const buttonCss = {
  width: '10rem',
};

function Banner() {
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
          <Button sx={buttonCss} variant="contained" size="large">
            Explore
          </Button>

          <Button
            sx={{ ml: '1.5rem', ...buttonCss }}
            variant="outlined"
            size="large"
          >
            Create
          </Button>
        </Box>
      </Box>

      <Card sx={imageCss} elevation={12}>
        <CardMedia component="img" height="100%" image={data[0]} />
      </Card>
    </Box>
  );
}

export default Banner;
