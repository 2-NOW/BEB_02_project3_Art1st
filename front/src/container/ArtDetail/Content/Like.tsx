import FavoriteIcon from "@mui/icons-material/Favorite";
import SellIcon from "@mui/icons-material/Sell";
import { Typography, IconButton } from "@mui/material";

const wrapper = {
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  margin: "1rem 0 3rem 0",
};

export default function Like() {
  return (
    <div css={wrapper}>
      <div css={{ width: "5rem" }}>
        <IconButton>
          <FavoriteIcon fontSize="large" />
        </IconButton>
        <Typography component="div" color="text.secondary" fontSize={5}>
          Like
        </Typography>
        <Typography sx={{ mt: "0.3rem" }} variant="h6" gutterBottom>
          21
        </Typography>
      </div>

      <div css={{ width: "5rem" }}>
        <IconButton>
          <SellIcon fontSize="large" />
        </IconButton>
        <Typography component="div" color="text.secondary" fontSize={5}>
          Want to Buy
        </Typography>
        <Typography sx={{ mt: "0.3rem" }} variant="h6" gutterBottom>
          4
        </Typography>
      </div>
    </div>
  );
}
