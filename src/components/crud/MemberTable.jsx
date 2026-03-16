import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const MemberTable = ({ members, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="members-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td data-label="Nome">{member.name}</td>
              <td data-label="Email">{member.email}</td>
              <td data-label="Status">
                <span className={`status-badge ${member.status.toLowerCase()}`}>
                  {member.status}
                </span>
              </td>
              <td data-label="Ações" className="actions-cell">
                <button className="icon-btn edit-btn" onClick={() => onEdit(member)}>
                  <FiEdit2 />
                </button>
                <button className="icon-btn delete-btn" onClick={() => onDelete(member.id)}>
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;