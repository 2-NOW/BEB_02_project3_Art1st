import { useState, forwardRef, SyntheticEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { loginSuccessState } from '@/store/status';
import { signUpSuccessState } from '@/store/status';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarProps {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

function SnackbarAlert({ message, severity }: SnackbarProps) {
  const [open, setOpen] = useState(true);
  // const setIsLoginSuccess = useSetRecoilState(loginSuccessState);
  const setIsSignUpSuccess = useSetRecoilState(signUpSuccessState);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    // setIsLoginSuccess(false);
    setIsSignUpSuccess(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarAlert;
