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
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20rem",
  height: "15rem",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Noncommercial({ open, setOpen }: ModalProps) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const unlist = () => {
    //API 통신) /artwork/:artwork_id is_selling false
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
        Noncommercial
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to take this item off list?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {
              "As you confirm, this piece can not be purchased until you resell it"
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={unlist} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Noncommercial;
