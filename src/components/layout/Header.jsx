// src/components/layout/Header.jsx
import React from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle'; // Verifique se este caminho está correto
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    // A estrutura original foi restaurada
    <header className="header">
      {/* Botão de Tema adicionado aqui */}
      <ThemeToggle />
      <div className="header-user">
        <FiUser />
        <span>{user?.name || 'Admin'}</span>
      </div>
      <button onClick={handleLogout} className="btn-logout">
        <FiLogOut />
        <span>Sair</span>
      </button>
    </header>
  );
};

export default Header;