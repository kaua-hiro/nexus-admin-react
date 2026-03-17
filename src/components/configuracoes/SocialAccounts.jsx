import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const SocialAccounts = () => {
    return (
        <div className="settings-card social-section">
            <div className="card-header">
                <h3>Contas Conectadas</h3>
                <p>Vincule contas para login rápido.</p>
            </div>
            <div className="card-body">
                <div className="social-account-item">
                    <div className="social-icon" style={{ color: '#1DA1F2' }}><FiTwitter /></div>
                    <div>
                        <h4>Twitter</h4>
                        <span style={{color: 'var(--success-text)', fontSize: '0.8rem', fontWeight: 'bold'}}>Conectado</span>
                    </div>
                    <button className="btn btn-secondary" style={{padding: '0.5rem 1rem'}}>Desvincular</button>
                </div>
                
                <div className="social-account-item">
                    <div className="social-icon" style={{ color: 'var(--primary-text)' }}><FiGithub /></div>
                    <div>
                        <h4>GitHub</h4>
                        <a href="#" style={{fontSize: '0.8rem', color: 'var(--primary-accent)', textDecoration: 'none'}}>@nexus_admin</a>
                    </div>
                    <button className="btn btn-secondary" style={{padding: '0.5rem 1rem'}}>Configurar</button>
                </div>

                <div className="social-account-item">
                    <div className="social-icon" style={{ color: '#0A66C2' }}><FiLinkedin /></div>
                    <div>
                        <h4>LinkedIn</h4>
                        <span style={{fontSize: '0.8rem'}}>Não conectado</span>
                    </div>
                    <button className="btn btn-primary" style={{padding: '0.5rem 1rem'}}>Conectar</button>
                </div>
            </div>
        </div>
    )
}

export default SocialAccounts;