import Typography from "@mui/material/Typography";

interface AboutProps {
  description: string;
}

function Description({ description }: AboutProps) {
  return (
    <Typography
      sx={{ mt: "7vh", mb: "20vh", fontSize: "1.2rem" }}
      variant="body1"
      component="div"
    >
      {description.split("\n").map((line) => {
        return (
          <span>
            {line}
            <br />
          </span>
        );
      })}
    </Typography>
  );
}

export default Description;
