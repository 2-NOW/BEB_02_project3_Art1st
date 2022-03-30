import Typography from '@mui/material/Typography';

interface DescriptionProps {
  description: string;
}

function Description({ description }: DescriptionProps) {
  return (
    <Typography
      sx={{ mt: '7vh', fontSize: '1.2rem' }}
      variant="body1"
      component="div"
    >
      {description}
    </Typography>
  );
}

export default Description;
