import { useQueryClient, useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { putArtworkCancelSale } from '@/api/artwork/put';
import { successState, errorState } from '@/store/status';

interface CancleSellModalProps {
  artworkId: string | string[] | undefined;
  isCancelSellingModalOpen: boolean;
  setIsCancelSellingModalOpen: (value: boolean) => void;
}

function CancelSell({
  artworkId,
  isCancelSellingModalOpen,
  setIsCancelSellingModalOpen,
}: CancleSellModalProps) {
  const queryClient = useQueryClient();

  const setSuccessState = useSetRecoilState(successState);
  const setErrorState = useSetRecoilState(errorState);

  const { mutate: putArtworkCancelSaleMutate } =
    useMutation(putArtworkCancelSale);

  const handleClose = () => {
    setIsCancelSellingModalOpen(false);
  };

  const handleCancelSale = () => {
    //API 통신) /artwork/:artwork_id is_selling false
    putArtworkCancelSaleMutate(
      { artwork_id: artworkId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['artwork', artworkId]);
          setSuccessState(true);
        },
        onError: () => setErrorState(true),
      }
    );
    setIsCancelSellingModalOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={isCancelSellingModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to take this item off selling list?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              'As you confirm, this piece can not be purchased until you resell it'
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCancelSale} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CancelSell;
