import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

import data from '@/data/index';

function ItemList() {
  const testData = data.slice(20, 50);

  const imageCss = {
    position: 'relative',
    height: '25rem',
    m: '1rem',
  };

  const contentCss = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transition: 'backdrop-filter 100ms, opacity 100ms',
    opacity: '0',
    color: 'white',
    textShadow: '2px 2px 2px grey',
    '&:hover': {
      backdropFilter: 'blur(50px) opacity(1)',
      opacity: '1',
    },
  };
  return (
    <Grid container>
      {testData.map((src) => {
        return (
          <Grid item xl={6} xs={12}>
            <Card elevation={12} sx={imageCss}>
              <CardMedia
                sx={{ position: 'absolute' }}
                component="img"
                height="100%"
                image={src}
              />
              <CardActionArea sx={contentCss}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Statue of Liberty
                  </Typography>
                  <Typography
                    sx={{ color: 'white' }}
                    variant="body2"
                    color="text.secondary"
                  >
                    lorem ipsum dolor sit amet, consectetur adip sap et dolor
                    sed diam non pro pos
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ItemList;
