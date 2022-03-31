import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Favorite from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface DataProps {
  image: string;
  title: string;
  creator: string;
  likes: number;
  comments: number;
  views: number;
}

function Item({ image, title, creator, likes, comments, views }: DataProps) {
  const imageCss = {
    position: "relative",
    height: "25rem",
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

  const iconCss = {
    fontSize: "1rem",
  };

  return (
    <Card elevation={12} sx={imageCss}>
      <CardMedia
        sx={{ position: "absolute" }}
        component="img"
        height="100%"
        image={image}
      />
      <CardActionArea sx={contentCss}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            sx={{ color: "white" }}
            variant="body1"
            color="text.secondary"
          >
            {creator}
          </Typography>
          <Box sx={{ display: "flex", mt: "3vh" }}>
            <Favorite sx={iconCss} />
            <Typography
              sx={{ m: "0 1rem 0 0.3rem" }}
              variant="body2"
              component="div"
            >
              {likes}
            </Typography>

            <ChatIcon sx={iconCss} />
            <Typography
              sx={{ m: "0 1rem 0 0.3rem" }}
              variant="body2"
              component="div"
            >
              {comments}
            </Typography>

            <VisibilityIcon sx={iconCss} />
            <Typography
              sx={{ m: "0 1rem 0 0.3rem" }}
              variant="body2"
              component="div"
            >
              {views}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Item;
