import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

interface TitleProps {
  title: string;
  creator: string;
  created: string;
}

function Header({ title, creator, created }: TitleProps) {
  return (
    <Box sx={{ m: "0 auto" }}>
      <Typography
        sx={{ pl: "0.3rem", pb: "0.3rem" }}
        variant="h3"
        component="div"
      >
        {title}
      </Typography>

      <Box sx={{ display: "flex", m: "0 25%" }}>
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
      </Box>
    </Box>
  );
}

export default Header;
