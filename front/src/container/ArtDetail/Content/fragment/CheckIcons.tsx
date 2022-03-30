import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import LocalOfferOutLined from '@mui/icons-material/LocalOfferOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface CheckIconsProps {
  likeCount: number;
  wantCount: number;
}

const iconCss = {
  fontSize: '2.5rem',
};

function CheckIcons({ likeCount, wantCount }: CheckIconsProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '8vh' }}>
      <Box sx={{ mr: '1rem' }}>
        <Tooltip title="Like" placement="top" arrow>
          <Checkbox
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
