
import { FaBoxOpen, FaUsers, FaShoppingCart, FaEuroSign, FaExclamationTriangle } from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

// =============================
// Données statistiques fictives pour le dashboard
// À remplacer par des données dynamiques (API, store, etc.)
// =============================
const stats = [
  // Carte : nombre total de commandes
  { label: 'Commandes', value: 1245, icon: <FaShoppingCart className="text-blue-500 text-2xl" />, color: 'bg-blue-100' },
  // Carte : chiffre d'affaires du mois
  { label: 'CA du mois', value: '12 340 €', icon: <FaEuroSign className="text-green-500 text-2xl" />, color: 'bg-green-100' },
  // Carte : nombre de clients inscrits
  { label: 'Clients', value: 876, icon: <FaUsers className="text-purple-500 text-2xl" />, color: 'bg-purple-100' },
  // Carte : nombre de produits en stock
  { label: 'Produits', value: 320, icon: <FaBoxOpen className="text-yellow-500 text-2xl" />, color: 'bg-yellow-100' },
];

// Données pour le graphique d'évolution des ventes (à remplacer par des vraies données)
const salesData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
  datasets: [
    {
      label: 'Ventes',
      data: [1200, 1900, 3000, 2500, 3200, 4000, 3800, 4200, 3900, 4500, 4700, 5000],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2,
    },
  ],
};

// Données pour le graphique de répartition par catégorie (à remplacer par des vraies données)
const categoryData = {
  labels: ['Vêtements', 'Chaussures', 'Accessoires', 'Beauté'],
  datasets: [
    {
      label: 'Répartition',
      data: [45, 25, 20, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(239, 68, 68, 0.7)',
      ],
      borderWidth: 1,
    },
  ],
};

// Liste des dernières commandes (à remplacer par un fetch API ou une requête BDD)
const recentOrders = [
  { id: 'CMD1234', client: 'Alice Dupont', date: '28/12/2025', total: '120,00 €', status: 'Livrée' },
  { id: 'CMD1235', client: 'Bob Martin', date: '28/12/2025', total: '89,99 €', status: 'En cours' },
  { id: 'CMD1236', client: 'Claire Bernard', date: '27/12/2025', total: '45,50 €', status: 'Annulée' },
  { id: 'CMD1237', client: 'David Leroy', date: '27/12/2025', total: '210,00 €', status: 'Livrée' },
];

// Liste des produits en stock faible (à remplacer par une vraie requête produits)
const lowStock = [
  { name: 'T-shirt blanc', stock: 2 },
  { name: 'Sneakers X', stock: 5 },
  { name: 'Montre Classic', stock: 1 },
];

// Alertes affichées en haut du dashboard (à générer dynamiquement selon l'état réel)
const alerts = [
  { type: 'warning', message: '3 produits en stock faible', icon: <FaExclamationTriangle className="text-yellow-500" /> },
  { type: 'info', message: '2 commandes en attente de traitement', icon: <FaShoppingCart className="text-blue-500" /> },
];
// =============================
// Composant Dashboard Admin
// =============================
// Affiche les stats, graphes, alertes, commandes et stocks
// Pour passer en dynamique, remplacer les accès aux constantes par des données issues d'une API ou d'un store global
function AdminDashboard() {
  return (
    <div className="space-y-6 sm:space-y-8 px-1 sm:px-0 w-full max-w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4 text-center">Dashboard</h2>
      {/* Alertes */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4">
        {alerts.map((alert, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded bg-yellow-50 text-yellow-800 text-sm w-full sm:w-auto justify-center sm:justify-start">
            {alert.icon}
            {alert.message}
          </div>
        ))}
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded shadow-sm ${stat.color} w-full`}>
            <div>{stat.icon}</div>
            <div>
              <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="bg-white p-3 sm:p-6 rounded shadow">
          <h3 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Évolution des ventes</h3>
          <Bar data={salesData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white p-3 sm:p-6 rounded shadow">
          <h3 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Répartition par catégorie</h3>
          <Pie data={categoryData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div>
      </div>

      {/* Dernières commandes */}
      <div className="bg-white p-3 sm:p-6 rounded shadow">
        <h3 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Dernières commandes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 sm:px-4 py-2 text-left">N°</th>
                <th className="px-2 sm:px-4 py-2 text-left">Client</th>
                <th className="px-2 sm:px-4 py-2 text-left">Date</th>
                <th className="px-2 sm:px-4 py-2 text-left">Total</th>
                <th className="px-2 sm:px-4 py-2 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => {
                let statusClass = '';
                if (order.status === 'Livrée') {
                  statusClass = 'bg-green-100 text-green-700';
                } else if (order.status === 'En cours') {
                  statusClass = 'bg-blue-100 text-blue-700';
                } else {
                  statusClass = 'bg-red-100 text-red-700';
                }
                return (
                  <tr key={i} className="border-b last:border-0">
                    <td className="px-2 sm:px-4 py-2 font-mono">{order.id}</td>
                    <td className="px-2 sm:px-4 py-2">{order.client}</td>
                    <td className="px-2 sm:px-4 py-2">{order.date}</td>
                    <td className="px-2 sm:px-4 py-2">{order.total}</td>
                    <td className="px-2 sm:px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${statusClass}`}>{order.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Produits en stock faible */}
      <div className="bg-white p-3 sm:p-6 rounded shadow">
        <h3 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Produits en stock faible</h3>
        <ul className="space-y-2">
          {lowStock.map((prod, i) => (
            <li key={i} className="flex justify-between items-center text-xs sm:text-sm">
              <span>{prod.name}</span>
              <span className="text-red-600 font-bold">{prod.stock} restant{prod.stock > 1 ? 's' : ''}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;