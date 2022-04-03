import Link from 'next/link';
import { css } from '@emotion/react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';

interface IBanner {
  id: number;
  ipfsURI: string;
}

const gradientCss = css`
  font-size: 3.75rem;
  background-clip: text;
  text-fill-color: transparent;
  animation: hue 10s infinite linear;

  @keyframes hue {
    from {
      -webkit-filter: hue-rotate(0deg);
    }
    to {
      -webkit-filter: hue-rotate(-360deg);
    }
  }
`;

const donateTextCss = css`
  background-image: linear-gradient(92deg, #676ffd, #0005ff);
`;

const createTextCss = css`
  background-image: linear-gradient(92deg, #ff8f6c, #ff1a1a);
`;

const imageCss = {
  width: '25rem',
  height: '30rem',
  m: '10rem 0 auto auto',
};

const typoCss = {
  width: '40vw',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

function Banner({ bannerData }: { bannerData: IBanner }) {
  const { id, ipfsURI } = bannerData;

  return (
    <Box sx={{ display: 'flex', pb: '5rem', m: '0 16vw 0 16vw' }}>
      <Box>
        <Box sx={{ mt: '20rem' }}>
          <Typography
            sx={{ ...typoCss, mt: '20rem' }}
            variant="h2"
            component="div"
            gutterBottom
          >
            Donate for your&nbsp;
            <span css={[gradientCss, donateTextCss]}>ARTIST</span>
          </Typography>
        </Box>
        <Typography
          sx={{ ...typoCss, mt: '3rem' }}
          variant="h2"
          component="div"
          gutterBottom
        >
          Create <span css={[gradientCss, createTextCss]}>ARTWORK</span> to NFT
        </Typography>
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
