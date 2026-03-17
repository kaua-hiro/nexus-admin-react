import React from 'react';
import ProfileForm from '../components/configuracoes/ProfileForm';
import PasswordForm from '../components/configuracoes/PasswordForm';
import SocialAccounts from '../components/configuracoes/SocialAccounts';
import PreferencesForm from '../components/configuracoes/PreferencesForm'; // NOVO COMPONENTE
import { FiAlertTriangle } from 'react-icons/fi';
import '../assets/styles/Configuracoes.css';

const Configuracoes = () => {
  return (
    <div className="config-page">
      <div className="config-header">
        <h1 className="page-title">Configurações da Conta</h1>
        <p>Gerencie seus dados pessoais, preferências de segurança e conexões.</p>
      </div>

      <div className="settings-layout">
        <ProfileForm />
        <PasswordForm />
        <PreferencesForm />
        <SocialAccounts />
      </div>

      {/* Danger Zone - Premium Detail */}
      <div className="danger-zone">
        <div>
          <h3>Desativar Conta</h3>
          <p>Ao desativar sua conta, você perderá acesso ao painel do Nexus. Esta ação é irreversível.</p>
        </div>
        <button className="btn btn-danger">
          <FiAlertTriangle /> Desativar Permanentemente
        </button>
      </div>
    </div>
  );
};

export default Configuracoes;