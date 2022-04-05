import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import ItemList from "./ItemList";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50rem",
  height: "40rem",
  bgcolor: "background.paper",
  overflow: "scroll",
  boxShadow: 24,
  p: 4,
};

interface Applyprops {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

function index({ openModal, setOpenModal }: Applyprops) {
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ fontSize: "18px", fontWeight: 400, p: "0 1.25rem 0.5rem" }}
          >
            Choose and Apply
          </Typography>
          <ItemList />
        </Box>
      </Modal>
    </>
  );
}

export default index;
