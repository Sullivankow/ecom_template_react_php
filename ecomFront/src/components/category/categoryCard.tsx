import React from 'react';
import { FaEdit } from 'react-icons/fa';

// Modèle de props pour une catégorie
export interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  description?: string;
  onClick?: () => void;
}

// Composant carte catégorie
const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, description, onClick }) => {
  // Ajout d'un bouton modifier (exemple, à remplacer par une vraie action si besoin)
  const handleEdit = () => {
    // Action d'édition à implémenter
    alert(`Modifier la catégorie : ${name}`);
  };
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-4 transition hover:scale-105 hover:shadow-lg">
      <img src={image} alt={name} className="w-28 h-28 object-cover rounded-full mb-3 border border-gray-200" />
      <h3 className="text-lg font-bold text-gray-900 mb-1 text-center">{name}</h3>
      {description && <p className="text-gray-500 text-sm text-center mb-2">{description}</p>}
      <button
        className="mt-auto bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        onClick={onClick}
      >
        Voir les produits
      </button>
      <button
        title="Modifier"
        className="mt-2 p-2 rounded-full hover:bg-yellow-100 transition"
        style={{ color: '#eab308', background: '#fff' }}
        onClick={handleEdit}
      >
        <FaEdit size={18} />
      </button>
    </div>
  );
};

export default CategoryCard;


