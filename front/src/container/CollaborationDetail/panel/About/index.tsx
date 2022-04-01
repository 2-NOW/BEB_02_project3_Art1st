import AboutImage from "./Image";
import Description from "./Description";

import { image, info } from "./data";

function index() {
  return (
    <>
      <AboutImage artImage={image} />
      <Description description={info} />
    </>
  );
}

export default index;
