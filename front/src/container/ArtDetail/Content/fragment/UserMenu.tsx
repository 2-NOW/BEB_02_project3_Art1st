import { useState, MouseEvent } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SellIcon from '@mui/icons-material/Sell';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';

import SellModal from './Modal/Sell';
import CancelSellModal from './Modal/CancelSell';

interface UserMenuProps {
  isSelling: boolean;
}

export default function LongMenu({ isSelling }: UserMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSellingModalOpen, setIsSellingModalOpen] = useState(false);
  const [isCancelSellingModalOpen, setIsCancelSellingModalOpen] =
    useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSetPfp = () => {
    setAnchorEl(null);
  };

  const handleSelling = () => {
    setIsSellingModalOpen(true);
    setAnchorEl(null);
  };

  const handelCancelSelling = () => {
    setIsCancelSellingModalOpen(true);
    setAnchorEl(null);
  };

  // todo: setPfP
  // todo: Sell
  // todo: CancelSell

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleSetPfp}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          Set Artwork to pfp
        </MenuItem>

        {!isSelling ? (
          <MenuItem onClick={handleSelling}>
            <ListItemIcon>
              <SellIcon />
            </ListItemIcon>
            Selling your Artwork
          </MenuItem>
        ) : (
          <MenuItem onClick={handelCancelSelling}>
            <ListItemIcon>
              <SellIcon />
            </ListItemIcon>
            Cancel to Sell
          </MenuItem>
        )}
      </Menu>

      <SellModal
        isSellingModalOpen={isSellingModalOpen}
        setIsSellingModalOpen={setIsSellingModalOpen}
      />

      <CancelSellModal
        isCancelSellingModalOpen={isCancelSellingModalOpen}
        setIsCancelSellingModalOpen={setIsCancelSellingModalOpen}
      />
    </Box>
  );
}
