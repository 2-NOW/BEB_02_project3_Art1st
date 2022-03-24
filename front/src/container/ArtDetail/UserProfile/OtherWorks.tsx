import { Typography, Box, Grid, Card, CardMedia } from "@mui/material";
import data from "@/data/index";

const imageCss = {
  position: "relative",
  height: "15rem",
  m: "1rem",
};

export default function OtherWorks() {
  const testData = data.slice(5, 10);

  return (
    <>
      <Typography variant="h6" fontWeight={300}>
        More from this Artist
      </Typography>
      <Box sx={{ width: "100%", mt: "1rem" }}>
        <Grid container>
          {testData.map((src) => {
            return (
              <Grid item xs={2.3}>
                <Card sx={imageCss}>
                  <CardMedia
                    sx={{ position: "absolute" }}
                    component="img"
                    height="100%"
                    image={src}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
