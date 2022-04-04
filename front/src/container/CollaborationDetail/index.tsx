import Box from "@mui/material/Box";

import Layout from "@/components/Layout";
import Header from "./Header";
import Tabs from "./Tabs";

const wrapperCss = {
  display: "flex",
  flexDirection: "column",
  m: "6rem 20vw 0 20vw",
};

function index() {
  return (
    <Layout>
      <Box sx={wrapperCss}>
        <Header
          title={"Artwork Name"}
          creator={"Art1st"}
          created={"2020.03.22"}
        />
        <Tabs />
      </Box>
    </Layout>
  );
}

export default index;
