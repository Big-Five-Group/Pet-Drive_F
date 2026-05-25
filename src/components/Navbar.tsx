import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">RC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Ride Connect</span>
            </Link>
          </div>

          {/* Menu Central */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <>
                <Link to="/trips" className="text-gray-700 hover:text-purple-600 transition">
                  Viagens
                </Link>
                <Link to="/themes" className="text-gray-700 hover:text-purple-600 transition">
                  Temas
                </Link>
                <Link to="/products" className="text-gray-700 hover:text-purple-600 transition">
                  Produtos
                </Link>
              </>
            )}
          </div>

          {/* Autenticação */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 text-sm">
                  Olá, <strong>{user?.name}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Cadastro
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
