import { useState, forwardRef, SyntheticEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarProps {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  open: boolean;
  setOpen: (value: boolean) => void;
}

function SnackbarAlert({ message, severity, open, setOpen }: SnackbarProps) {
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarAlert;
