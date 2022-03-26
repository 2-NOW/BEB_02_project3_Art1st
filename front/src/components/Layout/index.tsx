import { css } from '@emotion/react';

import Navbar from './Navbar/index';
import Footer from './Footer';

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
  return (
    <div css={wrapper}>
      <Navbar />
      <div className="children">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
