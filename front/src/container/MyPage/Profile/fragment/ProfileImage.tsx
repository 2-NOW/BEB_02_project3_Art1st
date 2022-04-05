import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

interface ImageProps {
  src: string;
}

function ProfileImage({ src }: ImageProps) {
  return (
    <Card sx={{ height: '15rem' }}>
      <CardMedia component="img" image={src} />
    </Card>
  );
}

export default ProfileImage;
