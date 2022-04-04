import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import data from '@/data/index';

interface ICommentData {
  id: number;
  content: string;
  createdAt: string;
  name: string;
  picture: string;
}

function CommentList({ commentData }: { commentData: ICommentData[] }) {
  return (
    <Box sx={{ p: '0 1rem 0 1rem' }}>
      {commentData.map((comment, index) => {
        const { id, content, createdAt, name, picture } = comment;

        return (
          <Box sx={{ mt: '1rem' }} key={id}>
            <CardHeader
              avatar={<Avatar src={picture} />}
              title={<Typography variant="body1">{name}</Typography>}
              subheader={createdAt}
            />
            <CardContent sx={{ mt: '-1rem', mb: '1rem' }}>
              <Typography variant="body1" component="p">
                {content}
              </Typography>
            </CardContent>
            {commentData.length - 1 !== index && <Divider />}
          </Box>
        );
      })}
    </Box>
  );
}

export default CommentList;
