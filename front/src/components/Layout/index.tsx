import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Navbar from './Navbar/index';
import Footer from './Footer';
import Alert from '@/components/Alert';
import { successState, errorState } from '@/store/status';

import Caver from 'caver-js';

interface LayoutProps {
  children?: React.ReactNode;
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .children {
    flex: 1;
  }
`;

function Layout({ children }: LayoutProps) {
  const [isSuccess, setIsSuccess] = useRecoilState(successState);
  const [isError, setIsError] = useRecoilState(errorState);

  return (
    <div css={wrapper}>
      <Navbar />
      <div className="children">{children}</div>
      <Alert
        open={isSuccess}
        setOpen={setIsSuccess}
        message="Success !"
        severity="success"
      />
      <Alert
        open={isError}
        setOpen={setIsError}
        message="Error !"
        severity="error"
      />
      <Footer />
    </div>
  );
}

export default Layout;
