
import { useState } from "react";

// Type de commande
export type Order = {
  id: number;
  client: string;
  date: string;
  status: "en attente" | "expédiée" | "livrée" | "annulée";
  total: number;
  payment: string;
  address: string;
  products: { name: string; qty: number; price: number }[];
};

// Exemple de données
const initialOrders: Order[] = [
  {
    id: 1001,
    client: "Jean Dupont",
    date: "2026-01-15",
    status: "en attente",
    total: 120.5,
    payment: "CB",
    address: "12 rue de Paris, Lyon",
    products: [
      { name: "Chaussures", qty: 1, price: 60 },
      { name: "T-shirt", qty: 2, price: 30.25 },
    ],
  },
  {
    id: 1002,
    client: "Marie Martin",
    date: "2026-01-16",
    status: "expédiée",
    total: 75,
    payment: "PayPal",
    address: "5 avenue du Général, Nice",
    products: [
      { name: "Sac à main", qty: 1, price: 75 },
    ],
  },
];


function OrderRow({ order, onStatusChange, onView, onDelete }: {
  readonly order: Readonly<Order>;
  readonly onStatusChange: (id: number, status: Order["status"]) => void;
  readonly onView: (order: Order) => void;
  readonly onDelete: (id: number) => void;
}) {
  return (
    <tr key={order.id} className="border-b">
      <td className="p-3">{order.id}</td>
      <td className="p-3">{order.client}</td>
      <td className="p-3">{order.date}</td>
      <td className="p-3">
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order.id, e.target.value as Order["status"])}
          className="rounded border border-gray-300 px-2 py-1 text-xs md:text-base"
        >
          <option value="en attente">En attente</option>
          <option value="expédiée">Expédiée</option>
          <option value="livrée">Livrée</option>
          <option value="annulée">Annulée</option>
        </select>
      </td>
      <td className="p-3">{order.total.toFixed(2)} €</td>
      <td className="p-3">{order.payment}</td>
      <td className="p-3 flex gap-2 flex-wrap items-center">
        <button
          onClick={() => onView(order)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-xs md:text-base hover:bg-blue-700 transition"
        >
          Voir
        </button>
        <button
          onClick={() => onDelete(order.id)}
          className="bg-red-500 text-white px-3 py-1 rounded text-xs md:text-base hover:bg-red-700 transition"
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
}

function ProductList({ products }: { readonly products: ReadonlyArray<{ readonly name: string; readonly qty: number; readonly price: number }> }) {
  return (
    <ul className="list-disc ml-5 mt-1">
      {products.map((p, idx) => (
        <li key={idx} className="text-sm">
          {p.name} × {p.qty} — {(p.price * p.qty).toFixed(2)} €
        </li>
      ))}
    </ul>
  );
}

function AdminOrder() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filtrage
  const filteredOrders = orders.filter(
    (o) =>
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toString().includes(search)
  );

  // Changement de statut
  const updateStatus = (id: number, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const handleView = (order: Order) => setSelectedOrder(order);
  const handleDelete = (id: number) => setOrders((prev) => prev.filter((ord) => ord.id !== id));

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-8 font-sans">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
        Gestion des commandes
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <input
          type="text"
          placeholder="Rechercher par client ou numéro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-base"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-50 rounded-lg text-sm md:text-base">
          <thead>
            <tr>
              <th className="bg-blue-50 font-semibold p-3 text-left">N°</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Client</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Date</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Statut</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Total</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Paiement</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <OrderRow
                key={o.id}
                order={o}
                onStatusChange={updateStatus}
                onView={handleView}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal détail commande */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-2">Commande n°{selectedOrder.id}</h3>
            <div className="mb-2 text-sm text-gray-700">
              <div><span className="font-semibold">Client:</span> {selectedOrder.client}</div>
              <div><span className="font-semibold">Date:</span> {selectedOrder.date}</div>
              <div><span className="font-semibold">Statut:</span> {selectedOrder.status}</div>
              <div><span className="font-semibold">Adresse:</span> {selectedOrder.address}</div>
              <div><span className="font-semibold">Paiement:</span> {selectedOrder.payment}</div>
              <div><span className="font-semibold">Total:</span> {selectedOrder.total.toFixed(2)} €</div>
            </div>
            <div>
              <span className="font-semibold">Produits:</span>
              <ProductList products={selectedOrder.products} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrder;