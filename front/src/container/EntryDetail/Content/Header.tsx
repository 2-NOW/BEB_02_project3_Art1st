import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

interface TitleProps {
  title: string;
  creator: string;
  views: number;
  created: string;
}

function Header({ title, creator, views, created }: TitleProps) {
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
      </Box>
    </>
  );
}

export default Header;
