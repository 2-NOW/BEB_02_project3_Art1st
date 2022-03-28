import { useState } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Image from 'next/image';

function ForSale() {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => setIsChecked(!isChecked);

  return (
    <FormControl sx={{ mt: '4vh' }}>
      <Box sx={{ display: 'flex' }}>
        <FormControlLabel
          sx={{ width: '8rem' }}
          control={<Checkbox checked={isChecked} onChange={handleChecked} />}
          label="For sale"
        />

        <TextField
          sx={{ ml: '2rem', mt: '0.3rem', width: '30%' }}
          id="input-with-icon-textfield"
          disabled={isChecked ? false : true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Image src="/icons/ethereum.svg" width="24" height="24" />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          variant="standard"
          placeholder="Enter sales price"
        />
      </Box>
    </FormControl>
  );
}

export default ForSale;
