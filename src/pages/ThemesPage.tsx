import React, { useState, useEffect } from 'react';
import { themeService } from '../services/themeService';
import { Theme, ThemeRequest } from '../models';

export const ThemesPage: React.FC = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ThemeRequest>({
    name: '',
    description: '',
    color: '#aa3bff',
  });

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = async () => {
    try {
      setLoading(true);
      const response = await themeService.listThemes(1, 50);
      setThemes(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar temas');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (editingId) {
        const updated = await themeService.updateTheme(editingId, formData);
        setThemes(themes.map((t) => (t.id === editingId ? updated : t)));
        setEditingId(null);
      } else {
        const created = await themeService.createTheme(formData);
        setThemes([...themes, created]);
      }

      setFormData({ name: '', description: '', color: '#aa3bff' });
      setShowForm(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao salvar tema');
    }
  };

  const handleEdit = (theme: Theme) => {
    setFormData({
      name: theme.name,
      description: theme.description,
      color: theme.color,
    });
    setEditingId(theme.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este tema?')) {
      try {
        await themeService.deleteTheme(id);
        setThemes(themes.filter((t) => t.id !== id));
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao deletar tema');
      }
    }
  };

  if (loading && themes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Carregando temas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Temas</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ name: '', description: '', color: '#aa3bff' });
            }}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
          >
            {showForm ? 'Cancelar' : '+ Novo Tema'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingId ? 'Editar Tema' : 'Novo Tema'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                  placeholder="Nome do tema"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                  placeholder="Descrição do tema"
                  rows={3}
                />
              </div>

              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                  Cor
                </label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color || '#aa3bff'}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                {editingId ? 'Atualizar Tema' : 'Criar Tema'}
              </button>
            </form>
          </div>
        )}

        {/* Themes Grid */}
        {themes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum tema disponível.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
              >
                <div
                  className="w-full h-32 rounded-lg mb-4"
                  style={{ backgroundColor: theme.color || '#aa3bff' }}
                ></div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{theme.name}</h3>
                {theme.description && (
                  <p className="text-gray-600 mb-4">{theme.description}</p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(theme)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(theme.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
