import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome, FiUsers, FiSettings, FiLogOut, FiX,
  FiTrello, FiCalendar, FiBarChart2, FiActivity, FiZap,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Nexus</h1>
        <button className="close-sidebar-btn" onClick={onClose}>
          <FiX size={24} />
        </button>
      </div>
      <nav className="sidebar-nav">
        <span className="nav-section-label">{t('sidebar.section_workspace')}</span>
        <NavLink to="/" className="nav-item" end onClick={onClose}>
          <FiHome /> {t('sidebar.dashboard')}
        </NavLink>
        <NavLink to="/membros" className="nav-item" onClick={onClose}>
          <FiUsers /> {t('sidebar.users')}
        </NavLink>
        <NavLink to="/projetos" className="nav-item" onClick={onClose}>
          <FiTrello /> {t('sidebar.projects')}
        </NavLink>
        <NavLink to="/calendario" className="nav-item" onClick={onClose}>
          <FiCalendar /> {t('sidebar.calendar')}
        </NavLink>
        <NavLink to="/relatorios" className="nav-item" onClick={onClose}>
          <FiBarChart2 /> {t('sidebar.reports')}
        </NavLink>
        <NavLink to="/atividades" className="nav-item" onClick={onClose}>
          <FiActivity /> {t('sidebar.activity')}
        </NavLink>

        <span className="nav-section-label">{t('sidebar.section_account')}</span>
        <NavLink to="/configuracoes" className="nav-item" onClick={onClose}>
          <FiSettings /> {t('sidebar.settings')}
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <div className="plan-badge">
          <FiZap /> {t('sidebar.plan_label')}
        </div>
        <button className="logout-btn" onClick={logout}>
          <FiLogOut /> {t('header.logout')}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;