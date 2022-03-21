import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    mode: 'light',
  },
});

export default lightTheme;
