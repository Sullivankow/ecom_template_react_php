// Imports nécessaires
import React, { useEffect, useState } from 'react';
import { FaUserEdit, FaTrash, FaPlus, FaSignInAlt, FaSearch } from 'react-icons/fa';

// Définition du type d'un log d'activité
type ActivityLog = {
  id: string;
  date: string; // format ISO ou lisible
  user: string; // nom ou email
  action: 'create' | 'update' | 'delete' | 'login' | 'review' | 'order';
  description: string;
};

// Données fictives pour la démonstration (à remplacer par Firestore plus tard)
const DUMMY_LOGS: ActivityLog[] = [
  {
    id: '1',
    date: '2026-02-10 10:12',
    user: 'admin@site.com',
    action: 'login',
    description: 'Connexion à l’interface admin',
  },
  {
    id: '2',
    date: '2026-02-10 10:15',
    user: 'admin@site.com',
    action: 'create',
    description: 'Ajout du produit "Sweat capuche"',
  },
  {
    id: '3',
    date: '2026-02-10 10:20',
    user: 'alice@mail.com',
    action: 'review',
    description: 'Nouvel avis publié sur "Sneakers"',
  },
  {
    id: '4',
    date: '2026-02-10 10:25',
    user: 'admin@site.com',
    action: 'delete',
    description: 'Suppression de la commande #1234',
  },
  {
    id: '5',
    date: '2026-02-10 10:30',
    user: 'bob@mail.com',
    action: 'order',
    description: 'Nouvelle commande passée (#1235)',
  },
];

// Composant principal exporté
const AdminContent: React.FC = () => {
  return <AdminActivityLog />;
};

// Composant journal d'activité (logs)
const AdminActivityLog: React.FC = () => {
  // État pour la liste des logs
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  // État pour la recherche texte
  const [search, setSearch] = useState('');
  // État pour le filtre d'action
  const [actionFilter, setActionFilter] = useState<'all' | ActivityLog['action']>('all');
  // État de chargement
  const [loading, setLoading] = useState(false);

  // Chargement simulé des logs (remplacer par Firestore plus tard)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLogs(DUMMY_LOGS);
      setLoading(false);
    }, 500);
  }, []);

  // Filtrage des logs selon la recherche et le type d'action
  const filteredLogs = logs.filter(log => {
    const matchAction = actionFilter === 'all' || log.action === actionFilter;
    const matchSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase());
    return matchAction && matchSearch;
  });

  // Fonction utilitaire pour afficher une icône selon le type d'action
  const getActionIcon = (action: ActivityLog['action']) => {
    switch (action) {
      case 'create': return <FaPlus className="text-green-600" title="Création" />;
      case 'update': return <FaUserEdit className="text-blue-600" title="Modification" />;
      case 'delete': return <FaTrash className="text-red-600" title="Suppression" />;
      case 'login': return <FaSignInAlt className="text-gray-600" title="Connexion" />;
      case 'review': return <FaUserEdit className="text-yellow-600" title="Avis" />;
      case 'order': return <FaPlus className="text-purple-600" title="Commande" />;
      default: return null;
    }
  };

  // Préparation du contenu du tableau selon l'état (chargement, vide, ou liste)
  let tableContent;
  if (loading) {
    tableContent = (
      <tr><td colSpan={5} className="text-center py-8">Chargement...</td></tr>
    );
  } else if (filteredLogs.length === 0) {
    tableContent = (
      <tr><td colSpan={5} className="text-center py-8">Aucune activité trouvée.</td></tr>
    );
  } else {
    tableContent = filteredLogs.map(log => (
      <tr key={log.id} className="border-t hover:bg-gray-50 transition">
        {/* Date et heure de l'action */}
        <td className="p-2 md:p-3 whitespace-nowrap">{log.date}</td>
        {/* Utilisateur ou admin concerné */}
        <td className="p-2 md:p-3 font-medium">{log.user}</td>
        {/* Type d'action avec icône */}
        <td className="p-2 md:p-3 text-center">{getActionIcon(log.action)}</td>
        {/* Description détaillée */}
        <td className="p-2 md:p-3">{log.description}</td>
      </tr>
    ));
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
      {/* Titre de la section */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Journal d'activité</h2>

      {/* Filtres de recherche et de type d'action */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        {/* Champ de recherche texte */}
        <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-2 py-1 border border-gray-200">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Rechercher par utilisateur ou description..."
            className="bg-transparent outline-none px-2 py-1 w-full"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {/* Sélecteur de type d'action */}
        <select
          className="border rounded-lg px-3 py-2 text-gray-700"
          value={actionFilter}
          onChange={e => setActionFilter(e.target.value as any)}
        >
          <option value="all">Toutes les actions</option>
          <option value="create">Création</option>
          <option value="update">Modification</option>
          <option value="delete">Suppression</option>
          <option value="login">Connexion</option>
          <option value="review">Avis</option>
          <option value="order">Commande</option>
        </select>
      </div>

      {/* Tableau responsive des logs */}
      <div className="overflow-x-auto rounded-lg shadow border bg-white">
        <table className="min-w-full text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 md:p-3 text-left">Date</th>
              <th className="p-2 md:p-3 text-left">Utilisateur</th>
              <th className="p-2 md:p-3 text-center">Action</th>
              <th className="p-2 md:p-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {/* Affichage du loader, du message vide, ou de la liste des logs */}
            {tableContent}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContent;


