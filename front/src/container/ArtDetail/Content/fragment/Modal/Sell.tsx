import { useState, ChangeEvent } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { putArtworkSale } from '@/api/artwork/put';
import { successState, errorState } from '@/store/status';

interface SellModalProps {
  artworkId: string | string[] | undefined;
  isSellingModalOpen: boolean;
  setIsSellingModalOpen: (value: boolean) => void;
}

function Sell({
  artworkId,
  isSellingModalOpen,
  setIsSellingModalOpen,
}: SellModalProps) {
  const queryClient = useQueryClient();

  const setSuccessState = useSetRecoilState(successState);
  const setErrorState = useSetRecoilState(errorState);

  const [price, setPrice] = useState(0);
  const { mutate: orderArtworkMutate } = useMutation(putArtworkSale);

  const handleClose = () => setIsSellingModalOpen(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPrice(Number(e.target.value));

  const handleSaleArtwork = () => {
    orderArtworkMutate(
      { artwork_id: artworkId, price },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['artwork', artworkId]);
          queryClient.invalidateQueries(['user', 'collect']);
          queryClient.invalidateQueries(['user', 'islogin']);
          setSuccessState(true);
        },
        onError: () => setErrorState(true),
      }
    );
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
            value={price}
            variant="standard"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaleArtwork} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Sell;
