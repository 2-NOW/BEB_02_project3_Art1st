import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import data from '@/data/index';

interface Setpfpprops {
  artImage: string;
}

function Setpfp({ artImage }: Setpfpprops) {
  const [open, setOpen] = useState(false);
  const profile = data[20]; //API) /user/profile

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Setprofile = () => {
    //API) /user/profile user_pic artImage
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ pt: '0.9rem', pl: '0.5rem' }}>
        <Tooltip title="Set as profile" placement="top" arrow>
          {artImage == profile ? (
            <Button sx={{ p: '0', minWidth: '2rem' }}>
              <CheckCircleIcon sx={{ fontSize: '2rem' }} />
            </Button>
          ) : (
            <Button sx={{ p: '0', minWidth: '2rem' }} onClick={handleClickOpen}>
              <CheckCircleIcon color="disabled" sx={{ fontSize: '2rem' }} />
            </Button>
          )}
        </Tooltip>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            {'Do you want to set this image as your profile?'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Set as profile</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Setpfp;
