// src/components/layout/Header.jsx
import React from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../ThemeToggle.jsx';
import LanguageSwitcher from '../common/LanguageSwitcher.jsx';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      {/* Lado esquerdo do Header - pode ser usado para um campo de busca no futuro */}
      <div className="header-left">
        {/* Intencionalmente vazio por enquanto para empurrar o resto para a direita */}
      </div>

      {/* Lado direito do Header com todos os controles */}
      <div className="header-right">
        <LanguageSwitcher />
        <ThemeToggle />
        <div className="user-info">
          <FiUser size={18} />
          <span>{user?.name || 'Admin'}</span>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <FiLogOut size={16} />
          <span>{t('header.logout')}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;