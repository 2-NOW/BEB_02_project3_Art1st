import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Favorite from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

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
  // todo: owner, 판매중인 작품은 price 추가
  // todo: click 시 작품 상세페이지 Link 추가
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

  const iconCss = {
    fontSize: '1rem',
  };

  return (
    <Box sx={{ width: '70vw', m: '2rem 15vw 15vh 15vw' }}>
      <Grid container>
        {data.map((item) => {
          const {
            artwork_id,
            title,
            ipfsURI,
            is_selling,
            price,
            views,
            like_count,
            comment_count,
            creator_name,
            owner_name,
          } = item;
          return (
            <Grid item xl={6} xs={12}>
              <Card elevation={12} sx={imageCss}>
                <CardMedia
                  sx={{ position: 'absolute' }}
                  component="img"
                  height="100%"
                  image={ipfsURI}
                />
                <Link href={`/artwork/${artwork_id}`}>
                  <a>
                    <CardActionArea sx={contentCss}>
                      <CardContent sx={{ position: 'absolute', bottom: '0' }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {title}
                        </Typography>
                        <Typography
                          sx={{ color: 'white' }}
                          variant="body1"
                          color="text.secondary"
                        >
                          {creator_name}
                        </Typography>
                        <Box sx={{ display: 'flex', mt: '3vh' }}>
                          <Favorite sx={iconCss} />
                          <Typography
                            sx={{ m: '0 1rem 0 0.3rem' }}
                            variant="body2"
                            component="div"
                          >
                            {like_count}
                          </Typography>

                          <ChatIcon sx={iconCss} />
                          <Typography
                            sx={{ m: '0 1rem 0 0.3rem' }}
                            variant="body2"
                            component="div"
                          >
                            {comment_count}
                          </Typography>

                          <VisibilityIcon sx={iconCss} />
                          <Typography
                            sx={{ m: '0 1rem 0 0.3rem' }}
                            variant="body2"
                            component="div"
                          >
                            {views}
                          </Typography>
                        </Box>
                      </CardContent>
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

export default ItemList;
