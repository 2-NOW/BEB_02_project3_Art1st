import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import Setpfp from "./Setpfp";
import Modal from "../Modal/index";

interface TitleProps {
  title: string;
  creator: string;
  views: number;
  created: string;
  is_selling: boolean;
  price: number;
  artImage: string;
}

function Header({
  title,
  creator,
  views,
  created,
  is_selling,
  price,
  artImage,
}: TitleProps) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ pl: "0.3rem", pb: "0.3rem" }}
          variant="h3"
          component="div"
        >
          {title}
        </Typography>
        <Setpfp artImage={artImage} />
      </Box>

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
        <Box sx={{ m: "auto 0 auto auto" }}>
          <Modal is_selling={is_selling} price={price} />
        </Box>
      </Box>
    </>
  );
}

export default Header;
