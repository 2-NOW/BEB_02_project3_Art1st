import { useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import Loading from '@/components/Loading';
import UserMenu from './UserMenu';
import BuyModal from './Modal/Buy';

import { getUserIslogin } from '@/api/user/get';

interface HeaderProps {
  artworkId: string | string[] | undefined;
  title: string;
  creator_id: number;
  creator: string;
  owner_id: number;
  owner_name: string;
  views: number;
  created: string;
  is_selling: boolean;
  price: number;
  artworkImage: string;
}

function Header({
  artworkId,
  title,
  creator_id,
  creator,
  owner_id,
  owner_name,
  views,
  created,
  is_selling,
  price,
  artworkImage,
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

  const createTime = created?.split(' ')[0];

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
              <UserMenu
                artworkId={artworkId}
                artworkImage={artworkImage}
                isSelling={is_selling}
              />
            ) : (
              <Box>
                {is_selling && (
                  <Button variant="text" onClick={handleBuyClick}>
                    Buy Artwork
                  </Button>
                )}
              </Box>
            )}
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Tooltip title="Created by">
          <Typography
            sx={{ m: '0.1rem 1rem 0.1rem 0.7rem' }}
            variant="body1"
            component="div"
          >
            <Link href={`/user/${creator_id}`}>
              <a>{creator}</a>
            </Link>
          </Typography>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        <Tooltip title="Owned by">
          <Typography
            sx={{ m: '0.1rem 1rem 0.1rem 1rem' }}
            variant="body1"
            component="div"
          >
            <Link href={`/user/${owner_id}`}>
              <a>{owner_name}</a>
            </Link>
          </Typography>
        </Tooltip>

        <Divider orientation="vertical" flexItem />
        <Typography
          sx={{ m: '0.1rem 1rem 0.1rem 1rem' }}
          variant="body1"
          component="div"
        >
          {createTime}
        </Typography>

        <Divider orientation="vertical" flexItem />

        <Typography
          sx={{ m: '0.1rem 1rem 0.1rem 1rem' }}
          variant="body1"
          component="div"
        >
          {views} views
        </Typography>

        {is_selling && (
          <>
            <Divider orientation="vertical" flexItem />

            <Typography
              sx={{ m: '0.1rem 1rem 0.1rem 1rem' }}
              variant="body1"
              component="div"
            >
              {price} AST
            </Typography>
          </>
        )}
      </Box>

      <BuyModal
        artworkId={artworkId}
        isBuyingModalOpen={isBuyingModalOpen}
        setIsBuyingModalOpen={setIsBuyingModalOpen}
        price={price}
      />
    </>
  );
}

export default Header;
