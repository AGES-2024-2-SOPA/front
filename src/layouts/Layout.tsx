import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <main className='font-poppins'>
      <Outlet />
    </main>
  );
};

export default Layout;