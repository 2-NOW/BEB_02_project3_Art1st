import Link from 'next/link';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import data from '@/data/index';

interface ICreatedArtworks {
  artwork_id: number;
  title: string;
  ipfsURI: string;
  is_selling: boolean;
  price: string;
  views: number;
  like_count: number;
  comment_count: number;
  creator_name: string;
  owner_name: string;
}

function OtherWorks({ data }: { data: ICreatedArtworks[] }) {
  return (
    <Box sx={{ mt: '10vh', mb: '18vh' }}>
      <Typography sx={{ mb: '4vh' }} variant="h4">
        More from this Artist
      </Typography>

      <Grid container spacing="2rem">
        {data.map((item) => {
          const { artwork_id, ipfsURI } = item;
          return (
            <Grid key={artwork_id} item lg={4}>
              <Card elevation={12}>
                <Link href={`/artwork/${artwork_id}`}>
                  <a>
                    <CardMedia
                      sx={{ height: '25vh' }}
                      component="img"
                      image={ipfsURI}
                    />
                  </a>
                </Link>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default OtherWorks;
