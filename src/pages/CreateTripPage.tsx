import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../services/tripService';
import { TripRequest } from '../models';
import { calculateTravelTime, formatTravelTime } from '../utils/tripCalculations';

export const CreateTripPage: React.FC = () => {
  const [formData, setFormData] = useState<TripRequest>({
    origin: '',
    destination: '',
    distance: 0,
    speed: 60,
    departureTime: '',
    availableSeats: 4,
  });
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: name === 'distance' || name === 'speed' || name === 'availableSeats' 
        ? parseFloat(value) 
        : value,
    };
    setFormData(newData);

    // Recalcular tempo se distância ou velocidade mudou
    if ((name === 'distance' || name === 'speed') && newData.distance > 0 && newData.speed > 0) {
      const time = calculateTravelTime(newData.distance, newData.speed);
      setEstimatedTime(time);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.origin || !formData.destination || !formData.departureTime) {
        throw new Error('Preencha todos os campos obrigatórios');
      }

      const tripData = {
        ...formData,
        estimatedTime: estimatedTime || 0,
      };

      await tripService.createTrip(tripData);
      navigate('/trips');
    } catch (err: any) {
      setError(err.message || err.response?.data?.message || 'Erro ao criar viagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Nova Viagem</h1>
          <p className="text-gray-600 mb-8">
            Preencha os detalhes da sua viagem e compartilhe com outros passageiros.
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Origem */}
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
                Origem *
              </label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                placeholder="Ex: São Paulo, SP"
              />
            </div>

            {/* Destino */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                Destino *
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                placeholder="Ex: Rio de Janeiro, RJ"
              />
            </div>

            {/* Distância */}
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
                Distância (km) *
              </label>
              <input
                type="number"
                id="distance"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                required
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                placeholder="Ex: 430"
              />
            </div>

            {/* Velocidade Média */}
            <div>
              <label htmlFor="speed" className="block text-sm font-medium text-gray-700 mb-2">
                Velocidade Média (km/h) *
              </label>
              <input
                type="number"
                id="speed"
                name="speed"
                value={formData.speed}
                onChange={handleChange}
                required
                min="0"
                step="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                placeholder="Ex: 80"
              />
            </div>

            {/* Tempo Estimado (Somente Leitura) */}
            {estimatedTime !== null && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-900">
                  <span className="font-semibold">Tempo Estimado:</span>{' '}
                  {formatTravelTime(estimatedTime)}
                </p>
              </div>
            )}

            {/* Horário de Saída */}
            <div>
              <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 mb-2">
                Horário de Saída *
              </label>
              <input
                type="datetime-local"
                id="departureTime"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Assentos Disponíveis */}
            <div>
              <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700 mb-2">
                Assentos Disponíveis *
              </label>
              <select
                id="availableSeats"
                name="availableSeats"
                value={formData.availableSeats}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {num} assento{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Criando viagem...' : 'Criar Viagem'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
