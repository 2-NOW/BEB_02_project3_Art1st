import { useQuery } from 'react-query';
import Box from '@mui/material/Box';

import Logo from './fragment/Logo';
import NavLink from './fragment/NavLink';
import LoginButton from './fragment/LoginButton';
import Search from './fragment/Search';
import User from './fragment/User';

import { getUserIslogin } from '@/api/user/get';

const wrapper = {
  position: 'sticky',
  top: '0',
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(30px)',

  zIndex: '10',

  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
  width: '100vw',
  height: '4.8rem',
};

const leftItemsCss = {
  m: '1.5rem 0 1.2rem 4rem',
  display: 'flex',
  justifyContent: 'space-between',
};

const rightItemsCss = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '1.4rem 6rem auto',
};

function Navbar() {
  const { data, isError, isLoading } = useQuery(
    ['user', 'islogin'],
    getUserIslogin(),
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
    }
  );

  return (
    <Box sx={wrapper}>
      <Box sx={leftItemsCss}>
        <Logo />
        <NavLink menu={['Discover', 'Collaboration']} />
      </Box>
      <Box sx={rightItemsCss}>
        <Search />
        {data ? (
          <User picture={data.picture} name={data.name} />
        ) : (
          <LoginButton />
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
