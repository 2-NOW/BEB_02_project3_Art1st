import Link from 'next/link';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

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

interface IData {
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

function ItemList({ data }: { data: IData[] }) {
  //todo: hover 시 표시되는 정보 수정하고 렌더링하는 추가작업 필요

  console.log(data);
  return (
    <Grid container>
      {data?.map((item) => {
        return (
          <Grid key={item.artwork_id} item xl={6} xs={12}>
            <Card elevation={12} sx={imageCss}>
              <CardMedia
                sx={{ position: 'absolute' }}
                component="img"
                height="100%"
                image={item.ipfsURI}
              />
              <Link href={`/artwork/${item.artwork_id}`}>
                <CardActionArea sx={contentCss}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{ color: 'white' }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Created by {item.creator_name}
                    </Typography>
                    <Typography
                      sx={{ color: 'white' }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Owned by {item.owner_name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ItemList;
