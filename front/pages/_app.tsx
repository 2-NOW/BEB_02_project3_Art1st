import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '@/utils/reactQuery/queryClient';
import lightTheme from 'src/theme/lightTheme';
import '../styles/globals.css';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={lightTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
