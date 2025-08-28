import React from 'react';
import { FiPrinter, FiDownload } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext'; // Para obter o nome do utilizador
import '../assets/styles/Relatorios.css'; // Vamos criar este CSS

const Relatorios = () => {
  const { user } = useAuth();

  const handlePrint = () => {
    window.print(); // Função nativa do navegador para imprimir
  };

  const handleDownloadPdf = () => {
    // A lógica de geração do PDF virá aqui no próximo passo
    alert('Funcionalidade de download do PDF a ser implementada!');
  };

  return (
    <div className="report-page">
      <div className="report-controls no-print">
        <h1 className="page-title">Relatório de Atividade</h1>
        <div className="report-buttons">
          <button onClick={handlePrint} className="btn btn-secondary">
            <FiPrinter /> Imprimir
          </button>
          <button onClick={handleDownloadPdf} className="btn btn-primary">
            <FiDownload /> Exportar PDF
          </button>
        </div>
      </div>

      {/* Este é o conteúdo que será impresso/exportado */}
      <div id="report-content" className="report-content">
        <header className="report-header">
          <h2>Nexus Dashboard - Relatório</h2>
          <p>Gerado por: {user?.name || 'Admin'}</p>
          <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
        </header>

        <section className="report-section">
          <h3>Resumo de Estatísticas</h3>
          <p>Este relatório apresenta um resumo das atividades recentes da plataforma.</p>
          {/* Aqui iremos adicionar os dados do dashboard */}
        </section>
      </div>
    </div>
  );
};

export default Relatorios;