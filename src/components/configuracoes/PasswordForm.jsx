import React from 'react';

const PasswordForm = () => {
  return (
    <div className="settings-card password-section">
      <div className="card-header">
        <h3>Segurança</h3>
        <p>Mantenha sua senha atualizada.</p>
      </div>
      <div className="card-body">
        <div className="form-group-modern" style={{ marginBottom: '1.5rem' }}>
          <label>Senha Atual</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <div className="form-group-modern" style={{ marginBottom: '1.5rem' }}>
          <label>Nova Senha</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <div className="form-group-modern">
          <label>Confirmar Nova Senha</label>
          <input type="password" placeholder="••••••••" />
        </div>
      </div>
      <div className="card-footer">
        <button className="btn btn-secondary">Atualizar Senha</button>
      </div>
    </div>
  );
};

export default PasswordForm;