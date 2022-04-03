import { useState, MouseEvent } from 'react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import UserMenu from './UserMenu';

interface UserProps {
  picture?: string;
  name?: string;
}

function User({ picture, name }: UserProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip title="User Menu">
        <IconButton
          sx={{ height: '2.3rem', width: '2.3rem' }}
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar src={picture} />
        </IconButton>
      </Tooltip>

      <Typography sx={{ ml: '1rem', mt: '0.2rem' }} variant="h6">
        Hi, {name}
      </Typography>

      <UserMenu open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
  );
}

export default User;
