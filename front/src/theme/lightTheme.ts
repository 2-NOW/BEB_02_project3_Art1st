import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    mode: 'light',
  },
});

export default lightTheme;
