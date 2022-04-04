import { useQueryClient, useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { postOrderArtwork } from '@/api/order/post';
import { successState, errorState } from '@/store/status';

interface BuyModalProps {
  artworkId: string | string[] | undefined;
  isBuyingModalOpen: boolean;
  setIsBuyingModalOpen: (value: boolean) => void;
  price: number;
}

function Buy({
  artworkId,
  isBuyingModalOpen,
  setIsBuyingModalOpen,
  price,
}: BuyModalProps) {
  const queryClient = useQueryClient();

  const setSuccessState = useSetRecoilState(successState);
  const setErrorState = useSetRecoilState(errorState);

  const { mutate: orderArtworkMutate } = useMutation(postOrderArtwork);

  const handleClose = () => {
    setIsBuyingModalOpen(false);
  };

  const handleBuyArtwork = () => {
    // API 통신) /artwork/putBoughtArtworks
    orderArtworkMutate(
      { artwork_id: artworkId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['artwork', artworkId]);
          queryClient.invalidateQueries(['user', 'islogin']);
          queryClient.invalidateQueries(['user', 'collect']);
          setSuccessState(true);
        },
        onError: () => setErrorState(true),
      }
    );
    setIsBuyingModalOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={isBuyingModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Price : {price} AST</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'Are you sure you want to buy this artwork?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleBuyArtwork} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Buy;
