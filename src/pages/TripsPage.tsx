import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../services/tripService';
import { Trip } from '../models';
import { formatTravelTime, formatTime } from '../utils/tripCalculations';

export const TripsPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadTrips();
  }, [page]);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const response = await tripService.listTrips(page, 10);
      setTrips(response.data);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar viagens');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    if (window.confirm('Tem certeza que deseja deletar esta viagem?')) {
      try {
        await tripService.deleteTrip(tripId);
        setTrips(trips.filter((trip) => trip.id !== tripId));
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao deletar viagem');
      }
    }
  };

  const handleJoinTrip = async (tripId: string) => {
    try {
      const updatedTrip = await tripService.joinTrip(tripId);
      setTrips(trips.map((trip) => (trip.id === tripId ? updatedTrip : trip)));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao entrar na viagem');
    }
  };

  if (loading && trips.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Carregando viagens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Viagens Disponíveis</h1>
          <Link
            to="/trips/create"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            + Nova Viagem
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Trips List */}
        {trips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhuma viagem disponível no momento.</p>
            <Link
              to="/trips/create"
              className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Criar Primeira Viagem
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Rota */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {trip.origin} → {trip.destination}
                    </h3>
                    <p className="text-gray-600">
                      <span className="font-semibold">Distância:</span> {trip.distance} km
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Tempo:</span>{' '}
                      {formatTravelTime(trip.estimatedTime)}
                    </p>
                  </div>

                  {/* Detalhes */}
                  <div>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Saída:</span>{' '}
                      {formatTime(trip.departureTime)}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Assentos:</span>{' '}
                      {trip.availableSeats} disponíveis
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Motorista:</span>{' '}
                      {trip.driver?.name || 'N/A'}
                    </p>
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col justify-end gap-2">
                    <Link
                      to={`/trips/${trip.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
                    >
                      Ver Detalhes
                    </Link>
                    {trip.availableSeats > 0 && (
                      <button
                        onClick={() => handleJoinTrip(trip.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Entrar na Viagem
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-4 py-2">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
