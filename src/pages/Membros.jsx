import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

// Componentes
import MemberTable from '../components/crud/MemberTable';
import MemberForm from '../components/crud/MemberForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

// Dados
import { initialMembers } from '../data/mockData';

// Estilos
import '../assets/styles/Membros.css';

const Membros = () => {
  // Estados de UI
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  
  // Estados de Dados
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulação de busca de dados
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        setMembers(initialMembers);
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os dados dos membros.");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  
  const handleSave = (member) => {
    if (!member.name.trim() || !member.email.trim()) {
      toast.error("Nome e Email são obrigatórios.");
      return;
    }

    if (member.id) {
      setMembers(members.map(m => m.id === member.id ? member : m));
      toast.success("Usuário atualizado com sucesso!");
    } else {
      const newMember = { ...member, id: Date.now() };
      setMembers([...members, newMember]);
      toast.success("Usuário adicionado com sucesso!");
    }
    setIsFormVisible(false);
    setEditingMember(null);
  };
  
  const handleEdit = (member) => {
    setEditingMember(member);
    setIsFormVisible(true);
  };
  
  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setMembers(members.filter(m => m.id !== id));
      toast.success("Usuário excluído com sucesso!");
    }
  };
  
  const showForm = () => {
      setEditingMember(null);
      setIsFormVisible(true);
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) { return <LoadingSpinner />; }
  if (error) { return <ErrorMessage message={error} />; }

  return (
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