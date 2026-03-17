import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next'; // IMPORTAMOS A TRADUÇÃO

const MemberTable = ({ members, onEdit, onDelete }) => {
  const { t } = useTranslation(); // INICIAMOS A TRADUÇÃO

  return (
    <div className="table-responsive">
      <table className="members-table">
        <thead>
          <tr>
            <th>{t('members.table_name')}</th>
            <th>{t('members.table_email')}</th>
            <th>{t('members.table_status')}</th>
            <th>{t('members.table_actions')}</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td data-label={t('members.table_name')}>{member.name}</td>
              <td data-label={t('members.table_email')}>{member.email}</td>
              <td data-label={t('members.table_status')}>
                <span className={`status-badge ${member.status.toLowerCase()}`}>
                  {member.status}
                </span>
              </td>
              <td data-label={t('members.table_actions')} className="actions-cell">
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