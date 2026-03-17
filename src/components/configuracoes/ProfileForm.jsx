import React from 'react';
import { FiUser, FiUpload } from 'react-icons/fi';

const ProfileForm = () => {
  return (
    <div className="settings-card profile-section">
      <div className="card-header">
        <h3>Informações Pessoais</h3>
        <p>Atualize sua foto e detalhes de contato.</p>
      </div>
      
      <div className="card-body">
        {/* Nova Área de Avatar */}
        <div className="avatar-upload-section">
          <div className="avatar-preview">
            <FiUser />
          </div>
          <div className="avatar-actions">
            <button className="btn btn-secondary"><FiUpload /> Alterar Foto</button>
            <p>JPG, GIF ou PNG. Tamanho máximo de 2MB.</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group-modern">
            <label>Nome Completo</label>
            <input type="text" defaultValue="Admin Superuser" />
          </div>
          <div className="form-group-modern">
            <label>Email Profissional</label>
            <input type="email" defaultValue="admin@nexuscorp.com" />
          </div>
          <div className="form-group-modern">
            <label>Telefone</label>
            <input type="text" placeholder="(11) 99999-9999" />
          </div>
          <div className="form-group-modern">
            <label>Cargo / Função</label>
            <input type="text" defaultValue="Desenvolvedor Full Stack" />
          </div>
          <div className="form-group-modern full">
            <label>Endereço</label>
            <input type="text" placeholder="Ex: Av. Paulista, 1000 - São Paulo, SP" />
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <button className="btn btn-primary">Salvar Alterações</button>
      </div>
    </div>
  );
};

export default ProfileForm;