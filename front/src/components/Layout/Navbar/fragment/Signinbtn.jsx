import { css } from "@emotion/react";
import { Typography, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UploadIcon from "@mui/icons-material/Upload";

const wrapper = css`
  position: relative;
`;

const SignInCss = {
  display: "flex",
  margin: "0.9rem 0.5rem 0 0",
  height: "4vh",
  width: "6vw",
  color: "white",
  borderRadius: "16px",
  backgroundColor: "#D9001D",
  opacity: 0.7,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#D9001D",
  },
};

const UploadCss = {
  margin: "0.9rem 0.5rem 0 0",
  height: "4vh",
  width: "6vw",
  color: "white",
  borderRadius: "16px",
  backgroundColor: "#D9001D",
  opacity: 0.7,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#D9001D",
  },
};

export default function Signinbtn() {
  const handleClick = () => {};
  const isLogin = true;

  return (
    <div css={wrapper}>
      {isLogin ? (
        <div css={{ display: "flex" }}>
          <Button variant="contained" sx={UploadCss} onClick={handleClick}>
            <UploadIcon />
            <Typography
              sx={{ textAlign: "center", textTransform: "capitalize" }}
            >
              Upload
            </Typography>
          </Button>
          <AccountCircleIcon
            fontSize="large"
            sx={{ float: "right", marginTop: "0.9rem" }}
          />
        </div>
      ) : (
        <Button variant="contained" sx={SignInCss} onClick={handleClick}>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", textTransform: "capitalize" }}
          >
            SignIn
          </Typography>
        </Button>
      )}
    </div>
  );
}
