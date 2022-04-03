import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Navbar from './Navbar/index';
import Footer from './Footer';
import Alert from '@/components/Alert';
import { loginSuccessState, signUpSuccessState } from '@/store/status';

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
  const isSignUpSuccess = useRecoilValue(signUpSuccessState);

  return (
    <div css={wrapper}>
      <Navbar />
      <div className="children">{children}</div>
      {isSignUpSuccess && (
        <Alert message="Success to Signup" severity="success" />
      )}
      <Footer />
    </div>
  );
}

export default Layout;
