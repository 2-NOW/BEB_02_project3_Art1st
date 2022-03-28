import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

function Description() {
  return (
    <FormControl sx={{ mt: '7vh' }}>
      <TextField
        multiline
        minRows={5}
        maxRows={8}
        variant="standard"
        placeholder="Describe your Artwork"
        InputProps={{ style: { fontSize: '1.3rem' } }}
      />
    </FormControl>
  );
}

export default Description;
