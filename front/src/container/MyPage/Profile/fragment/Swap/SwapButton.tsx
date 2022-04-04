import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from './Modal/index';

function SwapButton() {
  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => setOpenModal(true);

  return (
    <Box sx={{ mt: '0.5rem' }}>
      <Button sx={{ width: '100%' }} variant="contained" onClick={handleClick}>
        SWAP
      </Button>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </Box>
  );
}

export default SwapButton;
