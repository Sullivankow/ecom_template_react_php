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

  // Changement de statut (utilisé dans les cards)
  const handleStatusChange = (id: number, status: Order["status"]) => {
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
      {/* Cartes desktop et mobile */}
      <div className="flex flex-col gap-4 mt-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center p-4 bg-white rounded shadow">Aucune commande trouvée.</div>
        ) : (
          filteredOrders.map((o) => (
            <div key={o.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-200">
              <div className="font-semibold text-base mb-1">Commande n°{o.id}</div>
              <div className="text-sm text-gray-600 mb-1">Client : <span className="font-medium">{o.client}</span></div>
              <div className="text-sm text-gray-600 mb-1">Date : <span className="font-medium">{o.date}</span></div>
              <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                Statut :
                <select
                  value={o.status}
                  onChange={e => handleStatusChange(o.id, e.target.value as Order["status"])}
                  className="rounded border border-gray-300 px-2 py-1 text-xs md:text-base font-medium capitalize"
                >
                  <option value="en attente">En attente</option>
                  <option value="expédiée">Expédiée</option>
                  <option value="livrée">Livrée</option>
                  <option value="annulée">Annulée</option>
                </select>
              </div>
              <div className="text-sm text-gray-600 mb-1">Total : <span className="font-medium">{o.total.toFixed(2)} €</span></div>
              <div className="text-sm text-gray-600 mb-1">Paiement : <span className="font-medium">{o.payment}</span></div>
              <div className="text-sm text-gray-600 mb-1">Adresse : <span className="font-medium">{o.address}</span></div>
              <div className="text-sm mb-1">
                Produits :
                <ul className="list-disc ml-5 mt-1">
                  {o.products.map((p, idx) => (
                    <li key={idx} className="text-sm">
                      {p.name} × {p.qty} — {(p.price * p.qty).toFixed(2)} €
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleView(o)}
                  title="Voir"
                  className="p-2 rounded-full hover:bg-blue-100 transition"
                  style={{ color: '#2563eb', background: '#fff' }}
                >
                  Voir
                </button>
                <button
                  onClick={() => handleDelete(o.id)}
                  title="Supprimer"
                  className="p-2 rounded-full hover:bg-red-100 transition"
                  style={{ color: '#e3342f', background: '#fff' }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
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