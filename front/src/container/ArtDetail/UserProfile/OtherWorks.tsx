import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import data from '@/data/index';

function OtherWorks() {
  const testData = data.slice(5, 8);

  return (
    <Box sx={{ mt: '10vh', mb: '18vh' }}>
      <Typography sx={{ mb: '4vh' }} variant="h4">
        More from this Artist
      </Typography>

      <Grid container spacing="2rem">
        {testData.map((src) => {
          return (
            <Grid item lg={4}>
              <Card elevation={12}>
                <CardMedia
                  sx={{ height: '25vh' }}
                  component="img"
                  image={src}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default OtherWorks;
