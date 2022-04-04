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
  isSellingModalOpen: boolean;
  setIsSellingModalOpen: (value: boolean) => void;
}

function Sell({ isSellingModalOpen, setIsSellingModalOpen }: ModalProps) {
  const [price, setPrice] = useState(0);

  const handleClose = () => {
    setIsSellingModalOpen(false);
  };

  const handleChange = (e: any) => {
    setPrice(e.target.value);
  };

  const sellproduct = () => {
    setIsSellingModalOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={isSellingModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Sell your Artwork</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'Please enter the price you want to sell your artwork for. (AST)'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="number"
            variant="standard"
            onChange={handleChange}
            fullWidth
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
