import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Membros from './pages/Membros';
import Configuracoes from './pages/Configuracoes';
import Projetos from './pages/Projetos';
import Calendario from './pages/Calendario';
import Relatorios from './pages/Relatorios';
import Atividades from './pages/Atividades';
import './assets/styles/variables.css';
import './assets/styles/App.css';
import './assets/styles/print.css';

function App() {
  // A MÁGICA ESTÁ AQUI: Detecta se é localhost ou GitHub Pages
  const routerBasename = import.meta.env.DEV ? '/' : '/nexus-admin-react';

  return (
    <Router basename={routerBasename}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="membros" element={<Membros />} />
            <Route path="projetos" element={<Projetos />} />
            <Route path="calendario" element={<Calendario />} />
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="atividades" element={<Atividades />} />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;