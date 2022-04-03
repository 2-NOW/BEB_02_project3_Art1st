import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function Sell({ open, setOpen }: ModalProps) {
  const [price, setPrice] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    setPrice(e.target.value);
  };

  const sellproduct = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ margin: 'auto 0 auto auto', position: 'relative', bottom: '3vh' }}
        onClick={handleClickOpen}
      >
        Sell NFT
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Enter the price you are willing to sell
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              'As you confirm, this piece will now be for sale at the written price. However listed price cannot be edited once the item is listed. You will need to cancel your listing and relist the item with the update.'
            }
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="number"
            variant="standard"
            onChange={handleChange}
            sx={{ width: '50%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sellproduct} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Sell;
