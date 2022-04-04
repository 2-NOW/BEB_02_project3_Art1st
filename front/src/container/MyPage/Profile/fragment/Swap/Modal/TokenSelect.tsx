import { useState, MouseEvent } from 'react';
import { css } from '@emotion/react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
};

const imagecss = {
  width: '24px',
  height: '24px',
  background:
    'radial-gradient(white 50%, rgba(255, 255, 255, 0) calc(75% + 1px), rgba(255, 255, 255, 0) 100%)',
  borderRadius: '50%',
};

const options = [
  {
    token: 'AST',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/1e/Emojione_1F3A8.svg',
  },
  {
    token: 'KLAY',
    image:
      'https://api.swapscanner.io/api/tokens/0x0000000000000000000000000000000000000000/icon',
  },
];

interface Tokenprops {
  setSelectedIndex: (value: number) => void;
  image: string;
  token: string;
}

export default function Token({ setSelectedIndex, image, token }: Tokenprops) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickListItem}
        sx={buttoncss}
      >
        <img src={image} alt="AST logo" css={imagecss} />
        <Typography sx={{ m: '0 0.25rem', fontSize: '18px' }}>
          {token}
        </Typography>
        <KeyboardArrowDownIcon />
      </Button>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            // selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <img src={option.image} alt="AST logo" css={imagecss} />
            <Typography sx={{ m: '0 0.25rem', fontSize: '18px' }}>
              {option.token}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
