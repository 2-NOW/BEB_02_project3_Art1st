import { ReactNode } from 'react';

import Navbar from '@/components/Layout/Navbar/index';
import Footer from '@/components/Layout/Footer';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
