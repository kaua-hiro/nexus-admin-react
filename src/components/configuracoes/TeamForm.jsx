import React, { useState } from 'react';
import { FiUserPlus, FiTrash2, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ROLES = ['Admin', 'Editor', 'Visualizador'];

const initialTeam = [
  { id: 1, name: 'Admin Superuser', email: 'admin@nexuscorp.com', role: 'Admin' },
  { id: 2, name: 'João Guerra', role: 'Editor', email: 'joao.guerra@nexuscorp.com' },
  { id: 3, name: 'Pamela Oliveira', role: 'Editor', email: 'pamela.oliveira@nexuscorp.com' },
  { id: 4, name: 'Kauã Hiro', role: 'Visualizador', email: 'kaua.hiro@nexuscorp.com' },
];

const initials = (name) => name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();

const TeamForm = () => {
  const [team, setTeam] = useState(initialTeam);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    const newMember = {
      id: Date.now(),
      name: inviteEmail.split('@')[0].replace(/[.\-_]/g, ' '),
      email: inviteEmail,
      role: 'Visualizador',
    };
    setTeam(prev => [...prev, newMember]);
    toast.success(`Convite enviado para ${inviteEmail}`);
    setInviteEmail('');
  };

  const handleRoleChange = (id, role) => {
    setTeam(prev => prev.map(m => (m.id === id ? { ...m, role } : m)));
  };

  const handleRemove = (id) => {
    setTeam(prev => prev.filter(m => m.id !== id));
    toast.success('Membro removido da equipe.');
  };

  return (
    <div className="settings-card team-section">
      <div className="card-header">
        <h3>Equipe & Permissões</h3>
        <p>Convide colegas e defina o que cada um pode fazer no workspace.</p>
      </div>

      <div className="card-body">
        <form className="invite-row" onSubmit={handleInvite}>
          <input
            type="email"
            placeholder="email@suaempresa.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <FiUserPlus /> Convidar
          </button>
        </form>

        <div className="team-list">
          {team.map(member => (
            <div key={member.id} className="team-row">
              <div className="team-row-identity">
                <div className="avatar-sm">{initials(member.name)}</div>
                <div>
                  <p className="team-name">{member.name}</p>
                  <p className="team-email">{member.email}</p>
                </div>
              </div>

              <div className="team-row-actions">
                <select
                  className="role-select"
                  value={member.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                >
                  {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
                <button className="icon-btn delete-btn" onClick={() => handleRemove(member.id)} title="Remover">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="role-legend">
          <FiShield size={14} />
          <span><strong>Admin</strong> gerencia tudo · <strong>Editor</strong> edita conteúdo · <strong>Visualizador</strong> apenas consulta</span>
        </div>
      </div>
    </div>
  );
};

export default TeamForm;
