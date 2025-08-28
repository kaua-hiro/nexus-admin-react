import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiUsers, FiSettings, FiClipboard, FiCalendar, FiFileText } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <nav className="sidebar" aria-label="Navegação Principal">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Nexus</h1>
      </div>
      <div className="sidebar-nav">
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
        <NavLink to="/relatorios" className="sidebar-link">
          <FiFileText />
          <span>Relatórios</span>
        </NavLink>
        <NavLink to="/configuracoes" className="sidebar-link">
          <FiSettings />
          <span>{t('sidebar.settings')}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;