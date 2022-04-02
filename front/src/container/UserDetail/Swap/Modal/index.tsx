import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import SwapInput from "./SwapInput";
import SwapTo from "./SwapTo";
import ConnectWallet from "./ConnectWallet";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35rem",
  height: "25rem",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const downwardcss = {
  padding: "4px",
  borderRadius: "12px",
  height: "32px",
  width: "32px",
  position: "relative",
  marginTop: "-14px",
  marginBottom: "-14px",
  left: "calc(50% - 16px)",
  backgroundColor: "rgb(247, 248, 250)",
  border: "4px solid rgb(255, 255, 255)",
  zIndex: 2,
};

const tokens = [
  {
    token: "AST",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Emojione_1F3A8.svg",
  },
  {
    token: "KLAY",
    image:
      "https://api.swapscanner.io/api/tokens/0x0000000000000000000000000000000000000000/icon",
  },
];

interface ModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

function Index({ openModal, setOpenModal }: ModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const handleClose = () => setOpenModal(false);

  const swapable = 1000; //api) user/balance

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
            Swap
          </Typography>

          <SwapInput
            swapable={swapable}
            setSelectedIndex={setSelectedIndex}
            image={tokens[selectedIndex].image}
            token={tokens[selectedIndex].token}
            setValue={setValue}
            maxValue={swapable}
          />

          <Box sx={downwardcss}>
            <ArrowDownwardIcon
              sx={{ position: "relative", right: "0.25rem", bottom: "0.25rem" }}
            />
          </Box>

          <SwapTo
            image={tokens[Number(!selectedIndex)].image}
            token={tokens[Number(!selectedIndex)].token}
            value={value}
          />
          <ConnectWallet />
        </Box>
      </Modal>
    </>
  );
}
export default Index;
