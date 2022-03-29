import Card from '@mui/material/Card';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

function index() {
  return (
    <Card sx={{ mt: '13vh' }} elevation={2}>
      <CommentInput />
      <CommentList />
    </Card>
  );
}

export default index;
