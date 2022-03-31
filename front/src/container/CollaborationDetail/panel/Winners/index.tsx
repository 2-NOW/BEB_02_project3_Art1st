import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Item from "./Item";
import data from "@/data/index";

function index() {
  const lists = [
    {
      award: "대상",
      image: data[11],
      title: "title",
      creator: "creator",
      likes: 98,
      comments: 5,
      views: 2162,
    },
    {
      award: "최우수상",
      image: data[12],
      title: "title",
      creator: "creator",
      likes: 66,
      comments: 5,
      views: 733,
    },
    {
      award: "우수상",
      image: data[13],
      title: "title",
      creator: "creator",
      likes: 48,
      comments: 5,
      views: 356,
    },
    {
      award: "장려상",
      image: data[14],
      title: "title",
      creator: "creator",
      likes: 32,
      comments: 10,
      views: 200,
    },
  ];

  return (
    <Box sx={{ mt: "2rem" }}>
      {lists.map((winner) => {
        return (
          <Box>
            <Typography variant="h5" sx={{ m: "2rem 0 0.5rem 0" }}>
              {winner.award}
            </Typography>
            <Item
              image={winner.image}
              title={winner.title}
              creator={winner.creator}
              likes={winner.likes}
              comments={winner.comments}
              views={winner.views}
            />
          </Box>
        );
      })}
    </Box>
  );
}

export default index;
