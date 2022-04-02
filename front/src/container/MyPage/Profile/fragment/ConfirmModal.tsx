import { FormEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ConfirmModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  handleConfirm: () => void;
}

function ConfirmModal({
  open,
  setOpen,
  setIsEdit,
  handleConfirm,
}: ConfirmModalProps) {
  const handleClose = () => {
    setOpen(false);
  };
  // todo: mutate 보내고 성공 시 setIsEdit false로 보내주기
  //

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure to submit?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: '0.5rem' }}>
          If you submit, your profile will be changed.
        </Typography>
        <Box sx={{ mt: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleConfirm} variant="contained">
            Confirm
          </Button>

          <Button
            sx={{ ml: '0.5rem' }}
            onClick={handleClose}
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConfirmModal;
