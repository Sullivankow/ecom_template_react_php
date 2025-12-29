
import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

// Données fictives de catégories
const mockCategories = [
  {
    id: 1,
    name: 'Vêtements',
    description: 'Tous les vêtements pour homme et femme.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=128&q=80',
    products: 24,
  },
  {
    id: 2,
    name: 'Chaussures',
    description: 'Chaussures de sport, ville et détente.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=128&q=80',
    products: 12,
  },
  {
    id: 3,
    name: 'Accessoires',
    description: 'Sacs, ceintures, chapeaux et plus.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=128&q=80',
    products: 8,
  },
];

// Composant principal
const AdminCategories = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [search, setSearch] = useState('');

  // Filtrage par recherche
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // Suppression fictive
  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="admin-categories w-full mx-auto px-2 sm:px-4 md:px-8 py-4">
      {/* Titre */}
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center sm:text-left">Gestion des catégories</h2>

      {/* Barre d'outils */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <input
          type="text"
          placeholder="Rechercher une catégorie..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-2 w-full sm:w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium text-base transition border border-transparent hover:border-blue-200 w-full sm:w-auto"
        >
          <FaPlus /> Ajouter une catégorie
        </button>
      </div>

      {/* Liste des catégories (tableau sur desktop, cartes sur mobile) */}
      <div className="hidden sm:block overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 md:p-3 border">Image</th>
              <th className="p-2 md:p-3 border">Nom</th>
              <th className="p-2 md:p-3 border">Description</th>
              <th className="p-2 md:p-3 border">Produits</th>
              <th className="p-2 md:p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">Aucune catégorie trouvée.</td>
              </tr>
            ) : (
              filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="p-2 md:p-3 border text-center">
                    <img src={cat.image} alt={cat.name} className="w-10 h-10 object-cover rounded" />
                  </td>
                  <td className="p-2 md:p-3 border">{cat.name}</td>
                  <td className="p-2 md:p-3 border">{cat.description}</td>
                  <td className="p-2 md:p-3 border text-center">{cat.products}</td>
                  <td className="p-2 md:p-3 border flex gap-2 justify-center">
                    <button title="Modifier" className="p-2 rounded-full hover:bg-blue-100 transition" style={{ color: '#2563eb', background: '#fff' }}>
                      <FaEdit size={18} />
                    </button>
                    <button title="Supprimer" className="p-2 rounded-full hover:bg-red-100 transition" style={{ color: '#e3342f', background: '#fff' }} onClick={() => handleDelete(cat.id)}>
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile : affichage vertical en cartes */}
      <div className="sm:hidden flex flex-col gap-4">
        {filteredCategories.length === 0 ? (
          <div className="text-center p-4 bg-white rounded shadow">Aucune catégorie trouvée.</div>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-lg shadow p-4 flex gap-4 items-center">
              <img src={cat.image} alt={cat.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold text-base mb-1">{cat.name}</div>
                <div className="text-sm text-gray-600 mb-1">{cat.description}</div>
                <div className="text-sm text-gray-600 mb-1">Produits : <span className="font-medium">{cat.products}</span></div>
                <div className="flex gap-2 mt-2">
                  <button title="Modifier" className="p-2 rounded-full hover:bg-blue-100 transition" style={{ color: '#2563eb', background: '#fff' }}>
                    <FaEdit size={18} />
                  </button>
                  <button title="Supprimer" className="p-2 rounded-full hover:bg-red-100 transition" style={{ color: '#e3342f', background: '#fff' }} onClick={() => handleDelete(cat.id)}>
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/*
        - Responsive : tableau sur desktop, cartes sur mobile
        - Recherche, ajout, suppression fictive
        - Icônes FontAwesome
        - Prêt à connecter à un backend ou à enrichir (formulaire, pagination...)
      */}
    </div>
  );
};

export default AdminCategories;