import React, { useState } from 'react';
import ProfileForm from '../components/configuracoes/ProfileForm';
import PasswordForm from '../components/configuracoes/PasswordForm';
import SocialAccounts from '../components/configuracoes/SocialAccounts';
import PreferencesForm from '../components/configuracoes/PreferencesForm';
import TeamForm from '../components/configuracoes/TeamForm';
import BillingForm from '../components/configuracoes/BillingForm';
import { FiAlertTriangle, FiUser, FiUsers, FiCreditCard } from 'react-icons/fi';
import '../assets/styles/Configuracoes.css';

const TABS = [
  { key: 'perfil', label: 'Perfil & Conta', icon: <FiUser /> },
  { key: 'equipe', label: 'Equipe & Permissões', icon: <FiUsers /> },
  { key: 'plano', label: 'Plano & Faturamento', icon: <FiCreditCard /> },
];

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState('perfil');

  return (
    <div className="config-page">
      <div className="config-header">
        <h1 className="page-title">Configurações</h1>
        <p>Gerencie seus dados pessoais, a equipe do workspace e o plano contratado.</p>
      </div>

      <div className="config-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`config-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'perfil' && (
        <div className="settings-layout">
          <ProfileForm />
          <PasswordForm />
          <PreferencesForm />
          <SocialAccounts />
        </div>
      )}

      {activeTab === 'equipe' && (
        <div className="settings-layout settings-layout--single">
          <TeamForm />
        </div>
      )}

      {activeTab === 'plano' && (
        <div className="settings-layout settings-layout--single">
          <BillingForm />
        </div>
      )}

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
