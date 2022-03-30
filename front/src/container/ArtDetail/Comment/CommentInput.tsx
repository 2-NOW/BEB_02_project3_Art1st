import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import SendIcon from '@mui/icons-material/Send';

function CommentInput() {
  return (
    <Box sx={{ position: 'relative', p: '2rem' }} component="form">
      <TextField
        fullWidth
        multiline
        minRows={5}
        variant="standard"
        placeholder="Type your comment here..."
      />

      <Button
        sx={{ position: 'absolute', right: '2rem', bottom: '2.5rem' }}
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
      >
        SEND
      </Button>
    </Box>
  );
}

export default CommentInput;
