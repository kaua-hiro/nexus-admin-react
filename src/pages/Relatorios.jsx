import React, { useState, useEffect } from 'react';
// 1. ADICIONE A IMPORTAÇÃO DOS ÍCONES QUE VAMOS USAR
import { FiPrinter, FiDownload, FiUsers, FiCalendar, FiHeart, FiDollarSign } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { generateDashboardData } from '../data/mockData';
import StatsCard from '../components/dashboard/StatsCard';
import '../assets/styles/Relatorios.css';

const Relatorios = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const data = generateDashboardData('30d');
    setStats(data.stats);
  }, []);


  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const input = document.getElementById('report-content');

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('relatorio-nexus-dashboard.pdf');
      });
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

      <div id="report-content" className="report-content">
        <header className="report-header">
          <h2>Nexus Dashboard - Relatório de Atividade</h2>
          <p>Gerado por: {user?.name || 'Admin'}</p>
          <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
        </header>

        <section className="report-section">
          <h3>Resumo dos Últimos 30 Dias</h3>
          <div className="report-stats-grid">
            {/* 2. PASSE A PROP "icon" PARA CADA STATSCARD */}
            <StatsCard icon={<FiUsers />} title="Novos Usuários" value={stats.newUsers?.value} />
            <StatsCard icon={<FiCalendar />} title="Tarefas Concluídas" value={stats.tasksCompleted?.value} />
            <StatsCard icon={<FiHeart />} title="Projetos Ativos" value={stats.activeProjects?.value} />
            <StatsCard icon={<FiDollarSign />} title="Receita (Período)" value={stats.revenue?.value} />
          </div>
        </section>

         <footer className="report-footer">
            <p>© {new Date().getFullYear()} Nexus Dashboard</p>
        </footer>
      </div>
    </div>
  );
};

export default Relatorios;