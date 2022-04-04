import { useState, FormEvent, ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PwInput from './PwInput';

import { postUserSignup, postUserLogin } from '@/api/user/post';
import { successState, errorState } from '@/store/status';

import Alert from '@/components/Alert';

interface InputFormProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  setOpenModal: (value: boolean) => void;
}

const loginButtonCss = {
  m: '3rem 0 auto auto',
  width: '100%',
  height: '2.3rem',
};

function InputForm({ isLogin, setIsLogin, setOpenModal }: InputFormProps) {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const setSuccessState = useSetRecoilState(successState);
  const setErrorState = useSetRecoilState(errorState);

  const {
    mutate: signUpMutate,
    isSuccess: signUpIsSuccess,
    isLoading: signUpIsLoading,
  } = useMutation(postUserSignup);

  const {
    mutate: loginMutate,
    isSuccess: loginIsSuccess,
    isLoading: loginIsLoading,
  } = useMutation(postUserLogin);

  const handleIdChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setUserId(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userId && password) {
      if (isLogin)
        loginMutate(
          { user_id: userId, user_pw: password },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(['user', 'islogin']);
              setSuccessState(true);
            },
            onError: () => setErrorState(true),
          }
        );
      else if (checked)
        signUpMutate(
          { user_id: userId, user_pw: password },
          {
            onSuccess: () => {
              setIsLogin(true);
              setUserId('');
              setPassword('');
              setChecked(false);
              setSuccessState(true);
            },
            onError: () => {
              setUserId('');
              setPassword('');
              setChecked(false);
              setErrorState(true);
            },
          }
        );
    } else setAlertError(true);
  };

  const handleAgree = (e: ChangeEvent<HTMLInputElement>) =>
    setChecked(e.target.checked);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setUserId('');
    setPassword('');
    setChecked(false);
  };

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
          value={userId}
        />
      </FormControl>

      <PwInput password={password} setPassword={setPassword} />

      {!isLogin && (
        <FormControlLabel
          sx={{ mt: '1rem' }}
          control={
            <Checkbox
              checked={checked}
              onChange={handleAgree}
              color="primary"
            />
          }
          label="I agree to the terms and conditions."
        />
      )}

      <Button sx={loginButtonCss} type="submit" variant="contained">
        {isLogin ? 'Login' : 'Sign up'}
      </Button>

      <Button
        sx={{ mt: '1rem' }}
        type="button"
        onClick={handleSwitch}
        variant="text"
      >
        {isLogin ? 'Create new account?' : 'Already have an account?'}
      </Button>
      <Alert
        open={alertError}
        setOpen={setAlertError}
        message="check all inputs !"
        severity="error"
      />
    </Box>
  );
}

export default InputForm;
