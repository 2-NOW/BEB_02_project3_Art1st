import Link from 'next/link';
import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { Typography } from '@mui/material';

interface NavLinkProps {
  text: string;
}

const linkCss = {
  '&:hover': {
    color: 'rgba(186, 42, 43, 1)',
    transition: 'color 150ms',
  },
  ml: '3rem',
};

function NavLink({ text }: NavLinkProps) {
  const url = '/' + text.toLowerCase();
  const { pathname } = useRouter();

  return (
    <Link href={url}>
      <a>
        <Typography
          sx={{
            ...linkCss,
            color: pathname === url ? 'rgba(186, 42, 43, 1)' : null,
          }}
          variant="h6"
          component="div"
          gutterBottom
        >
          {text}
        </Typography>
      </a>
    </Link>
  );
}

export default NavLink;
