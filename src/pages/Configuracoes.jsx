import React from 'react';
import ProfileForm from '../components/configuracoes/ProfileForm';
import PasswordForm from '../components/configuracoes/PasswordForm';
import SocialAccounts from '../components/configuracoes/SocialAccounts';
import '../assets/styles/Configuracoes.css';

const Configuracoes = () => {
  return (
    <div>
      <h1 className="page-title">Configurações da Conta</h1>

      <div className="settings-grid">
        {}
        <SocialAccounts />
        <ProfileForm />
        <PasswordForm />
      </div>
    </div>
  );
};

export default Configuracoes;