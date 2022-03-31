import Card from "@mui/material/Card";
import CommentInput from "@/container/ArtDetail/Comment/CommentInput";
import CommentList from "@/container/ArtDetail/Comment/CommentList";

function Comment() {
  return (
    <Card sx={{ mt: "13vh" }} elevation={2}>
      <CommentInput />
      <CommentList />
    </Card>
  );
}

export default Comment;
