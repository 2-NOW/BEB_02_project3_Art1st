import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { css } from '@emotion/react';

const wrapper = {
  display: 'flex',
  position: 'relative',
  width: '5rem',
  height: '2rem',
};

function Logo() {
  return (
    <Box sx={wrapper}>
      <Link href="/">
        <a>
          <Image
            src="/logo.png"
            layout="fill"
            objectFit="contain"
            quality={100}
          />
        </a>
      </Link>
    </Box>
  );
}

export default Logo;
