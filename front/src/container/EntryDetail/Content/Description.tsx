import { Box } from "@mui/material";

export default function Description() {
  const content = `너와 내가 함께 하는 오늘,
    내일을 기대할 수 있어서 좋아.
    오늘 만큼은 무거운 짐을 내려놓고
    편히 숨을 내쉬어
    그렇게 스며들기 좋은 오늘`;

  return (
    <Box sx={{ mt: "1rem", mb: "2rem" }}>
      {content.split("\n").map((line) => {
        return (
          <span>
            {line}
            <br />
          </span>
        );
      })}
    </Box>
  );
}
