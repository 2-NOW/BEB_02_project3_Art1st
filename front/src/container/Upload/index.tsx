import { useState } from "react";
import styled from "@emotion/styled";

import Uploadimage from "./fragment/UploadImage";
import Inputdata from "./fragment/Inputdata";
import Tag from "./fragment/Tag";
import Uploadbtn from "./fragment/Uploadbtn";

const UploadPage = styled.div`
  display: flex;
  width: 90%;
  margin: 2rem auto 0 4rem;
`;

interface Uploadprops {
  image: object;
  title: string;
  description: string;
  is_selling: boolean;
  price: number;
}

function Index() {
  const [data, setData] = useState<Uploadprops>({
    image: {},
    title: "",
    description: "",
    is_selling: false,
    price: NaN,
  });

  return (
    <UploadPage>
      <Uploadimage />
      <div>
        <Inputdata setData={setData} />
        <Tag />
        <Uploadbtn />
      </div>
    </UploadPage>
  );
}

export default Index;
