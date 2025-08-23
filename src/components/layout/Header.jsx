import React from 'react';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Importe para tradução
import ThemeToggle from '../ThemeToggle';
import LanguageSwitcher from '../common/LanguageSwitcher'; // Importe o novo componente
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Inicialize para tradução

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-controls">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <div className="header-user-actions">
        <div className="header-user">
          <FiUser />
          <span>{user?.name || 'Admin'}</span>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          <FiLogOut />
          <span>{t('header.logout')}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;