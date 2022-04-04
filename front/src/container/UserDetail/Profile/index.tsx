<<<<<<< HEAD
import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const profileImageCss = {
  position: 'relative',
  width: '100%',
  height: '15rem',
};

interface ProfileProps {
  profileImage: string;
  userName: string;
  description: string;
  websites: string[];
}
=======
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
>>>>>>> 7a8bf30f1b8fea7aaa56073fef220ee3f074866e

function index({
  profileImage,
  userName,
  description,
  websites,
}: ProfileProps) {
  return (
    <>
      <Box sx={profileImageCss}>
        <Image
          src={profileImage}
          quality={100}
          layout="fill"
          objectFit="cover"
        />
      </Box>
<<<<<<< HEAD
      <Typography sx={{ ml: '0.5rem', mt: '2rem' }} variant="h5">
        {userName}
      </Typography>

      <Typography sx={{ mt: '1rem' }} variant="subtitle1">
        {description}
      </Typography>

      <Box sx={{ mt: '2rem' }}>
        <IconButton disabled={websites[0] ? false : true}>
          <a
            href={websites[0]}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <InstagramIcon />
          </a>
=======
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
>>>>>>> 7a8bf30f1b8fea7aaa56073fef220ee3f074866e
        </IconButton>

        <IconButton disabled={websites[1] ? false : true}>
          <a
            href={websites[1]}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <TwitterIcon />
          </a>
        </IconButton>

        <IconButton disabled={websites[2] ? false : true}>
          <a
            href={websites[2]}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <FacebookIcon />
          </a>
        </IconButton>
      </Box>

      <Donate />
    </>
  );
}

export default index;
