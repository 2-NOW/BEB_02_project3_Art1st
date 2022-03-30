import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';

function Title() {
  return (
    <FormControl>
      <Input
        sx={{ pl: '0.3rem', fontSize: '2rem' }}
        placeholder="Name of Artwork"
      />
    </FormControl>
  );
}

export default Title;
