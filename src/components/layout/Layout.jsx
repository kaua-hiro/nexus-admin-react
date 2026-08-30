import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const closeSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="layout-container">
      <Toaster position="bottom-right" />
      <Sidebar isOpen={isMobileSidebarOpen} onClose={closeSidebar} />
      <div className="main-content">
        <Header onMenuClick={toggleSidebar} />
        <main className="page-content">
          {children}
          <Outlet />
        </main>
      </div>
      {isMobileSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </div>
  );
};

export default Layout;