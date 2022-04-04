import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface NestedModalprops {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  title: string;
}

function NestedModal({ openModal, setOpenModal, title }: NestedModalprops) {
  const handleClose = () => setOpenModal(false);
  const apply = () => {
    //API) /collaboration/:collaboration_id/entries
    setOpenModal(false);
  };

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${title}을 출품하시겠습니까?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            출품한 작품은 기획전이 마감될 때까지 판매하실 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={apply} autoFocus>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NestedModal;
