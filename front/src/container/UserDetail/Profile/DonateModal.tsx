import { useState, ChangeEvent } from 'react';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';

import Loading from '@/components/Loading';

import { postOrderDonation } from '@/api/order/post';
import { successState, errorState } from '@/store/status';

const sendCss = {
  position: 'absolute',
  right: '1.5rem',
  bottom: '3rem',
  width: '5rem',
};

interface DonateProps {
  userId: string | string[] | undefined;
  userName: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function Donate({ userId, userName, open, setOpen }: DonateProps) {
  const queryClient = useQueryClient();

  const [price, setPrice] = useState(0);
  const [msg, setMsg] = useState('');

  const setIsSuccess = useSetRecoilState(successState);
  const setIsError = useSetRecoilState(errorState);

  const { mutate: postOrderDonationMutate, isLoading: donationIsLoading } =
    useMutation(postOrderDonation);

  const handleClose = () => {
    setPrice(0);
    setMsg('');
    setOpen(false);
  };

  const handlePrice = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPrice(Number(e.target.value));

  const handleMsg = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setMsg(e.target.value);

  const handleDonateSubmit = () => {
    //API 통신) /order/donation
    if (price && msg) {
      postOrderDonationMutate(
        { to_id: userId, amount: price, msg },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['user', 'islogin']);
            setOpen(false);
            setIsSuccess(true);
          },
          onError: () => {
            setOpen(false);
            setIsError(true);
          },
        }
      );
    }
  };

  if (donationIsLoading) return <Loading />;

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
            disabled={price && msg ? false : true}
          >
            SEND
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Donate;
