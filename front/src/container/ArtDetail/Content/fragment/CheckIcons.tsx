import { useState, ChangeEvent } from 'react';
import { useMutation } from 'react-query';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import LocalOfferOutLined from '@mui/icons-material/LocalOfferOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import { postArtworkLike, postArtworkWant } from '@/api/artwork/post';
import { delArtworkLike, delArtworkWant } from '@/api/artwork/delete';
import { queryClient } from '@/utils/reactQuery/queryClient';

interface CheckIconsProps {
  likeCount: number;
  wantCount: number;
  id: string | string[] | undefined;
}

const iconCss = {
  fontSize: '2.5rem',
};

function CheckIcons({ likeCount, wantCount, id }: CheckIconsProps) {
  const [like, setLike] = useState(false);
  const [want, setWant] = useState(false);

  const addLikeMutation = useMutation(postArtworkLike);
  const addWantMutation = useMutation(postArtworkWant);
  const delLikeMutation = useMutation(delArtworkLike);
  const delWantMutation = useMutation(delArtworkWant);

  const handleLike = (e: ChangeEvent<HTMLInputElement>) => {
    setLike(e.target.checked);
    if (e.target.checked) {
      addLikeMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(['artwork', id]);
          queryClient.invalidateQueries(['user', 'favorite']);
        },
      });
    } else {
      delLikeMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries(['artwork', id]);
          queryClient.invalidateQueries(['user', 'favorite']);
        },
      });
    }
  };
  const handleWant = (e: ChangeEvent<HTMLInputElement>) => {
    setWant(e.target.checked);
    if (e.target.checked) {
      addWantMutation.mutate(id, {
        onSuccess: () => queryClient.invalidateQueries(['artwork', id]),
      });
    } else {
      delWantMutation.mutate(id, {
        onSuccess: () => queryClient.invalidateQueries(['artwork', id]),
      });
    }
  };

  // todo: 좋아요, 원해요 post 보내기
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '8vh' }}>
      <Box sx={{ mr: '1rem' }}>
        <Tooltip title="Like" placement="top" arrow>
          <Checkbox
            checked={like}
            onChange={handleLike}
            icon={<FavoriteBorder sx={iconCss} />}
            checkedIcon={<Favorite sx={iconCss} />}
          />
        </Tooltip>
        <Typography
          sx={{ textAlign: 'center' }}
          variant="body1"
          component="div"
        >
          {likeCount}
        </Typography>
      </Box>

      <Box>
        <Tooltip title="Want to Buy" placement="top" arrow>
          <Checkbox
            checked={want}
            onChange={handleWant}
            icon={<LocalOfferOutLined sx={iconCss} />}
            checkedIcon={<LocalOfferIcon sx={iconCss} />}
          />
        </Tooltip>
        <Typography
          sx={{ textAlign: 'center' }}
          variant="body1"
          component="div"
        >
          {wantCount}
        </Typography>
      </Box>
    </Box>
  );
}

export default CheckIcons;
