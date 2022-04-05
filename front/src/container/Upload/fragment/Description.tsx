import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

interface DescriptionProps {
  description: string;
  setDescription: (description: string) => void;
}

function Description({ description, setDescription }: DescriptionProps) {
  return (
    <FormControl sx={{ mt: '7vh' }}>
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
