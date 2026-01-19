
import { useState } from "react";
import { FaTrash, FaEye } from "react-icons/fa";

type User = {
  id: number;
  name: string;
  email: string;
  role: "client" | "admin";
  status: "actif" | "suspendu" | "banni";
  createdAt: string;
  orders: Array<{
    id: number;
    date: string;
    total: number;
    status: string;
  }>;
};

const initialUsers: User[] = [
  {
    id: 1,
    name: "Alice Martin",
    email: "alice@mail.com",
    role: "client",
    status: "actif",
    createdAt: "2025-12-01",
    orders: [
      { id: 1001, date: "2026-01-10", total: 120.5, status: "livrée" },
      { id: 1005, date: "2026-01-18", total: 75, status: "en attente" },
    ],
  },
  {
    id: 2,
    name: "Bob Dupont",
    email: "bob@mail.com",
    role: "admin",
    status: "actif",
    createdAt: "2025-11-15",
    orders: [],
  },
];

function UserRow({ user, onView, onDelete, onStatus, onRole }: {
  readonly user: Readonly<User>;
  readonly onView: (user: User) => void;
  readonly onDelete: (id: number) => void;
  readonly onStatus: (id: number, status: User["status"]) => void;
  readonly onRole: (id: number, role: User["role"]) => void;
}) {
  return (
    <tr className="border-b">
      <td className="p-3">{user.name}</td>
      <td className="p-3">{user.email}</td>
      <td className="p-3">
        <select
          value={user.role}
          onChange={e => onRole(user.id, e.target.value as User["role"])}
          className="rounded border border-gray-300 px-2 py-1 text-xs md:text-base"
        >
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td className="p-3">
        <select
          value={user.status}
          onChange={e => onStatus(user.id, e.target.value as User["status"])}
          className="rounded border border-gray-300 px-2 py-1 text-xs md:text-base"
        >
          <option value="actif">Actif</option>
          <option value="suspendu">Suspendu</option>
          <option value="banni">Banni</option>
        </select>
      </td>
      <td className="p-3">{user.createdAt}</td>
      <td className="p-3 flex gap-2 flex-wrap items-center">
        <button
          onClick={() => onView(user)}
          title="Voir"
          className="focus:outline-none hover:text-blue-700 transition"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <FaEye className="text-blue-600 text-lg" />
        </button>
        <button
          onClick={() => onDelete(user.id)}
          title="Supprimer"
          className="focus:outline-none hover:text-red-700 transition"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <FaTrash className="text-red-500 text-lg" />
        </button>
      </td>
    </tr>
  );
}

function UserOrders({ orders }: { readonly orders: ReadonlyArray<{ readonly id: number; readonly date: string; readonly total: number; readonly status: string }> }) {
  if (!orders.length) return <div className="text-gray-400 text-sm">Aucune commande</div>;
  return (
    <table className="w-full text-xs md:text-sm mt-2 border">
      <thead>
        <tr>
          <th className="p-2 bg-blue-50">N°</th>
          <th className="p-2 bg-blue-50">Date</th>
          <th className="p-2 bg-blue-50">Total</th>
          <th className="p-2 bg-blue-50">Statut</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o.id} className="border-b">
            <td className="p-2">{o.id}</td>
            <td className="p-2">{o.date}</td>
            <td className="p-2">{o.total.toFixed(2)} €</td>
            <td className="p-2">{o.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AdminUser() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => setUsers((prev) => prev.filter((u) => u.id !== id));
  const handleStatus = (id: number, status: User["status"]) => setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status } : u));
  const handleRole = (id: number, role: User["role"]) => setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role } : u));
  const handleView = (user: User) => setSelectedUser(user);

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-8 font-sans">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
        Gestion des utilisateurs
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-base"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-50 rounded-lg text-sm md:text-base">
          <thead>
            <tr>
              <th className="bg-blue-50 font-semibold p-3 text-left">Nom</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Email</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Rôle</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Statut</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Inscription</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                onView={handleView}
                onDelete={handleDelete}
                onStatus={handleStatus}
                onRole={handleRole}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal détail utilisateur */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-2 text-3xl focus:outline-none"
              style={{ background: "none", border: "none", color: "#111", padding: 0 }}
              title="Fermer"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-2">{selectedUser.name}</h3>
            <div className="mb-2 text-sm text-gray-700">
              <div><span className="font-semibold">Email:</span> {selectedUser.email}</div>
              <div><span className="font-semibold">Rôle:</span> {selectedUser.role}</div>
              <div><span className="font-semibold">Statut:</span> {selectedUser.status}</div>
              <div><span className="font-semibold">Inscription:</span> {new Date(selectedUser.createdAt).toLocaleDateString('fr-FR')}</div>
            </div>
            <div>
              <span className="font-semibold">Commandes passées:</span>
              <UserOrders orders={selectedUser.orders} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUser;