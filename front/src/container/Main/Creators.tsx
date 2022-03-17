import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import data from '@/data/index';

const cardCss = {
  width: '10rem',
};

const avatarCss = {
  width: '7rem',
  height: '7rem',
  m: '1.5rem auto auto',
};

function Creators() {
  const testData = data.slice(0, 24);
  return (
    <Box sx={{ width: '80vw', m: '8rem auto' }}>
      <Grid container rowSpacing={'4rem'}>
        {testData.map((item) => {
          return (
            <Grid
              item
              sx={{ display: 'flex', justifyContent: 'center' }}
              xl={1.5}
              lg={2}
              md={3}
            >
              <Card sx={cardCss} elevation={5}>
                <CardActionArea>
                  <Avatar sx={avatarCss} src={item} />
                  <Typography
                    sx={{ m: '1rem auto', textAlign: 'center' }}
                    variant="h6"
                    gutterBottom
                  >
                    Artist
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Creators;
