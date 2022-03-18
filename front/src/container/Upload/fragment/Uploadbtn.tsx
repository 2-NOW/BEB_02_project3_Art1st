import { Typography, Button } from "@mui/material";

const SignInCss = {
  display: "inline-block",
  height: "5vh",
  width: "15vw",
  padding: "0 15px",
  borderradius: "3px",
  margin: "1rem 0 0 0",
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
    <div css={{ position: "absolute", left: "42%" }}>
      <Button variant="contained" sx={SignInCss} onClick={handleClick}>
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
