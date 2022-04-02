import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  price: number;
}

function Buy({ open, setOpen, price }: ModalProps) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const buyproduct = () => {
    // API 통신) /artwork/putBoughtArtworks
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{
          margin: "auto 0 auto auto",
          position: "relative",
          bottom: "3vh",
        }}
        onClick={handleClickOpen}
      >
        Buy at {price} AST
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Price ${price} AST</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Are you willing to buy this product at the given price?"}
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
