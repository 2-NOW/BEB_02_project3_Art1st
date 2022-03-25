import Title from "./Title";
import ArtImage from "./Image";
import WriteComment from "./WriteComment";
import CommentList from "./CommentList";
import Like from "./Like";
import Tag from "./Tag";

export default function ArtContent() {
  return (
    <>
      <Title />
      <ArtImage />
      <Tag />
      <Like />
      <WriteComment />
      <CommentList />
    </>
  );
}
