import { useState } from 'react';
import Button from '@mui/material/Button';

import Modal from './Modal/index';

function LoginButton() {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => setOpenModal(true);

  return (
    <>
      <Button
        sx={{ borderRadius: '2rem', width: '6rem', height: '2.3rem' }}
        variant="contained"
        onClick={handleClick}
      >
        Login
      </Button>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default LoginButton;
