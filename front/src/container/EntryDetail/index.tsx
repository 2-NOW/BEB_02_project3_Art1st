import Box from "@mui/material/Box";

import Layout from "@/components/Layout/index";
import Content from "@/container/EntryDetail/Content/index";
import ArtistProfile from "@/container/EntryDetail/ArtistProfile/index";

export default function Entrydetail() {
  return (
    <Layout>
      <div css={{ width: "80%", margin: "2rem auto 0 auto" }}>
        <Box sx={{ mb: "4rem" }}>
          <Content />
        </Box>
        <ArtistProfile />
      </div>
    </Layout>
  );
}
