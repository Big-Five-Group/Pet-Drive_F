import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Conteúdo */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Compartilhe Caronas,
              <span className="text-purple-600"> Economize Juntos</span>
            </h1>
            
            <p className="text-xl text-gray-600">
              Conecte-se com outros passageiros, calcule o tempo de viagem com precisão e compartilhe custos de forma segura e eficiente.
            </p>

            <div className="flex gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/trips"
                    className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                  >
                    Ver Viagens
                  </Link>
                  <Link
                    to="/trips/create"
                    className="px-8 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition font-semibold"
                  >
                    Criar Viagem
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                  >
                    Começar Agora
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition font-semibold"
                  >
                    Entrar
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Ilustração */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🚗</div>
                <p className="text-gray-600">Compartilhe sua jornada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Por que usar Ride Connect?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Cálculo Preciso de Tempo
              </h3>
              <p className="text-gray-600">
                Calcule automaticamente o tempo de viagem baseado em distância e velocidade média.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Divida Custos
              </h3>
              <p className="text-gray-600">
                Compartilhe os custos da viagem de forma justa e transparente com outros passageiros.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Seguro e Confiável
              </h3>
              <p className="text-gray-600">
                Autenticação segura e perfis verificados para garantir confiança entre os usuários.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Cadastre-se agora e encontre sua próxima carona compartilhada.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              Criar Conta Gratuitamente
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
