import { useState } from 'react';
import { useQuery } from 'react-query';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import Loading from '@/components/Loading';
import UserMenu from './UserMenu';
import BuyModal from './Modal/Buy';

import { getUserIslogin } from '@/api/user/get';

interface HeaderProps {
  title: string;
  creator_id: number;
  creator: string;
  owner_id: number;
  owner_name: string;
  views: number;
  created: string;
  is_selling: boolean;
  price: number;
  artImage: string;
}

function Header({
  title,
  creator_id,
  creator,
  owner_id,
  owner_name,
  views,
  created,
  is_selling,
  price,
}: HeaderProps) {
  const [isBuyingModalOpen, setIsBuyingModalOpen] = useState(false);

  const handleBuyClick = () => setIsBuyingModalOpen(true);

  const {
    data: loginUserData,
    isError,
    isLoading: loginUserIsLoading,
  } = useQuery(['user', 'islogin'], getUserIslogin(), {
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
  });

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          sx={{ pl: '0.3rem', pb: '0.3rem' }}
          variant="h3"
          component="div"
        >
          {title}
        </Typography>
        {loginUserIsLoading ? (
          <Loading />
        ) : (
          <>
            {owner_id === loginUserData.id ? (
              <Box>
                <Button variant="text" onClick={handleBuyClick}>
                  Buy Artwork
                </Button>
              </Box>
            ) : (
              <UserMenu isSelling={is_selling} />
            )}
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Typography
          sx={{ m: '0.1rem 1rem 0.1rem 0' }}
          variant="body1"
          component="div"
        >
          {creator}
        </Typography>

        <Divider orientation="vertical" flexItem />

        <Typography
          sx={{ m: '0.1rem 1rem 0.1rem 1rem' }}
          variant="body1"
          component="div"
        >
          {created}
        </Typography>

        <Divider orientation="vertical" flexItem />

        <Typography
          sx={{ m: '0.1rem 1rem 0.1rem 1rem' }}
          variant="body1"
          component="div"
        >
          {views} views
        </Typography>
      </Box>

      <BuyModal
        isBuyingModalOpen={isBuyingModalOpen}
        setIsBuyingModalOpen={setIsBuyingModalOpen}
        price={price}
      />
    </>
  );
}

export default Header;
