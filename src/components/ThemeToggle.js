import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  // Função para pegar o tema inicial do localStorage ou definir 'light' como padrão
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // useEffect para aplicar o tema na tag <html> e salvar a escolha
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Função para trocar o tema
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // O botão agora tem uma classe dinâmica para o estilo
    <button
      onClick={toggleTheme}
      className={`theme-toggle-button ${theme}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        <FaSun className="icon sun" />
        <FaMoon className="icon moon" />
        <div className="toggle-thumb"></div>
      </div>
    </button>
  );
};

export default ThemeToggle;