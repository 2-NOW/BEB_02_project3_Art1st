import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

import Donate from "./Donate";
import data from "@/data/index";

function index() {
  const testData = data[41];

  const profileImageCss = {
    position: "relative",
    width: "100%",
    height: "15rem",
  };

  return (
    <>
      <Box sx={profileImageCss}>
        <Image src={testData} quality={100} layout="fill" objectFit="cover" />
      </Box>
      <Typography sx={{ ml: "0.5rem", mt: "2rem" }} variant="h5">
        Artist
      </Typography>

      <Typography sx={{ mt: "1rem" }} variant="subtitle1">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit natus
        nisi quos, dolorum corrupti voluptate! Hic dicta quo nihil eligendi?
        Iure deleniti modi facere ipsum ullam nesciunt quis soluta distinctio.
      </Typography>

      <Box sx={{ mt: "2rem" }}>
        <IconButton>
          <InstagramIcon />
        </IconButton>
        <IconButton>
          <TwitterIcon />
        </IconButton>
        <IconButton>
          <EmailIcon />
        </IconButton>
      </Box>

      <Donate />
    </>
  );
}

export default index;
