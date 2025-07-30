import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: true, // Começa como 'true' por padrão.
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controlar a verificação inicial.

  // Este useEffect é a parte mais importante.
  // Ele roda APENAS UMA VEZ quando o aplicativo é carregado.
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []); // O array vazio [] garante que isso rode apenas na montagem inicial.


  const login = (data) => {
    const mockUser = { name: data.username, email: `${data.username}@nexus.org.br` };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  // Enquanto estiver carregando, não renderizamos nada do aplicativo.
  // Isso impede que o ProtectedRoute tome uma decisão precipitada.
  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};