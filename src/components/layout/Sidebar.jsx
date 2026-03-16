import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiSettings, FiLogOut, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

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
          <FiHome /> Dashboard
        </NavLink>
        <NavLink to="/membros" className="nav-item" onClick={onClose}>
          <FiUsers /> Membros
        </NavLink>
        <NavLink to="/configuracoes" className="nav-item" onClick={onClose}>
          <FiSettings /> Configurações
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button className="nav-item logout-btn" onClick={logout}>
          <FiLogOut /> Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;