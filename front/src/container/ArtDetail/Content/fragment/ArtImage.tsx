import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

interface ArtImageProps {
  artImage: string;
}

function ArtImage({ artImage }: ArtImageProps) {
  return (
    <Card sx={{ mt: '5vh', position: 'relative' }} elevation={24}>
      <CardMedia
        sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        component="img"
        image={artImage}
      />
    </Card>
  );
}

export default ArtImage;
