import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Item from "./Item";
import data from "@/data/index";

function index() {
  const list = [
    {
      image: data[11],
      title: "title",
      creator: "creator",
      likes: 98,
      comments: 5,
      views: 2162,
    },
    {
      image: data[12],
      title: "title",
      creator: "creator",
      likes: 66,
      comments: 5,
      views: 733,
    },
    {
      image: data[13],
      title: "title",
      creator: "creator",
      likes: 48,
      comments: 5,
      views: 356,
    },
    {
      image: data[14],
      title: "title",
      creator: "creator",
      likes: 32,
      comments: 10,
      views: 200,
    },
    {
      image: data[15],
      title: "title",
      creator: "creator",
      likes: 32,
      comments: 10,
      views: 200,
    },
  ];
  const award = ["대상", "최우수상", "우수상", "장려상"];

  return (
    <Box sx={{ mt: "2rem" }}>
      {list.map((winner, idx) => {
        return idx < 3 ? (
          <Box sx={{ mb: "4rem" }}>
            <Typography variant="h5" sx={{ m: "2rem 0 0.5rem 0" }}>
              {award[idx]}
            </Typography>
            <Grid item xl={6} xs={12}>
              <Item
                image={winner.image}
                title={winner.title}
                creator={winner.creator}
                likes={winner.likes}
                comments={winner.comments}
                views={winner.views}
              />
            </Grid>
          </Box>
        ) : idx == 3 ? (
          <Box sx={{ mb: "4rem" }}>
            <Typography variant="h5" sx={{ m: "2rem 0 0.5rem 0" }}>
              {award[idx]}
            </Typography>
            <Grid item xl={6} xs={12}>
              <Item
                image={winner.image}
                title={winner.title}
                creator={winner.creator}
                likes={winner.likes}
                comments={winner.comments}
                views={winner.views}
              />
              <Item
                image={list[4].image}
                title={list[4].title}
                creator={list[4].creator}
                likes={list[4].likes}
                comments={list[4].comments}
                views={list[4].views}
              />
            </Grid>
          </Box>
        ) : (
          ""
        );
      })}
    </Box>
  );
}

export default index;
