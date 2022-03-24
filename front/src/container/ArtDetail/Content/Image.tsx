import { Card, CardMedia } from "@mui/material";
import data from "@/data/index";

export default function Image() {
  return (
    <Card sx={{ mt: "2rem" }}>
      <CardMedia component="img" height="100%" width="100%" image={data[0]} />
    </Card>
  );
}
