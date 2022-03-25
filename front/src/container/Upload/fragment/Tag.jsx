import { Cancel } from "@mui/icons-material";
import { Stack, TextField, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      sx={{
        background: "#f4f4f4",
        borderRadius: "30px",
        height: "100%",
        display: "flex",
        padding: "0.4rem",
        margin: "0 0.5rem 0 0",
        justifyContent: "center",
        alignContent: "center",
        color: "#494949",
      }}
    >
      <Stack direction="row" gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};

const modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  padding: "30px 20px",
  textAlign: "center",
  backgroundColor: "#fff",
  color: "#858585",
};

export default function InputTags() {
  const [tags, SetTags] = useState([]);
  const [ismax, setIsmax] = useState(false);
  const tagRef = useRef();

  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    SetTags(newtags);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (tags.length < 6) {
      SetTags([...tags, tagRef.current.value]);
      tagRef.current.value = "";
    } else setIsmax(true);
  };
  const handleClose = () => setIsmax(false);

  return (
    //width에 도달하면 세로로 길어지게 하고 싶은데 안됨
    <Box sx={{ flexGrow: 1, flexDirection: "column" }}>
      {" "}
      <form onSubmit={handleOnSubmit}>
        <TextField
          inputRef={tagRef}
          fullWidth
          variant="standard"
          size="small"
          sx={{ margin: "1rem 0" }}
          margin="none"
          placeholder={
            tags.length < 1
              ? "Enter tag that best features your artwork(Max 6)"
              : tags.length < 6
              ? "Insert tags(Max 6)"
              : ""
          }
          InputProps={{
            startAdornment: (
              <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                {tags.map((data, index) => {
                  return (
                    <Tags data={data} handleDelete={handleDelete} key={index} />
                  );
                })}
              </Box>
            ),
          }}
        />
        <Modal open={ismax} onClose={handleClose}>
          <Box sx={modalstyle}>
            <Typography>
              Max number of tags is 6 <br /> You can only add up to 6 tags
            </Typography>
          </Box>
        </Modal>
      </form>
    </Box>
  );
}
