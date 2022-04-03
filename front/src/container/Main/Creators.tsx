import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

interface ICreator {
  id: number;
  name: string;
  picture: string;
}

const cardCss = {
  width: '10rem',
};

const avatarCss = {
  width: '7rem',
  height: '7rem',
  m: '1.5rem auto auto',
};

function Creators({ creators }: { creators: ICreator[] }) {
  return (
    <Box sx={{ width: '80vw', m: '11rem auto' }}>
      <Grid container rowSpacing={'3rem'}>
        {creators.map((creator, index) => {
          return (
            <Grid
              item
              key={index}
              sx={{ display: 'flex', justifyContent: 'center' }}
              xl={1.5}
              lg={2}
              md={3}
            >
              <Card sx={cardCss} elevation={5}>
                <Link href={`/user/${creator.id}`}>
                  <a>
                    <CardActionArea>
                      <Avatar sx={avatarCss} src={creator.picture} />

                      <Typography
                        sx={{ m: '1rem auto', textAlign: 'center' }}
                        variant="h6"
                        gutterBottom
                      >
                        {creator.name}
                      </Typography>
                    </CardActionArea>
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

export default Creators;
