import { useState, FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';

import { postArtworkComment } from '@/api/artwork/post';

function CommentInput({ id }: { id: string | string[] | undefined }) {
  const [content, setComment] = useState('');
  const queryClient = useQueryClient();
  const commentMutation = useMutation(postArtworkComment);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commentMutation.mutate(
      { id, content },
      {
        onSuccess: () => {
          setComment('');
          queryClient.invalidateQueries(['comment', id]);
          queryClient.invalidateQueries(['user', 'islogin']);
        },
      }
    );
  };
  return (
    <Box
      sx={{ position: 'relative', p: '2rem' }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        value={content}
        onChange={(e) => setComment(e.target.value)}
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
