import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";

export default function Purchase() {
  const [open, setOpen] = useState(false);
  const id = 2;
  const situations = [
    {
      btn: "Noncommercial",
      title: "Are you sure to take this item off list?",
      content:
        "As you confirm, this piece can not be purchased until you resell it",
    },
    {
      btn: "Sell",
      title: "Enter the price you are willing to sell",
      content:
        "As you confirm, this piece will now be for sale at the written price. However listed price cannot be edited once the item is listed. You will need to cancel your listing and relist the item with the update.",
    },
    {
      btn: "Buy Now",
      title: "Price ♦️10",
      content: "Are you willing to buy this product at the given price?",
    },
    { btn: "", title: "", content: "" },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {id == 3 ? (
        ""
      ) : (
        <Box>
          <Button
            variant="contained"
            sx={{ margin: "auto 0 auto auto" }}
            onClick={handleClickOpen}
          >
            {situations[id].btn}
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {situations[id].title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>{situations[id].content}</DialogContentText>
              {id === 1 ? (
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  type="price"
                  fullWidth
                  variant="standard"
                />
              ) : (
                ""
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
}
