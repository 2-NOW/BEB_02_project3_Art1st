import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import ItemList from "./ItemList";
import data from "@/data/index";

function index() {
  return (
    <Box sx={{ mt: "2rem" }}>
      <ItemList />
    </Box>
  );
}

export default index;
