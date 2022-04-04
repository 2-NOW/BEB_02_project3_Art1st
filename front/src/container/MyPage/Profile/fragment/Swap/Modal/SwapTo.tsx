import { css } from '@emotion/react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

const swapbox = {
  borderRadius: '20px',
  border: '1px solid rgb(255, 255, 255)',
  backgroundColor: 'rgb(247, 248, 250)',
};

const contentbox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
};

const balancebox = {
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-end',
  alignItems: 'center',
  color: 'rgb(0,0,0)',
  fontSize: '0.75rem',
  padding: '0 1rem 1rem',
  lineHeight: '1rem',
};

const buttoncss = {
  alignItems: 'center',
  backgroundColor: 'rgb(237, 238, 242)',
  boxShadow: 'rgb(0 0 0 / 8%) 0px 6px 10px',
  color: 'rgb(0, 0, 0)',
  borderRadius: '16px',
  outline: 'none',
  border: 'none',
  fontSize: '24px',
  fontWeight: 500,
  height: '2.4rem',
  padding: '0px 8px',
  justifyContent: 'space-between',
  marginLeft: '12px',
  width: '8vw',
};

const imagecss = {
  width: '24px',
  height: '24px',
  background:
    'radial-gradient(white 50%, rgba(255, 255, 255, 0) calc(75% + 1px), rgba(255, 255, 255, 0) 100%)',
  borderRadius: '50%',
};

interface SwapToprops {
  image: string;
  token: string;
  value: number;
}

function SwapTo({ image, token, value }: SwapToprops) {
  return (
    <Box sx={swapbox}>
      <Box sx={contentbox}>
        <Typography
          sx={{ color: 'rgb(0,0,0)', fontWeight: 500, fontSize: '28px' }}
        >
          {value == 0 ? '0.0' : token == 'AST' ? value * 15 : value / 17}
        </Typography>
        <Button id="basic-button" sx={buttoncss}>
          <img src={image} alt="AST logo" css={imagecss} />
          <Typography sx={{ m: '0 0.25rem', fontSize: '18px' }}>
            {token}
          </Typography>
        </Button>
      </Box>
      <Box sx={balancebox}></Box>
    </Box>
  );
}

export default SwapTo;
