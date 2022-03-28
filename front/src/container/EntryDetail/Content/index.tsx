import Title from "./Title";
import ArtImage from "@/container/ArtDetail/Content/Image";
import Description from "./Description";
import Like from "@/container/ArtDetail/Content/Like";
import Tag from "@/container/ArtDetail/Content/Tag";

export default function Content() {
  return (
    <>
      <Title />
      <ArtImage />
      <Description />
      <Tag />
      <Like />
    </>
  );
}
