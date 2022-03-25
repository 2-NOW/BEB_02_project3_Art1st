import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

const testLabelData = ["전체", "봄", "커플", "행복한 우리집", "꽃", "사랑"];

function Tag() {
  const [clickedTagIndex, setClickedTagIndex] = useState(0);

  const handleTagClick = (index: number) => {
    setClickedTagIndex(index);
  };
  const tagCss = {
    width: "70vw",
    m: "2rem auto 0 0",
    "& .MuiChip-label": { m: "0.5rem", fontSize: "1rem" },
    "& .MuiChip-sizeMedium": { height: "2.3rem", borderRadius: "2rem" },
  };

  return (
    <>
      <Box sx={tagCss}>
        {testLabelData.map((label, index) => {
          return (
            <Chip
              sx={{ m: "0.2rem" }}
              color="primary"
              key={index}
              label={label}
              variant="outlined"
            />
          );
        })}
      </Box>
    </>
  );
}

export default Tag;
