
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { ButtonDeleted } from '../../../components/ui/button';

// Exemple de données fictives
const mockProducts = [
  {
    id: 1,
    name: 'T-shirt classique',
    price: 19.99,
    stock: 42,
    status: 'Actif',
    // Image gratuite Unsplash (t-shirt)
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=128&q=80',
  },
  {
    id: 2,
    name: 'Jean slim',
    price: 39.99,
    stock: 15,
    status: 'Inactif',
    // Image gratuite Unsplash (jean)
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=128&q=80',
  },
  {
    id: 3,
    name: 'Sneakers',
    price: 59.99,
    stock: 8,
    status: 'Actif',
    // Image gratuite Unsplash (sneakers)
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=128&q=80',
  },
];

const AdminProducts = () => {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState('');

  // Filtrage par recherche
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Suppression fictive
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="admin-products w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8 py-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center sm:text-left">Gestion des produits</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-2 w-full sm:w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium text-base transition border border-transparent hover:border-blue-200 w-full sm:w-auto"
        >
          + Ajouter un produit
        </button>
      </div>
      {/*
        Affichage tableau classique sur tablette et desktop (sm et +)
        Le tableau est masqué sur mobile grâce à 'hidden sm:block'.
      */}
      <div className="hidden sm:block overflow-x-auto rounded-lg shadow-sm">
        <table className="min-w-[600px] w-full bg-white border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 md:p-3 border">Image</th>
              <th className="p-2 md:p-3 border">Nom</th>
              <th className="p-2 md:p-3 border">Prix</th>
              <th className="p-2 md:p-3 border">Stock</th>
              <th className="p-2 md:p-3 border">Statut</th>
              <th className="p-2 md:p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">Aucun produit trouvé.</td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-2 md:p-3 border text-center">
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                  </td>
                  <td className="p-2 md:p-3 border">{product.name}</td>
                  <td className="p-2 md:p-3 border">{product.price.toFixed(2)} €</td>
                  <td className="p-2 md:p-3 border">{product.stock}</td>
                  <td className="p-2 md:p-3 border">{product.status}</td>
                  <td className="p-2 md:p-3 border flex gap-2 justify-center">
                    <button
                      title="Modifier"
                      className="p-2 rounded-full hover:bg-blue-100 transition"
                      style={{ color: '#2563eb', background: '#fff' }}
                    >
                      <FaEdit size={20} />
                    </button>
                    <ButtonDeleted title="Supprimer" onClick={() => handleDelete(product.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/*
        Affichage vertical (cartes) sur mobile uniquement (sm:hidden)
        Chaque produit est présenté dans une carte claire et lisible.
      */}
      <div className="sm:hidden flex flex-col gap-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center p-4 bg-white rounded shadow">Aucun produit trouvé.</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4 flex gap-4 items-center">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold text-base mb-1">{product.name}</div>
                <div className="text-sm text-gray-600 mb-1">Prix : <span className="font-medium">{product.price.toFixed(2)} €</span></div>
                <div className="text-sm text-gray-600 mb-1">Stock : <span className="font-medium">{product.stock}</span></div>
                <div className="text-sm text-gray-600 mb-2">Statut : <span className="font-medium">{product.status}</span></div>
                <div className="flex gap-2">
                  <button
                    title="Modifier"
                    className="p-2 rounded-full hover:bg-blue-100 transition"
                    style={{ color: '#2563eb', background: '#fff' }}
                  >
                    <FaEdit size={20} />
                  </button>
                  <ButtonDeleted title="Supprimer" onClick={() => handleDelete(product.id)} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProducts;