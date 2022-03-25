import Box from "@mui/material/Box";

import ArtContent from "@/container/ArtDetail/Content/index";
import ArtistProfile from "@/container/ArtDetail/UserProfile/index";

export default function Artdetail() {
  return (
    <div css={{ width: "80%", margin: "2rem auto 0 auto" }}>
      <Box sx={{ mb: "4rem" }}>
        <ArtContent />
      </Box>
      <ArtistProfile />
    </div>
  );
}
