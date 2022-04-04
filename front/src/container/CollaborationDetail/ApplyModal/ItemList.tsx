import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import data from "@/data/index";
import NestedModal from "./NestedModal";

const imageCss = {
  position: "relative",
  height: "15rem",
  m: "1rem",
};

const contentCss = {
  width: "100%",
  height: "100%",
  position: "absolute",
  transition: "backdrop-filter 100ms, opacity 100ms",
  opacity: "0",
  color: "white",
  textShadow: "2px 2px 2px grey",
  "&:hover": {
    backdropFilter: "blur(50px) opacity(1)",
    opacity: "1",
  },
};

function ItemList() {
  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => setOpenModal(true);

  const testData = data.slice(30, 35);
  const [title, content] = ["title", "content"]; //API)

  return (
    <Grid container>
      {testData.map((src, index) => {
        return (
          <Grid key={index} item xl={6} xs={12}>
            <Card elevation={12} sx={imageCss}>
              <Button
                onClick={handleClick}
                sx={{ width: "100%", height: "100%" }}
              >
                <CardMedia
                  sx={{ position: "absolute" }}
                  component="img"
                  height="100%"
                  image={src}
                />
                <CardActionArea sx={contentCss}>
                  <CardContent sx={{ position: "absolute" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {title}
                    </Typography>
                    <Typography
                      sx={{ color: "white" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Button>
              <NestedModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={title}
              />
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ItemList;
