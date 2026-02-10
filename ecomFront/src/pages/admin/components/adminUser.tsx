import { useState } from "react";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";

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
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "client" as User["role"], status: "actif" as User["status"] });
  // Préparer le formulaire d'édition
  const handleEdit = (user: User) => {
    setEditUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...editForm } : u));
    setEditUser(null);
  };

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
      {/* Suppression du tableau horizontal, affichage uniquement en cards */}
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
      {/* Suppression de l'ancien tableau utilisateur */}
      {/* Cartes desktop et mobile */}
      <div className="flex flex-col gap-4 mt-6">
        {filteredUsers.length === 0 ? (
          <div className="text-center p-4 bg-white rounded shadow">Aucun utilisateur trouvé.</div>
        ) : (
          filteredUsers.map((u) => (
            <div key={u.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-200">
              <div className="font-semibold text-base mb-1">{u.name}</div>
              <div className="text-sm text-gray-600 mb-1">Email : <span className="font-medium">{u.email}</span></div>
              <div className="text-sm text-gray-600 mb-1">
                Rôle :
                <select
                  value={u.role}
                  onChange={e => handleRole(u.id, e.target.value as User["role"])}
                  className="rounded border border-gray-300 px-2 py-1 text-xs md:text-base ml-2"
                >
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="text-sm text-gray-600 mb-1">
                Statut :
                <select
                  value={u.status}
                  onChange={e => handleStatus(u.id, e.target.value as User["status"])}
                  className="rounded border border-gray-300 px-2 py-1 text-xs md:text-base ml-2"
                >
                  <option value="actif">Actif</option>
                  <option value="suspendu">Suspendu</option>
                  <option value="banni">Banni</option>
                </select>
              </div>
              <div className="text-sm text-gray-600 mb-1">Inscription : <span className="font-medium">{new Date(u.createdAt).toLocaleDateString('fr-FR')}</span></div>
              <div className="text-sm mb-1">
                Commandes :
                <ul className="list-disc ml-5 mt-1">
                  {u.orders.length === 0 ? (
                    <li className="text-gray-400 text-sm">Aucune commande</li>
                  ) : (
                    u.orders.map((o, idx) => (
                      <li key={idx} className="text-sm">
                        n°{o.id} — {o.date} — {o.total.toFixed(2)} € — {o.status}
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleView(u)}
                  title="Voir"
                  className="p-2 rounded-full hover:bg-blue-100 transition"
                  style={{ color: '#2563eb', background: '#fff' }}
                >
                  <FaEye size={18} />
                </button>
                <button
                  onClick={() => handleEdit(u)}
                  title="Modifier"
                  className="p-2 rounded-full hover:bg-yellow-100 transition"
                  style={{ color: '#eab308', background: '#fff' }}
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  title="Supprimer"
                  className="p-2 rounded-full hover:bg-red-100 transition"
                  style={{ color: '#e3342f', background: '#fff' }}
                >
                  <FaTrash size={18} />
                </button>
              </div>
                  {/* Modal édition utilisateur */}
                  {editUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 relative">
                        <button
                          onClick={() => setEditUser(null)}
                          className="absolute top-2 right-2 text-3xl focus:outline-none"
                          style={{ background: "none", border: "none", color: "#111", padding: 0 }}
                          title="Fermer"
                        >
                          ×
                        </button>
                        <h3 className="text-lg font-bold mb-4">Modifier utilisateur</h3>
                        <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                          <label htmlFor="edit-name" className="text-sm font-medium">Nom :</label>
                          <input
                            id="edit-name"
                            name="name"
                            type="text"
                            value={editForm.name}
                            onChange={handleEditChange}
                            placeholder="Nom"
                            className="border border-gray-300 rounded px-3 py-2 text-base"
                            required
                          />
                          <label htmlFor="edit-email" className="text-sm font-medium">Email :</label>
                          <input
                            id="edit-email"
                            name="email"
                            type="email"
                            value={editForm.email}
                            onChange={handleEditChange}
                            placeholder="Email"
                            className="border border-gray-300 rounded px-3 py-2 text-base"
                            required
                          />
                          <div className="flex gap-2 items-center">
                            <label htmlFor="edit-role" className="text-sm font-medium">Rôle :</label>
                            <select
                              id="edit-role"
                              name="role"
                              value={editForm.role}
                              onChange={handleEditChange}
                              className="rounded border border-gray-300 px-2 py-1 text-base"
                            >
                              <option value="client">Client</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>
                          <div className="flex gap-2 items-center">
                            <label htmlFor="edit-status" className="text-sm font-medium">Statut :</label>
                            <select
                              id="edit-status"
                              name="status"
                              value={editForm.status}
                              onChange={handleEditChange}
                              className="rounded border border-gray-300 px-2 py-1 text-base"
                            >
                              <option value="actif">Actif</option>
                              <option value="suspendu">Suspendu</option>
                              <option value="banni">Banni</option>
                            </select>
                          </div>
                          <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
                          >
                            Enregistrer
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminUser;