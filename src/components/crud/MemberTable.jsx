import React from 'react';
import { FiEdit, FiTrash2, FiChevronUp, FiChevronDown } from 'react-icons/fi';

const MemberTable = ({ members, onEdit, onDelete, onSort, sortConfig }) => {
  // Função para renderizar o ícone de ordenação
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? <FiChevronUp /> : <FiChevronDown />;
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {/* Cabeçalhos agora são clicáveis */}
            <th onClick={() => onSort('name')}>
              Nome {renderSortIcon('name')}
            </th>
            <th onClick={() => onSort('email')}>
              Email {renderSortIcon('email')}
            </th>
            <th onClick={() => onSort('joinDate')}>
              Data de Inscrição {renderSortIcon('joinDate')}
            </th>
            <th onClick={() => onSort('status')}>
              Status {renderSortIcon('status')}
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{new Date(member.joinDate).toLocaleDateString()}</td>
              <td>
                <span className={`status status-${member.status.toLowerCase()}`}>
                  {member.status}
                </span>
              </td>
              <td className="actions">
                <button onClick={() => onEdit(member)} className="icon-btn">
                  <FiEdit />
                </button>
                <button onClick={() => onDelete(member.id)} className="icon-btn icon-btn-danger">
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