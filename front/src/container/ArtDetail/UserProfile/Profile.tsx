import { Avatar, Box, Divider, Typography } from "@mui/material";
import data from "@/data/index";

export default function Profile() {
  return (
    <>
      <Box sx={{ display: "flex", m: "2rem auto 4rem" }}>
        <Avatar
          sx={{ width: "7rem", height: "7rem", mr: "2rem" }}
          src={data[3]}
        />
        <Box>
          <Typography sx={{ m: "0.5rem auto 0.5rem" }} variant="h4">
            Artist
          </Typography>
          <Typography variant="subtitle1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
            natus nisi quos, dolorum corrupti voluptate! Hic dicta quo nihil
            eligendi?
          </Typography>
        </Box>
      </Box>
      <Divider />
    </>
  );
}
