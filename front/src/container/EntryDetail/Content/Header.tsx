import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

import Modal from "./Modal";

interface TitleProps {
  title: string;
  creator: string;
  views: number;
  created: string;
}

const buttonCss = {
  m: "auto 0 auto auto",
  position: "relative",
  bottom: "3vh",
  height: "5vh",
  width: "7vw",
};

function Header({ title, creator, views, created }: TitleProps) {
  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => setOpenModal(true);

  return (
    <>
      <Typography
        sx={{ pl: "0.3rem", pb: "0.3rem" }}
        variant="h3"
        component="div"
      >
        {title}
      </Typography>

      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ m: "0.1rem 1rem 0.1rem 0" }}
          variant="body1"
          component="div"
        >
          {creator}
        </Typography>

        <Divider orientation="vertical" flexItem />

        <Typography
          sx={{ m: "0.1rem 1rem 0.1rem 1rem" }}
          variant="body1"
          component="div"
        >
          {created}
        </Typography>

        <Divider orientation="vertical" flexItem />

        <Typography
          sx={{ m: "0.1rem 1rem 0.1rem 1rem" }}
          variant="body1"
          component="div"
        >
          {views} views
        </Typography>
        <Button variant="contained" sx={buttonCss} onClick={handleClick}>
          <HowToVoteIcon /> Vote
        </Button>
      </Box>
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default Header;
