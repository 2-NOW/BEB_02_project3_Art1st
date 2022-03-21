import { Typography, Button } from "@mui/material";

const UploadCss = {
  display: "inline-block",
  height: "4vh",
  width: "7vw",
  padding: "0 15px",
  borderradius: "3px",
  margin: "0.5rem 0 0 0",
  color: "white",
  backgroundColor: "#D9001D",
  opacity: 0.7,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#D9001D",
  },
};

export default function Uploadbtn() {
  const handleClick = () => {};

  return (
    <div css={{}}>
      <Button variant="contained" sx={UploadCss} onClick={handleClick}>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", textTransform: "capitalize" }}
        >
          Create
        </Typography>
      </Button>
    </div>
  );
}
