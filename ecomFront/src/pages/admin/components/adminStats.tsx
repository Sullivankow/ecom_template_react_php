

import { FaShoppingCart, FaEuroSign, FaUsers, FaBoxOpen, FaChartBar } from "react-icons/fa";

// Données fictives pour la démo
const stats = {
  totalOrders: 1200,
  salesToday: 15,
  salesThisMonth: 320,
  revenueTotal: 45000,
  revenueThisMonth: 3200,
  customers: 800,
  productsInStock: 150,
  productsOutOfStock: 12,
  topProducts: [
    { name: 'Produit A', sold: 120 },
    { name: 'Produit B', sold: 90 },
    { name: 'Produit C', sold: 75 },
    { name: 'Produit D', sold: 60 },
    { name: 'Produit E', sold: 50 },
  ]
};

function AdminStats() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Statistiques générales</h2>
      {/* Cartes principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
          <FaShoppingCart className="text-blue-600 text-3xl" />
          <div>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="text-gray-500">Commandes totales</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
          <FaEuroSign className="text-green-600 text-3xl" />
          <div>
            <div className="text-2xl font-bold">{stats.revenueTotal} €</div>
            <div className="text-gray-500">Chiffre d'affaires total</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
          <FaUsers className="text-purple-600 text-3xl" />
          <div>
            <div className="text-2xl font-bold">{stats.customers}</div>
            <div className="text-gray-500">Clients inscrits</div>
          </div>
        </div>
      </div>
      {/* Détail ventes et stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center gap-2 mb-2">
            <FaChartBar className="text-blue-400" />
            <span className="font-semibold">Ventes</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Aujourd'hui : <b>{stats.salesToday}</b></span>
            <span>Ce mois-ci : <b>{stats.salesThisMonth}</b></span>
            <span>Chiffre d'affaires ce mois : <b>{stats.revenueThisMonth} €</b></span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center gap-2 mb-2">
            <FaBoxOpen className="text-yellow-500" />
            <span className="font-semibold">Stock</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Produits en stock : <b>{stats.productsInStock}</b></span>
            <span>Produits hors stock : <b>{stats.productsOutOfStock}</b></span>
          </div>
        </div>
      </div>
      {/* Top produits */}
      <div className="bg-white rounded-lg shadow p-5">
        <div className="font-semibold mb-2">Top 5 des produits les plus vendus</div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="py-1">Produit</th>
              <th className="py-1">Vendus</th>
            </tr>
          </thead>
          <tbody>
            {stats.topProducts.map((prod) => (
              <tr key={prod.name} className="border-t">
                <td className="py-1">{prod.name}</td>
                <td className="py-1">{prod.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminStats;