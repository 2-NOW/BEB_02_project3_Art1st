import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

interface ModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

function Modal({ openModal, setOpenModal }: ModalProps) {
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"이 작품에 투표하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            투표에는 1AST가 소요되며, 마감 전까지 작품별 득표수는 공개되지
            않습니다
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default Modal;
