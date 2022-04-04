import { useState, SyntheticEvent } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ItemList from "./ItemList";
import TabPanel from "./TabPanel";
import Swap from "../Swap/index";

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabMenu() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ p: "0 3rem 0 3rem" }}
            label={<Typography variant="h5">Collect</Typography>}
            {...tabProps(0)}
          />
          <Tab
            sx={{ p: "0 3rem 0 3rem" }}
            label={<Typography variant="h5">Create</Typography>}
            {...tabProps(1)}
          />
          <Swap />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ItemList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ItemList />
      </TabPanel>
    </Box>
  );
}
