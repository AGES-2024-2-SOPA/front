// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet será usado para renderizar as páginas dentro do layout

const Layout: React.FC = () => {
  return (
    <main className='font-poppins'>
      <Outlet />
    </main>
  );
};

export default Layout;