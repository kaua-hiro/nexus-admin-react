import React, { useState, useEffect } from 'react';
import { FiMenu, FiBell, FiUser, FiSun, FiMoon } from 'react-icons/fi';
import LanguageSwitcher from '../common/LanguageSwitcher'; /* Importação do Idioma */
import './Header.css';

const Header = ({ onMenuClick }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nexus-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nexus-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={onMenuClick}>
          <FiMenu size={24} />
        </button>
      </div>

      <div className="header-right">
        {/* Seletor de Idioma lado a lado com o Tema */}
        <LanguageSwitcher />

        {/* Botão de Tema Moderno */}
        <button 
          className="theme-toggle-modern" 
          onClick={toggleTheme} 
          title="Alternar Tema"
        >
          <div className={`theme-icon-wrapper ${theme}`}>
            {theme === 'light' ? <FiMoon size={16} /> : <FiSun size={16} />}
          </div>
        </button>
        
        <button className="icon-btn notification-btn" title="Notificações">
          <FiBell size={20} />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <FiUser size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">Admin</span>
            <span className="user-role">Superuser</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;