import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiMenu, FiBell, FiUser, FiSun, FiMoon, FiSearch,
  FiHome, FiUsers, FiTrello, FiCalendar, FiBarChart2, FiActivity, FiSettings, FiCheck,
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { initialNotifications } from '../../data/notificationData';
import LanguageSwitcher from '../common/LanguageSwitcher';
import './Header.css';

const QUICK_LINKS = [
  { label: 'Dashboard', path: '/', icon: <FiHome /> },
  { label: 'Membros', path: '/membros', icon: <FiUsers /> },
  { label: 'Projetos', path: '/projetos', icon: <FiTrello /> },
  { label: 'Calendário', path: '/calendario', icon: <FiCalendar /> },
  { label: 'Relatórios', path: '/relatorios', icon: <FiBarChart2 /> },
  { label: 'Atividades', path: '/atividades', icon: <FiActivity /> },
  { label: 'Configurações', path: '/configuracoes', icon: <FiSettings /> },
];

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('nexus-theme') || 'dark');
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const notifRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nexus-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredLinks = QUICK_LINKS.filter(link =>
    link.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goTo = (path) => {
    navigate(path);
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  const initials = (user?.name || 'Admin').slice(0, 2).toUpperCase();

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={onMenuClick}>
          <FiMenu size={24} />
        </button>

        <div className="header-search" ref={searchRef}>
          <FiSearch className="header-search-icon" />
          <input
            type="text"
            className="header-search-input"
            placeholder="Buscar páginas... (ex: relatórios)"
            value={searchTerm}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => { setSearchTerm(e.target.value); setIsSearchOpen(true); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && filteredLinks.length > 0) goTo(filteredLinks[0].path);
              if (e.key === 'Escape') setIsSearchOpen(false);
            }}
          />
          {isSearchOpen && (
            <div className="header-search-results">
              {filteredLinks.length === 0 && (
                <div className="search-empty">Nenhuma página encontrada.</div>
              )}
              {filteredLinks.map(link => (
                <button key={link.path} className="search-result-item" onClick={() => goTo(link.path)}>
                  {link.icon} {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="header-right">
        <LanguageSwitcher />

        <button
          className="theme-toggle-modern"
          onClick={toggleTheme}
          title="Alternar Tema"
        >
          <div className={`theme-icon-wrapper ${theme}`}>
            {theme === 'light' ? <FiMoon size={16} /> : <FiSun size={16} />}
          </div>
        </button>

        <div className="notif-wrapper" ref={notifRef}>
          <button
            className="icon-btn notification-btn"
            title="Notificações"
            onClick={() => setIsNotifOpen(prev => !prev)}
          >
            <FiBell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {isNotifOpen && (
            <div className="notif-dropdown">
              <div className="notif-dropdown-header">
                <h4>Notificações</h4>
                {unreadCount > 0 && (
                  <button className="mark-read-btn" onClick={markAllAsRead}>
                    <FiCheck size={14} /> Marcar todas como lidas
                  </button>
                )}
              </div>
              <div className="notif-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notif-item ${n.read ? '' : 'unread'}`}>
                    <span className="notif-dot" />
                    <div>
                      <p className="notif-title">{n.title}</p>
                      <p className="notif-desc">{n.description}</p>
                      <span className="notif-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="user-profile">
          <div className="avatar">
            {user?.name ? initials : <FiUser size={20} />}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Admin'}</span>
            <span className="user-role">Superuser</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
