import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

// Componentes
import MemberTable from '../components/crud/MemberTable';
import MemberForm from '../components/crud/MemberForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

// Estilos
import '../assets/styles/Membros.css';

// URL da nossa API pública
const API_URL = 'https://my-json-server.typicode.com/kaua-hiro/nexus-api-data/members';

const Membros = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Busca inicial de dados (já estava correta)
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha na resposta da rede.');
        const data = await response.json();
        setMembers(data);
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os dados. Verifique a sua ligação à internet.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, []);

const handleSave = async (memberData) => {
    // Adicionar novo membro (POST)
    if (!memberData.id) {
      try {
        // AQUI ESTÁ A CORREÇÃO: Adicionamos a data de inscrição ao novo utilizador
        const newMemberPayload = {
          ...memberData,
          id: Date.now(), // Adiciona um ID temporário
          joinDate: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
        };

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newMemberPayload),
        });
        if (!response.ok) throw new Error("Falha ao adicionar utilizador.");
        
        const newMember = await response.json();
        
        // Atualiza o estado local para a UI reagir instantaneamente
        setMembers(prevMembers => [...prevMembers, newMember]);
        toast.success("Utilizador adicionado com sucesso!");

      } catch (error) {
        toast.error("Não foi possível adicionar o utilizador.");
      }
    
    // Atualizar membro existente (PUT)
    } else {
      try {
        const response = await fetch(`${API_URL}/${memberData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(memberData),
        });
        if (!response.ok) throw new Error("Falha ao atualizar utilizador.");
        const updatedMember = await response.json();

        setMembers(prevMembers => 
          prevMembers.map(m => (m.id === updatedMember.id ? updatedMember : m))
        );
        toast.success("Utilizador atualizado com sucesso!");

      } catch (error) {
        toast.error("Não foi possível atualizar o utilizador.");
      }
    }
    
    setIsFormVisible(false);
    setEditingMember(null);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("Tem a certeza de que deseja excluir este utilizador?")) {
      // 3. APAGAR MEMBRO (DELETE)
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error("Falha ao apagar membro.");

        // Atualiza o estado local
        setMembers(prevMembers => prevMembers.filter(m => m.id !== id));
        toast.success("Utilizador excluído com sucesso!");

      } catch (error) {
        toast.error("Não foi possível excluir o utilizador.");
      }
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setIsFormVisible(true);
  };
  
  const showForm = () => {
    setEditingMember(null);
    setIsFormVisible(true);
  };

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
        <h1>Gestão de Utilizadores</h1>
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
            <FiPlusCircle /> Adicionar Utilizador
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