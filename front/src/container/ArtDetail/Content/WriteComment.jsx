import { useState } from "react";
import { Button, Typography } from "@mui/material";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;

const wrapper = {
  width: "95%",
  height: "20vh",
  border: "0.1em groove",
};

export default function NewComment(/*{ artwork_id }*/) {
  const [comment, setComment] = useState("");
  // const navigate = useNavigate();

  // function reloadDivArea() {
  //   window.$("#div_comment").load(window.location.href + " #div_comment");
  // }

  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  const save = async () => {
    if (comment && user_id) {
      await axios
        .post(`http://localhost:8888/artwork/:${artwork_id}/comment`, {
          artwork_id,
          content,
          user_id,
        })
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          reward();
          reloadDivArea();
          navigate("/");
        });
    } else if (!user_id) alert("Please log in to leave a comment");
    else alert("You haven't entered a content");
  };

  return (
    <div css={{ display: "flex", marginTop: "2rem" }}>
      <div css={wrapper}>
        <Typography sx={{ ml: "0.5rem" }}>user_id</Typography>
        <textarea
          css={{
            paddingLeft: "0.4rem",
            height: "85%",
            width: "100%",
            border: "none",
          }}
          id="comment"
          type="text"
          placeholder="Leave a comment"
          onChange={onChangeComment}
        />
      </div>
      <Button
        onClick={save}
        variant="contained"
        sx={{ height: "5vh", position: "relative", top: "15vh" }}
      >
        Submit
      </Button>
    </div>
  );
}
