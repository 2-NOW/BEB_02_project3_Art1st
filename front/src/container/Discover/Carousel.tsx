import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface IData {
  id: number;
  name: string;
  ProfileImg: string;
}

function index({ data }: { data: IData[] }) {
  const initialSettings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 10,
    slidesToScroll: 6,
    centerPadding: '0px',
    arrows: false,
  };

  const arrowCss = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '8.5rem',
  };

  const [isEnd, setIsEnd] = useState(false);
  const slickRef = useRef<Slider>(null);

  const previous = useCallback(() => {
    slickRef?.current?.slickPrev();
    setIsEnd(false);
  }, []);

  const next = useCallback(() => {
    slickRef?.current?.slickNext();
    setIsEnd(true);
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography sx={{ m: '3rem auto 2rem 16vw' }} variant="h3">
        Top Artists
      </Typography>

      <Box sx={{ m: '2rem auto', width: '70vw' }}>
        <Slider ref={slickRef} {...initialSettings}>
          {data.map((user, index) => {
            return (
              <Box key={index}>
                <Avatar
                  sx={{ m: '0 auto', width: '7rem', height: '7rem' }}
                  src={user.ProfileImg}
                />
                <Link href={`/user/${user.id}`}>
                  <a>
                    <Typography
                      sx={{ mt: '0.5rem', textAlign: 'center' }}
                      variant="body1"
                    >
                      {user.name}
                    </Typography>
                  </a>
                </Link>
              </Box>
            );
          })}
        </Slider>
      </Box>

      <Box sx={arrowCss}>
        <IconButton
          sx={{ ml: '12vw' }}
          onClick={previous}
          disabled={isEnd ? false : true}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          sx={{ mr: '12vw' }}
          onClick={next}
          disabled={isEnd ? true : false}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default index;
