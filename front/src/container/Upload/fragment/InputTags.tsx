import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Divider from '@mui/material/Divider';

function InputTags() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState('');

  const handleDelete = (removeIndex: number) => {
    setTags([...tags.filter((_, index) => index !== removeIndex)]);
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTagText(e.target.value);
  };

  const addTags = (tagText: string) => {
    if (tags.length < 10) {
      setTags([...tags, tagText]);
      setTagText('');
    }
  };

  return (
    <FormControl sx={{ mt: '4vh' }}>
      <Box>
        {tags.map((text, index) => {
          return (
            <Chip
              sx={{ m: '0.5rem 0.5rem auto 0', fontSize: '1rem' }}
              key={index}
              label={text}
              variant="outlined"
              onDelete={() => handleDelete(index)}
            />
          );
        })}
        {tags.length < 10 && (
          <TextField
            sx={{ mt: '0.6rem' }}
            variant="standard"
            value={tagText}
            onChange={handleOnChange}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && tagText) addTags(tagText);
            }}
            placeholder="Press enter to add tags"
            aria-describedby="input-tags"
            InputProps={{
              disableUnderline: true,
            }}
          />
        )}
      </Box>
      <Divider sx={{ mt: '0.5rem' }} />
      {tags.length === 10 && (
        <FormHelperText id="input-tags" error>
          Max number of tags is 10
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default InputTags;
