import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
// import axios from "axios";

export default function CommentsList(/*{ artwork_id }*/) {
  const [comments, setComments] = useState([
    { writtenby: "SY", comment: "Hello", createdat: "2022.03.23 12:15" },
    {
      writtenby: "HH",
      comment: "Artdetail page comment",
      createdat: "2022.03.23 12:10",
    },
    {
      writtenby: "AA",
      comment: "Comment list sample data",
      createdat: "2022.03.23 12:00",
    },
  ]);

  // useEffect(() => {
  //   async function reqData() {
  //     await axios
  //       .get(`http://localhost:8888/artwork/:${artwork_id}`)
  //       .then((res) => {
  //         let _comments = res.data.map((comment) => ({
  //           writtenby: comment.user_id,
  //           comment: comment.content,
  //           createdat: comment.created_at,
  //         }));
  //         setComments(comments.concat(_comments));
  //       })
  //       .catch((e) => console.log(e));
  //   }
  //   reqData();
  // }, []);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {comments.map((comment) => {
        return (
          <ListItem key={comment.id} alignItems="flex-start">
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    component="div"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.writtenby}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body1"
                    color="text.primary"
                  >
                    {comment.comment}
                  </Typography>
                  <Typography
                    fontSize={5}
                    component="div"
                    color="text.secondary"
                  >
                    {comment.createdat}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}
