

// Composant de gestion des avis pour l'admin
// Affiche la liste, permet de filtrer, publier, masquer, supprimer les avis
// Responsive design inclus

import React, { useEffect, useState } from 'react';
import { FaTrash, FaEye, FaEyeSlash, FaSearch } from 'react-icons/fa';
// import { db } from '../../../lib/firebase'; // À activer pour la connexion Firestore

// Définition du type d'un avis
type Review = {
  id: string;
  user: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  status: 'published' | 'pending' | 'deleted';
};

// Données fictives pour la démonstration (à remplacer par Firestore plus tard)
const DUMMY_REVIEWS: Review[] = [
  {
    id: '1',
    user: 'Alice',
    product: 'T-shirt bleu',
    rating: 5,
    comment: 'Super qualité, livraison rapide !',
    date: '2026-02-01',
    status: 'published',
  },
  {
    id: '2',
    user: 'Bob',
    product: 'Sneakers',
    rating: 3,
    comment: 'Confortables mais taille petit.',
    date: '2026-01-28',
    status: 'pending',
  },
  {
    id: '3',
    user: 'Chloé',
    product: 'Sac à dos',
    rating: 4,
    comment: 'Pratique pour les cours.',
    date: '2026-01-20',
    status: 'published',
  },
];

const AdminReviews: React.FC = () => {
  // État pour la liste des avis
  const [reviews, setReviews] = useState<Review[]>([]);
  // État pour la recherche texte
  const [search, setSearch] = useState('');
  // État pour le filtre de statut
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'pending' | 'deleted'>('all');
  // État de chargement
  const [loading, setLoading] = useState(false);

  // Chargement simulé des avis (remplacer par Firestore plus tard)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setReviews(DUMMY_REVIEWS);
      setLoading(false);
    }, 500);
  }, []);

  // Action : publier un avis
  const handlePublish = (id: string) => {
    setReviews(reviews => reviews.map(r => r.id === id ? { ...r, status: 'published' } : r));
  };
  // Action : masquer un avis (le repasse en attente)
  const handleHide = (id: string) => {
    setReviews(reviews => reviews.map(r => r.id === id ? { ...r, status: 'pending' } : r));
  };
  // Action : supprimer un avis (soft delete)
  const handleDelete = (id: string) => {
    if (window.confirm('Supprimer définitivement cet avis ?')) {
      setReviews(reviews => reviews.map(r => r.id === id ? { ...r, status: 'deleted' } : r));
    }
  };


  // Filtrage des avis selon la recherche et le statut
  const filteredReviews = reviews.filter(r => {
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchSearch =
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.product.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Préparation du contenu du tableau selon l'état (chargement, vide, ou liste)
  let tableContent;
  if (loading) {
    tableContent = (
      <tr><td colSpan={7} className="text-center py-8">Chargement...</td></tr>
    );
  } else if (filteredReviews.length === 0) {
    tableContent = (
      <tr><td colSpan={7} className="text-center py-8">Aucun avis trouvé.</td></tr>
    );
  } else {
    tableContent = filteredReviews.map(r => (
      <tr key={r.id} className="border-t hover:bg-gray-50 transition">
        {/* Utilisateur */}
        <td className="p-2 md:p-3 font-medium">{r.user}</td>
        {/* Produit concerné */}
        <td className="p-2 md:p-3">{r.product}</td>
        {/* Note sous forme d'étoiles */}
        <td className="p-2 md:p-3">
          <span className="inline-block text-yellow-500 font-bold">
            {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
          </span>
        </td>
        {/* Commentaire (tronqué si trop long) */}
        <td className="p-2 md:p-3 max-w-xs truncate" title={r.comment}>{r.comment}</td>
        {/* Date de l'avis */}
        <td className="p-2 md:p-3 whitespace-nowrap">{r.date}</td>
        {/* Statut de l'avis */}
        <td className="p-2 md:p-3">
          {r.status === 'published' && <span className="text-green-600 font-semibold">Publié</span>}
          {r.status === 'pending' && <span className="text-yellow-600 font-semibold">En attente</span>}
          {r.status === 'deleted' && <span className="text-red-500 font-semibold">Supprimé</span>}
        </td>
        {/* Actions d'administration */}
        <td className="p-2 md:p-3 flex gap-2 justify-center">
          {/* Bouton publier (si pas déjà publié ou supprimé) */}
          {r.status !== 'published' && r.status !== 'deleted' && (
            <button title="Publier" className="p-2 rounded hover:bg-gray-100" style={{background: 'none', border: 'none'}} onClick={() => handlePublish(r.id)}>
              <FaEye className="text-green-700" />
            </button>
          )}
          {/* Bouton masquer (si publié) */}
          {r.status === 'published' && (
            <button title="Masquer" className="p-2 rounded hover:bg-gray-100" style={{background: 'none', border: 'none'}} onClick={() => handleHide(r.id)}>
              <FaEyeSlash className="text-yellow-700" />
            </button>
          )}
          {/* Bouton supprimer (si pas déjà supprimé) */}
          {r.status !== 'deleted' && (
            <button title="Supprimer" className="p-2 rounded hover:bg-gray-100" style={{background: 'none', border: 'none'}} onClick={() => handleDelete(r.id)}>
              <FaTrash className="text-red-700" />
            </button>
          )}
        </td>
      </tr>
    ));
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
      {/* Titre de la section */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Gestion des avis</h2>

      {/* Filtres de recherche et de statut */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        {/* Champ de recherche texte */}
        <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-2 py-1 border border-gray-200">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Rechercher par utilisateur, produit ou texte..."
            className="bg-transparent outline-none px-2 py-1 w-full"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {/* Sélecteur de statut */}
        <select
          className="border rounded-lg px-3 py-2 text-gray-700"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as any)}
        >
          <option value="all">Tous les statuts</option>
          <option value="published">Publié</option>
          <option value="pending">En attente</option>
          <option value="deleted">Supprimé</option>
        </select>
      </div>

      {/* Tableau responsive des avis */}
      <div className="overflow-x-auto rounded-lg shadow border bg-white">
        <table className="min-w-full text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 md:p-3 text-left">Utilisateur</th>
              <th className="p-2 md:p-3 text-left">Produit</th>
              <th className="p-2 md:p-3 text-left">Note</th>
              <th className="p-2 md:p-3 text-left">Commentaire</th>
              <th className="p-2 md:p-3 text-left">Date</th>
              <th className="p-2 md:p-3 text-left">Statut</th>
              <th className="p-2 md:p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Affichage du loader, du message vide, ou de la liste des avis */}
            {tableContent}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;