import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import data from '@/data/index';

function CommentList() {
  const testComment =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus nisi quos, dolorum corrupti voluptate! Hic dicta quo nihil eligendi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus nisi quos, dolorum corrupti voluptate! Hic dicta quo nihil eligendi?';

  const testCommentList = [
    {
      writer: { image: data[39], name: 'test' },
      content: testComment,
      createdAt: '2020.01.01',
    },
    {
      writer: { image: data[25], name: 'test3' },
      content: testComment,
      createdAt: '2020.01.01',
    },
    {
      writer: { image: data[5], name: 'test2' },
      content: testComment,
      createdAt: '2020.01.01',
    },
  ];

  return (
    <Box sx={{ p: '0 1rem 0 1rem' }}>
      {testCommentList.map((comment, index) => {
        return (
          <Box sx={{ mt: '1rem' }} key={index}>
            <CardHeader
              avatar={<Avatar src={comment.writer.image} />}
              title={
                <Typography variant="body1">{comment.writer.name}</Typography>
              }
              subheader={comment.createdAt}
            />
            <CardContent sx={{ mt: '-1rem', mb: '1rem' }}>
              <Typography variant="body1" component="p">
                {comment.content}
              </Typography>
            </CardContent>
            {testCommentList.length - 1 !== index && <Divider />}
          </Box>
        );
      })}
    </Box>
  );
}

export default CommentList;
