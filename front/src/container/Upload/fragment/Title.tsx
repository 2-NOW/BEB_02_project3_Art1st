import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';

interface TitleProps {
  title: string;
  setTitle: (title: string) => void;
}

function Title({ title, setTitle }: TitleProps) {
  return (
    <FormControl>
      <Input
        sx={{ pl: '0.3rem', fontSize: '2rem' }}
        placeholder="Name of Artwork"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </FormControl>
  );
}

export default Title;
