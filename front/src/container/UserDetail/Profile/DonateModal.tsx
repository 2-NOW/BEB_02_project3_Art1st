import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';

const sendCss = {
  position: 'absolute',
  right: '1.5rem',
  bottom: '3rem',
  width: '5rem',
};

interface DonateProps {
  userName: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function Donate({ userName, open, setOpen }: DonateProps) {
  const [price, setPrice] = useState(0);
  const [msg, setMsg] = useState('');

  const handleClose = () => setOpen(false);

  const handlePrice = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPrice(Number(e.target.value));

  const handleMsg = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setMsg(e.target.value);

  const handleDonateSubmit = () => {
    //API 통신) /order/donation
    if (price && msg) {
      setOpen(false);
    }
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Donate to Artist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="number"
            variant="standard"
            value={price}
            onChange={handlePrice}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">🎨</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">AST</InputAdornment>,
            }}
          />

          <TextField
            sx={{ position: 'relative', mt: '1rem' }}
            fullWidth
            multiline
            minRows={4}
            variant="standard"
            placeholder={`Type your message to ${userName}`}
            value={msg}
            onChange={handleMsg}
          />
        </DialogContent>

        <DialogActions>
          <Button
            sx={sendCss}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleDonateSubmit}
            disabled={price ? false : true}
          >
            SEND
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Donate;
