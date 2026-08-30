import React, { useState, useMemo } from 'react';
import { FiActivity } from 'react-icons/fi';
import { initialActivity, ACTIVITY_CATEGORIES } from '../data/activityData';
import '../assets/styles/Atividades.css';

const formatWhen = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

const Atividades = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return initialActivity;
    return initialActivity.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="activity-page">
      <h1 className="page-title">Registo de Atividades</h1>
      <p className="page-subtitle">Trilha de auditoria das ações realizadas no workspace — quem fez o quê, e quando.</p>

      <div className="activity-filters">
        <button
          className={`activity-filter-chip ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          Todas
        </button>
        {Object.entries(ACTIVITY_CATEGORIES).map(([key, { label, color }]) => (
          <button
            key={key}
            className={`activity-filter-chip ${activeCategory === key ? 'active' : ''}`}
            style={activeCategory === key ? { backgroundColor: color, borderColor: color } : {}}
            onClick={() => setActiveCategory(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="activity-empty">
          <FiActivity size={32} />
          <p>Nenhuma atividade nesta categoria ainda.</p>
        </div>
      ) : (
        <ol className="activity-timeline">
          {filtered.map(item => {
            const category = ACTIVITY_CATEGORIES[item.category];
            return (
              <li key={item.id} className="activity-entry">
                <span className="activity-marker" style={{ backgroundColor: category?.color }} />
                <div className="activity-entry-body">
                  <p className="activity-text">
                    <strong>{item.actor}</strong> {item.action} <strong>{item.target}</strong>
                  </p>
                  <div className="activity-meta">
                    <span className="activity-category-tag" style={{ color: category?.color }}>{category?.label}</span>
                    <span className="activity-time">{formatWhen(item.time)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default Atividades;
