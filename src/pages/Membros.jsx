import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

import MemberTable from '../components/crud/MemberTable';
import MemberForm from '../components/crud/MemberForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

import '../assets/styles/Membros.css';

const Membros = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3001/members');
        if (!response.ok) {
          throw new Error('Falha na resposta da rede.');
        }
        const data = await response.json();
        setMembers(data);
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os dados dos membros. Verifique se o servidor da API (json-server) está rodando.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleSave = (member) => { /* ...código existente... */ };
  const handleEdit = (member) => { /* ...código existente... */ };
  const handleDelete = (id) => { /* ...código existente... */ };
  const showForm = () => { /* ...código existente... */ };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) { return <LoadingSpinner />; }
  if (error) { return <ErrorMessage message={error} />; }

  return (
    // O JSX não muda, apenas a origem dos dados que ele renderiza
    <div className="membros-page">
      <Toaster position="bottom-right" />
      <div className="page-header">
        <h1>Gestão de Usuários</h1>
        <div className="header-actions">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={showForm}>
            <FiPlusCircle /> Adicionar Usuário
          </button>
        </div>
      </div>
      {isFormVisible && (
        <MemberForm
          onSave={handleSave}
          onCancel={() => setIsFormVisible(false)}
          member={editingMember}
        />
      )}
      <MemberTable
        members={filteredMembers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Membros;