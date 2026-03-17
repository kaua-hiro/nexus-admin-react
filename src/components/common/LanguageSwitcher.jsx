import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Garante que não dê erro se o i18n ainda estiver carregando
  const currentLang = i18n.language || 'pt';
  const isEnglish = currentLang.startsWith('en');

  const toggleLanguage = () => {
    const newLang = isEnglish ? 'pt' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      className="lang-toggle-modern" 
      onClick={toggleLanguage} 
      title="Alternar Idioma"
    >
      <div className="lang-track">
        <span className={`lang-text ${!isEnglish ? 'active' : ''}`}>PT</span>
        <span className={`lang-text ${isEnglish ? 'active' : ''}`}>EN</span>
        {/* A bolinha de fundo que desliza */}
        <div className={`lang-thumb ${isEnglish ? 'slide-en' : 'slide-pt'}`}></div>
      </div>
    </button>
  );
};

export default LanguageSwitcher;