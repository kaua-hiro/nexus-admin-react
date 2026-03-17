import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiSettings, FiLogOut, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next'; // 1. Importamos a ferramenta de tradução
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const { t } = useTranslation(); // 2. Iniciamos a função "t" (translate)

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Nexus</h1>
        <button className="close-sidebar-btn" onClick={onClose}>
          <FiX size={24} />
        </button>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" className="nav-item" end onClick={onClose}>
          {/* 3. Trocamos o texto fixo pela variável traduzida */}
          <FiHome /> {t('sidebar.dashboard')}
        </NavLink>
        <NavLink to="/membros" className="nav-item" onClick={onClose}>
          <FiUsers /> {t('sidebar.users')}
        </NavLink>
        <NavLink to="/configuracoes" className="nav-item" onClick={onClose}>
          <FiSettings /> {t('sidebar.settings')}
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          <FiLogOut /> {t('header.logout')}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;