import React, { useState, useEffect } from 'react';
import { FiX, FiUser, FiMail, FiBriefcase, FiSave } from 'react-icons/fi'; // Adicionamos ícones
import './MemberForm.css'; // <--- IMPORTAÇÃO CRUCIAL DO CSS NOVO

const MemberForm = ({ onSave, onCancel, member }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Ativo',
  });

  useEffect(() => {
    if (member) {
      setFormData(member);
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    // Nova estrutura de overlay para o modal
    <div className="form-overlay" onClick={onCancel}>
      {/* Impede que o clique dentro do formulário feche o modal */}
      <form className="member-form-card" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        
        <div className="form-header">
          <h2>{member ? 'Editar Membro' : 'Adicionar Membro'}</h2>
          <button type="button" className="close-form-btn" onClick={onCancel}>
            <FiX size={20} />
          </button>
        </div>

        <div className="form-body">
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: João Silva"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail Corporativo</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex: joao.silva@nexuscorp.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Cargo / Função</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Ex: Desenvolvedor Senior"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status da Conta</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>

        <div className="form-footer">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            <FiSave />
            {member ? 'Salvar Alterações' : 'Confirmar Registo'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;