import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import data from "@/data/index";

const applicablecss = {
  color: "white",
  margin: "1rem auto 0 1rem",
  height: "1.8rem",
  width: "7vw",
  borderRadius: "4px",
  textAlign: "center",
};

export default function List() {
  const testData = data.slice(0, 24);
  const applicable = true;

  return (
    <Box sx={{ width: "70vw", m: "2rem 15vw auto" }}>
      <Grid container rowSpacing={"4rem"} spacing={3}>
        {testData.map((item, index) => {
          return (
            <Grid
              item
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
              xl={4}
            >
              <Card sx={{ width: "30rem" }} elevation={5}>
                <CardActionArea>
                  <CardMedia component="img" height="230" image={item} />
                  <Box
                    sx={{
                      ...applicablecss,
                      backgroundColor: `${applicable ? "#1976d2" : "#808080"}`,
                    }}
                  >
                    <Typography variant="body2" sx={{ paddingTop: "3%" }}>
                      {applicable ? "Apply Now" : "Application Ended"}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ m: "0.5rem auto 3rem 1rem" }}
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                  >
                    Collaboration
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
