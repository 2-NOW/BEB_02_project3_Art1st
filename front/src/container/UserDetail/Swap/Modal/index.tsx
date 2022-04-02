import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import SwapInput from "./SwapInput";
import SwapTo from "./SwapTo";
import ConnectWallet from "./ConnectWallet";
import SwapKlaybutton from "./SwapKlaybutton";
import SwapASTbutton from "./SwapASTbutton";

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
  const [account, setAccount] = useState("");
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

          <SwapTo
            image={tokens[Number(!selectedIndex)].image}
            token={tokens[Number(!selectedIndex)].token}
            value={value}
          />
          {account == "" ? (
            <ConnectWallet setAccount={setAccount} />
          ) : selectedIndex ? (
            <SwapKlaybutton account={account} klayAmount={value} />
          ) : (
            <SwapASTbutton account={account} ASTAmount={value} />
          )}
        </Box>
      </Modal>
    </>
  );
}
export default Index;
