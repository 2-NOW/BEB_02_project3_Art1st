import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";

const sendcss = {
  position: "absolute",
  right: "2rem",
  bottom: "2.5rem",
  width: "5rem",
  opacity: "0.5",
  "&:hover": {
    opacity: "1",
  },
};

function Donate() {
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrice = (e: any) => {
    setPrice(e.target.value);
  };

  const handleMsg = (e: any) => {
    setPrice(e.target.value);
  };

  const send = () => {
    //API 통신) /order/donation
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ mt: "2rem", width: "100%" }}
        onClick={handleClickOpen}
      >
        Donate
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          How much are you willing to donate?
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="number"
            variant="standard"
            placeholder="Amount"
            onChange={handlePrice}
            sx={{ width: "50%" }}
          />
          <Typography
            sx={{ position: "relative", left: "7rem", bottom: "2rem" }}
          >
            AST
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={4}
            variant="standard"
            placeholder="Type your comment here..."
            onChange={handleMsg}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={sendcss}
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={send}
          >
            SEND
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Donate;
