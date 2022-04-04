import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import data from '@/data/index';

import InputForm from './InputForm';

const style = {
  position: 'absolute' as 'absolute',
  display: 'flex',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50rem',
  height: '40rem',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

interface ModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

function index({ openModal, setOpenModal }: ModalProps) {
  const handleClose = () => setOpenModal(false);
  const [isLogin, setIsLogin] = useState(true);

  const imageSrc = data[47];

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image
            src={imageSrc}
            height="100%"
            width="250"
            objectFit="cover"
            quality={100}
          />
          <Box sx={{ p: '5rem', width: '35rem' }}>
            <Typography variant="h4">
              {isLogin ? 'Login' : 'Sign up'}
            </Typography>
            <Typography sx={{ mt: '1rem' }} variant="subtitle1">
              Welcome to Art1st !
            </Typography>
            <InputForm
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              setOpenModal={setOpenModal}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
export default index;
