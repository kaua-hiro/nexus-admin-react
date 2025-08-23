import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiUsers, FiSettings, FiClipboard, FiCalendar } from 'react-icons/fi';
import { useTranslation } from 'react-i18next'; // 1. Importe o hook
import './Sidebar.css';

const Sidebar = () => {
  const { t } = useTranslation(); // 2. Inicialize o hook

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Nexus</h1>
      </div>
      <nav className="sidebar-nav">
        {/* 3. Substitua o texto fixo pelas chaves de tradução */}
        <NavLink to="/" className="sidebar-link">
          <FiGrid />
          <span>{t('sidebar.dashboard')}</span>
        </NavLink>
        <NavLink to="/membros" className="sidebar-link">
          <FiUsers />
          <span>{t('sidebar.users')}</span>
        </NavLink>
        <NavLink to="/projetos" className="sidebar-link">
          <FiClipboard />
          <span>{t('sidebar.projects')}</span>
        </NavLink>
        <NavLink to="/calendario" className="sidebar-link">
          <FiCalendar />
          <span>{t('sidebar.calendar')}</span>
        </NavLink>
        <NavLink to="/configuracoes" className="sidebar-link">
          <FiSettings />
          <span>{t('sidebar.settings')}</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;