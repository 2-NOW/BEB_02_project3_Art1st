import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "./Modal/index";

function SwapButton() {
  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => setOpenModal(true);

  return (
    <Box sx={{ m: "auto 0 auto auto" }}>
      <Button
        sx={{ width: "7vw", minWidth: "7rem" }}
        variant="contained"
        onClick={handleClick}
      >
        SWAP
      </Button>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </Box>
  );
}

export default SwapButton;
