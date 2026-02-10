

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
  const matchStatus = (r: Review) => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  };
  const filteredReviews = reviews.filter(r => {
    const statusOk = matchStatus(r);
    const matchSearch =
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.product.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());
    return statusOk && matchSearch;
  });


  // Rendu du contenu des avis
  const renderReviewsList = () => {
    if (loading) {
      return <div className="text-center p-4 bg-white rounded shadow">Chargement...</div>;
    }

    if (filteredReviews.length === 0) {
      return <div className="text-center p-4 bg-white rounded shadow">Aucun avis trouvé.</div>;
    }

    return (
      <>
        {filteredReviews.map(r => {
          let statusLabel = null;
          if (r.status === 'published') {
            statusLabel = <span className="text-green-600 font-semibold ml-2">Publié</span>;
          } else if (r.status === 'pending') {
            statusLabel = <span className="text-yellow-600 font-semibold ml-2">En attente</span>;
          } else if (r.status === 'deleted') {
            statusLabel = <span className="text-red-500 font-semibold ml-2">Supprimé</span>;
          }
          return (
            <div key={r.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-base">{r.user}</span>
                <span className="text-xs font-medium text-gray-500">{r.product}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-500 font-bold">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>
              <div className="text-sm text-gray-600 mb-1">Commentaire : <span className="font-medium" title={r.comment}>{r.comment}</span></div>
              <div className="text-sm text-gray-600 mb-1">
                Statut :
                {statusLabel}
              </div>
              <div className="flex gap-2 mt-2">
                {/* Bouton publier (si pas déjà publié ou supprimé) */}
                {r.status !== 'published' && r.status !== 'deleted' && (
                  <button title="Publier" className="p-2 rounded-full hover:bg-green-100 transition" style={{ color: '#059669', background: '#fff' }} onClick={() => handlePublish(r.id)}>
                    <FaEye size={18} />
                  </button>
                )}
                {/* Bouton masquer (si publié) */}
                {r.status === 'published' && (
                  <button title="Masquer" className="p-2 rounded-full hover:bg-yellow-100 transition" style={{ color: '#eab308', background: '#fff' }} onClick={() => handleHide(r.id)}>
                    <FaEyeSlash size={18} />
                  </button>
                )}
                {/* Bouton supprimer (si pas déjà supprimé) */}
                {r.status !== 'deleted' && (
                  <button title="Supprimer" className="p-2 rounded-full hover:bg-red-100 transition" style={{ color: '#e3342f', background: '#fff' }} onClick={() => handleDelete(r.id)}>
                    <FaTrash size={18} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const reviewsContent = renderReviewsList();

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

      {/* Cards responsive pour les avis */}
      <div className="flex flex-col gap-4 mt-6">
        {reviewsContent}
      </div>
    </div>
  );
};

export default AdminReviews;