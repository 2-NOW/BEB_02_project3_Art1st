import { useState } from "react";
import styled from "@emotion/styled";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { css } from "@emotion/react";

const InputWrapper = styled.div`
  width: 30vw;
  margin-top: 3rem;
`;

const colorcss = {
  root: {
    "&$checked": {
      color: "#D9001D",
    },
    "&$focused": {
      color: "#D9001D",
    },
  },
};

export default function Inputdata() {
  const [onsale, setOnsale] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnsale(event.target.checked);
  };

  return (
    <InputWrapper>
      <Typography>Title</Typography>
      <TextField
        required
        id="standard-required"
        variant="standard"
        size="small"
        style={{ marginBottom: "1rem", width: "20vw" }}
      />
      <Typography>Description</Typography>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={7}
        placeholder="Describe your art work"
        margin="normal"
        fullWidth
      />
      <div css={{ display: "flex" }}>
        <FormControlLabel
          control={
            <Checkbox checked={onsale} onChange={handleChange} css={colorcss} />
          }
          label="On Sale"
          labelPlacement="start"
          sx={{ margin: "0" }}
        />
        <FormControl sx={{ m: 1, width: "10vw" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">♦️</InputAdornment>
            }
            label="Price"
            disabled={!onsale}
          />
        </FormControl>
      </div>
    </InputWrapper>
  );
}
