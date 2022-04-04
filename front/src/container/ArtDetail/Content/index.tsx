import Header from "./fragment/Header";
import ArtImage from "./fragment/ArtImage";
import Description from "./fragment/Description";
import Tags from "./fragment/Tags";
import CheckIcons from "./fragment/CheckIcons";

import data from "@/data/index";

function index() {
  const testText =
    "lorem ipsum  dolor sit amet ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet";
  const testTags = ["tag1", "tag2", "tag3", "tag4", "tag5"];

  return (
    <>
      <Header
        title={"Artwork Name"}
        creator={"Creator"}
        views={1234}
        created={"2020.03.22"}
        price={100}
        is_selling={false}
        artImage={data[20]}
      />
      <ArtImage artImage={data[20]} />
      <Description description={testText} />
      <Tags tags={testTags} />
      <CheckIcons likeCount={22} wantCount={24} />
    </>
  );
}

export default index;
