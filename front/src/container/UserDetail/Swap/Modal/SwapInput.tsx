import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";

import TokenSelect from "./TokenSelect";

const swapbox = {
  borderRadius: "20px",
  border: "1px solid rgb(255, 255, 255)",
  backgroundColor: "rgb(247, 248, 250)",
};

const contentbox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem",
};

const balancebox = {
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "flex-end",
  alignItems: "center",
  color: "rgb(0,0,0)",
  fontSize: "0.75rem",
  padding: "0 1rem 1rem",
  lineHeight: "1rem",
};

interface SwapInputprops {
  swapable: number;
  setSelectedIndex: (value: number) => void;
  image: string;
  token: string;
  maxValue: number;
  setValue: (value: number) => void;
}

function SwapInput({
  swapable,
  setSelectedIndex,
  image,
  token,
  setValue,
  maxValue,
}: SwapInputprops) {
  const handleOnChange = (e) => {
    if (token == "AST" && maxValue < e.target.value) setValue(maxValue);
    else setValue(e.target.value);
  };

  return (
    <Box sx={swapbox}>
      <Box sx={contentbox}>
        <Input
          inputMode="decimal"
          type="number"
          disableUnderline={true}
          placeholder="0.0"
          onChange={handleOnChange}
          sx={{ color: "rgb(0,0,0)", fontWeight: 500, fontSize: "28px" }}
        />
        <TokenSelect
          setSelectedIndex={setSelectedIndex}
          image={image}
          token={token}
        />
      </Box>
      <Box sx={balancebox}>
        {token == "AST" ? <Typography>Swapable: {swapable}</Typography> : ""}
      </Box>
    </Box>
  );
}

export default SwapInput;
