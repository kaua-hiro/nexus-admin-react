import React, { useState, useEffect } from 'react';
import { FiUsers, FiCalendar, FiHeart, FiDollarSign } from 'react-icons/fi';
import { useTranslation } from 'react-i18next'; // IMPORTAMOS A TRADUÇÃO
import { generateDashboardData } from '../data/mockData';
import StatsCard from '../components/dashboard/StatsCard';
import MemberGrowthChart from '../components/dashboard/MemberGrowthChart';
import '../assets/styles/Dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation(); // INICIAMOS A FUNÇÃO DE TRADUZIR
  const [period, setPeriod] = useState('7d');
  const [dashboardData, setDashboardData] = useState({ stats: {}, chartData: [] });

  useEffect(() => {
    const data = generateDashboardData(period);
    setDashboardData(data);
  }, [period]);

  const { stats, chartData } = dashboardData;

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="page-title">{t('dashboard.title')}</h1>
        <div className="period-filter">
          <button onClick={() => setPeriod('7d')} className={period === '7d' ? 'active' : ''}>{t('dashboard.filter_7d')}</button>
          <button onClick={() => setPeriod('30d')} className={period === '30d' ? 'active' : ''}>{t('dashboard.filter_30d')}</button>
          <button onClick={() => setPeriod('1y')} className={period === '1y' ? 'active' : ''}>{t('dashboard.filter_1y')}</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard 
          icon={<FiUsers />}
          title={t('dashboard.new_users')}
          value={stats.newUsers?.value}
          change={stats.newUsers?.change}
        />
        <StatsCard 
          icon={<FiCalendar />}
          title={t('dashboard.tasks_completed')}
          value={stats.tasksCompleted?.value}
          change={stats.tasksCompleted?.change}
        />
        <StatsCard 
          icon={<FiHeart />}
          title={t('dashboard.active_projects')}
          value={stats.activeProjects?.value}
          change={stats.activeProjects?.change}
        />
        <StatsCard 
          icon={<FiDollarSign />}
          title={t('dashboard.revenue')}
          value={stats.revenue?.value}
          change={stats.revenue?.change}
        />
      </div>

      <div className="chart-container">
        <h3>{t('dashboard.chart_title')}</h3>
        <MemberGrowthChart data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;