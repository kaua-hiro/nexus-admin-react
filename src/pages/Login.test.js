import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from './Login';
import App from '../App';

// AQUI ESTÁ A NOVA LINHA: Adicionamos uma imitação para a biblioteca de gráficos
jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  ResponsiveContainer: ({ children }) => <div className="responsive-container-mock">{children}</div>,
}));

// O 'describe' agrupa testes relacionados
describe('Página de Login e Fluxo de Autenticação', () => {

  // Teste 1: Verifica se a página de login renderiza corretamente
  test('renderiza o formulário de login com todos os campos', () => {
    // Renderiza o componente de Login dentro dos seus Provedores
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    // Verifica se os elementos essenciais estão na tela
    expect(screen.getByRole('heading', { name: /acesse o painel/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  // Teste 2: Simula um login bem-sucedido e o redirecionamento
  test('permite que o utilizador faça login e seja redirecionado para o dashboard', async () => {
    // Para testar o redirecionamento, precisamos de renderizar a aplicação inteira
    render(<App />);

    // Simula a digitação do utilizador nos campos
    fireEvent.change(screen.getByLabelText(/usuário/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'password123' } });

    // Simula o clique no botão de entrar
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    // O 'waitFor' espera que a mudança de página aconteça
    // Estamos a verificar se o título "Dashboard" aparece na tela após o login
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
    });
  });
});