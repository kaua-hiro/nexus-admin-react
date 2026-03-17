import React, { useState } from 'react';

const PreferencesForm = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);

  return (
    <div className="settings-card preferences-section">
      <div className="card-header">
        <h3>Preferências do Sistema</h3>
        <p>Gerencie como o Nexus se comunica com você.</p>
      </div>
      <div className="card-body">
        
        <div className="preference-item">
          <div className="pref-info">
            <h4>Notificações por E-mail</h4>
            <p>Receba alertas sobre atividades importantes na sua conta.</p>
          </div>
          <div className={`toggle-switch ${emailNotif ? 'active' : ''}`} onClick={() => setEmailNotif(!emailNotif)}>
            <div className="toggle-knob"></div>
          </div>
        </div>

        <div className="preference-item">
          <div className="pref-info">
            <h4>Autenticação em 2 Fatores (2FA)</h4>
            <p>Adicione uma camada extra de segurança usando o Google Authenticator.</p>
          </div>
          <div className={`toggle-switch ${twoFactor ? 'active' : ''}`} onClick={() => setTwoFactor(!twoFactor)}>
            <div className="toggle-knob"></div>
          </div>
        </div>

        <div className="preference-item">
          <div className="pref-info">
            <h4>Relatórios Semanais</h4>
            <p>Receba um resumo de desempenho do dashboard toda segunda-feira.</p>
          </div>
          <div className={`toggle-switch ${weeklyReport ? 'active' : ''}`} onClick={() => setWeeklyReport(!weeklyReport)}>
            <div className="toggle-knob"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PreferencesForm;