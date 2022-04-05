import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import About from "./panel/About/index";
import Winners from "./panel/Winners/index";
import Entries from "./panel/Entries/index";
import ApplyModal from "./ApplyModal/index";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const participants = 463;
  const applicable = true; //Api)  get /collaboration/:id

  const handleClick = () => setOpenModal(true);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Divider sx={{ mt: "15vh" }} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="About" {...a11yProps(0)} />
            <Tab label="5 Winners" {...a11yProps(1)} />
            <Tab label={participants + " Participants"} {...a11yProps(2)} />
          </Tabs>
          {applicable ? (
            <>
              <Button
                variant="contained"
                sx={{ m: "auto 0 auto auto", height: "2rem", width: "6rem" }}
                onClick={handleClick}
              >
                Apply
              </Button>
              <ApplyModal openModal={openModal} setOpenModal={setOpenModal} />
            </>
          ) : (
            <Button
              variant="contained"
              disabled
              sx={{ m: "auto 0 auto auto", height: "2rem" }}
            >
              Application ended
            </Button>
          )}
        </Box>
        <TabPanel value={value} index={0}>
          <About />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Winners />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Entries />
        </TabPanel>
      </Box>
    </>
  );
}
