import { Typography, Box } from "@mui/material";
import Purchase from "./Purchase";

const artwork = {
  title: "Title",
  creator_id: "Name",
  views: "1,234",
  created_at: "2022.03.22",
};

export default function Title() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <div
          css={{ fontSize: "2em", fontWeight: "500", marginBottom: "0.2em" }}
        >
          {artwork.title}
        </div>
        <Typography component="div" variant="body2" color="text.secondary">
          created by {artwork.creator_id} | {artwork.created_at} | views{" "}
          {artwork.views}
        </Typography>
      </Box>
      <Box sx={{ margin: "auto 0 auto auto" }}>
        <Purchase />
      </Box>
    </Box>
  );
}
