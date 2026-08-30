import React from 'react';
import { FiCheck, FiZap } from 'react-icons/fi';

const PLANS = [
  {
    name: 'Starter',
    price: 'R$ 0',
    period: '/mês',
    description: 'Para times pequenos testando o Nexus.',
    features: ['Até 5 membros', '1 quadro de projetos', 'Relatórios básicos'],
    current: false,
  },
  {
    name: 'Business',
    price: 'R$ 249',
    period: '/mês',
    description: 'Para empresas em crescimento.',
    features: ['Até 25 membros', 'Quadros ilimitados', 'Relatórios em PDF', 'Suporte prioritário'],
    current: true,
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    period: '',
    description: 'Para operações grandes com requisitos dedicados.',
    features: ['Membros ilimitados', 'SSO & permissões avançadas', 'SLA dedicado', 'Onboarding assistido'],
    current: false,
  },
];

const BillingForm = () => {
  return (
    <div className="settings-card billing-section">
      <div className="card-header">
        <h3>Plano & Faturamento</h3>
        <p>Acompanhe o uso do seu workspace e compare planos.</p>
      </div>

      <div className="card-body">
        <div className="current-plan-summary">
          <div className="current-plan-info">
            <span className="current-plan-tag"><FiZap size={12} /> Plano Atual</span>
            <h4>Business</h4>
            <p>Próxima cobrança em 15/09/2026 · R$ 249,00</p>
          </div>
          <button className="btn btn-secondary">Gerenciar assinatura</button>
        </div>

        <div className="usage-meters">
          <div className="usage-meter">
            <div className="usage-meter-label">
              <span>Membros</span>
              <span>8 / 25</span>
            </div>
            <div className="usage-bar"><div className="usage-bar-fill" style={{ width: '32%' }} /></div>
          </div>
          <div className="usage-meter">
            <div className="usage-meter-label">
              <span>Armazenamento</span>
              <span>4.1 GB / 20 GB</span>
            </div>
            <div className="usage-bar"><div className="usage-bar-fill" style={{ width: '20%' }} /></div>
          </div>
        </div>

        <div className="plans-grid">
          {PLANS.map(plan => (
            <div key={plan.name} className={`plan-card ${plan.current ? 'current' : ''}`}>
              {plan.current && <span className="plan-current-badge">Atual</span>}
              <h4>{plan.name}</h4>
              <p className="plan-price">{plan.price}<span>{plan.period}</span></p>
              <p className="plan-description">{plan.description}</p>
              <ul className="plan-features">
                {plan.features.map(feature => (
                  <li key={feature}><FiCheck size={14} /> {feature}</li>
                ))}
              </ul>
              <button className={`btn ${plan.current ? 'btn-secondary' : 'btn-primary'}`} disabled={plan.current}>
                {plan.current ? 'Plano Atual' : 'Fazer Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingForm;
