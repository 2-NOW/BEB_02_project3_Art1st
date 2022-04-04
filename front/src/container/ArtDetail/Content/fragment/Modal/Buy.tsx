import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalProps {
  isBuyingModalOpen: boolean;
  setIsBuyingModalOpen: (value: boolean) => void;
  price: number;
}

function Buy({ isBuyingModalOpen, setIsBuyingModalOpen, price }: ModalProps) {
  const handleClose = () => {
    setIsBuyingModalOpen(false);
  };

  const buyproduct = () => {
    // API 통신) /artwork/putBoughtArtworks
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
          <Button onClick={buyproduct} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Buy;
