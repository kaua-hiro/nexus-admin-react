import React, { useState, useEffect, useMemo } from 'react';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

// Componentes
import MemberTable from '../components/crud/MemberTable';
import MemberForm from '../components/crud/MemberForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
// A CORREÇÃO ESTÁ AQUI: O caminho correto é 'components/common'
import ErrorMessage from '../components/common/ErrorMessage';
import Pagination from '../components/common/Pagination';

// Estilos
import '../assets/styles/Membros.css';

const API_URL = 'https://my-json-server.typicode.com/kaua-hiro/nexus-api-data/members';
const ITEMS_PER_PAGE = 5;

const Membros = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Falha na resposta da rede.');
        }
        const data = await response.json();
        setMembers(data);
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os dados. Verifique se a API está no ar.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleSave = async (memberData) => {
    if (!memberData.id) {
        try {
            const newMemberPayload = {
                ...memberData,
                id: Date.now(),
                joinDate: new Date().toISOString().split('T')[0]
            };
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMemberPayload),
            });
            if (!response.ok) throw new Error("Falha ao adicionar utilizador.");
            const newMember = await response.json();
            setMembers(prevMembers => [...prevMembers, newMember]);
            toast.success("Utilizador adicionado com sucesso!");
        } catch (error) {
            toast.error("Não foi possível adicionar o utilizador.");
        }
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
          try {
              const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
              if (!response.ok) throw new Error("Falha ao apagar utilizador.");
              setMembers(prevMembers => prevMembers.filter(m => m.id !== id));
              toast.success("Utilizador excluído com sucesso!");
          } catch (error) {
              toast.error("Não foi possível excluir o utilizador.");
          }
      }
  };

  const processedMembers = useMemo(() => {
    let processableMembers = [...members];
    if (searchTerm) {
      processableMembers = processableMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig.key) {
      processableMembers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return processableMembers;
  }, [members, searchTerm, sortConfig]);

  const totalPages = Math.ceil(processedMembers.length / ITEMS_PER_PAGE);
  const currentTableData = processedMembers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const handleEdit = (member) => {
    setEditingMember(member);
    setIsFormVisible(true);
  };

  const showForm = () => {
    setEditingMember(null);
    setIsFormVisible(true);
  };

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
        members={currentTableData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Membros;