import { useState, FormEvent, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

import PwInput from './PwInput';

interface InputFormProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const loginButtonCss = {
  m: '3rem 0 auto auto',
  width: '100%',
  height: '2.3rem',
};

function InputForm({ isLogin, setIsLogin }: InputFormProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const handleIdChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setId(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAgree = (e: ChangeEvent<HTMLInputElement>) =>
    setChecked(e.target.checked);

  const handleSwitch = () => setIsLogin(!isLogin);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      component="form"
      onSubmit={handleSubmit}
    >
      <FormControl sx={{ mt: '2rem' }}>
        <TextField
          variant="standard"
          label="Id"
          onChange={handleIdChange}
          value={id}
        />
      </FormControl>

      <PwInput password={password} setPassword={setPassword} />

      {!isLogin && (
        <FormControlLabel
          sx={{ mt: '1rem' }}
          control={<Checkbox onChange={handleAgree} color="primary" />}
          label="I agree to the terms and conditions."
        />
      )}

      <Button sx={loginButtonCss} type="submit" variant="contained">
        {isLogin ? 'Login' : 'SignIn'}
      </Button>

      <Button sx={{ mt: '1rem' }} onClick={handleSwitch} variant="text">
        {isLogin ? 'Create new account?' : 'Already have an account?'}
      </Button>
    </Box>
  );
}

export default InputForm;
