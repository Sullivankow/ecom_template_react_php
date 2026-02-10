
import { useState } from "react";
import { FaTrash, FaEye, FaArchive, FaReply } from "react-icons/fa";

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  status: "nouveau" | "en cours" | "résolu" | "archivé";
  history?: Array<{ date: string; content: string; from: "admin" | "user" }>;
};

const initialMessages: Message[] = [
  {
    id: 1,
    name: "Sophie Bernard",
    email: "sophie@mail.com",
    subject: "Problème de livraison",
    content: "Bonjour, je n'ai pas reçu ma commande.",
    date: "2026-01-18T10:30:00",
    status: "nouveau",
    history: [
      { date: "2026-01-18T10:30:00", content: "Bonjour, je n'ai pas reçu ma commande.", from: "user" },
    ],
  },
  {
    id: 2,
    name: "Lucas Petit",
    email: "lucas@mail.com",
    subject: "Demande de facture",
    content: "Pouvez-vous m'envoyer la facture de ma dernière commande ?",
    date: "2026-01-17T15:00:00",
    status: "en cours",
    history: [
      { date: "2026-01-17T15:00:00", content: "Pouvez-vous m'envoyer la facture de ma dernière commande ?", from: "user" },
      { date: "2026-01-17T16:00:00", content: "Bonjour Lucas, la facture est en pièce jointe.", from: "admin" },
    ],
  },
];

function MessageRow({ message, onView, onDelete, onStatus, onArchive }: {
  readonly message: Readonly<Message>;
  readonly onView: (message: Message) => void;
  readonly onDelete: (id: number) => void;
  readonly onStatus: (id: number, status: Message["status"]) => void;
  readonly onArchive: (id: number) => void;
}) {
  return (
    <tr className="border-b">
      <td className="p-3 max-w-[120px] truncate">{message.name}</td>
      <td className="p-3 max-w-[160px] truncate">{message.email}</td>
      <td className="p-3 max-w-[120px] truncate">{message.subject}</td>
      <td className="p-3 text-xs md:text-sm">{new Date(message.date).toLocaleDateString('fr-FR')}<br className="md:hidden" /><span className="hidden md:inline"> {new Date(message.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span></td>
      <td className="p-3 capitalize">
        <select
          value={message.status}
          onChange={e => onStatus(message.id, e.target.value as Message["status"])}
          className="rounded border border-gray-300 px-2 py-1 text-xs md:text-base"
        >
          <option value="nouveau">Nouveau</option>
          <option value="en cours">En cours</option>
          <option value="résolu">Résolu</option>
          <option value="archivé">Archivé</option>
        </select>
      </td>
      <td className="p-3 flex gap-2 flex-wrap items-center">
        <button onClick={() => onView(message)} title="Voir" className="focus:outline-none hover:text-blue-700 transition" style={{ background: "none", border: "none", padding: 0 }}>
          <FaEye className="text-blue-600 text-lg" />
        </button>
        <button onClick={() => onArchive(message.id)} title="Archiver" className="focus:outline-none hover:text-gray-700 transition" style={{ background: "none", border: "none", padding: 0 }}>
          <FaArchive className="text-gray-500 text-lg" />
        </button>
        <button onClick={() => onDelete(message.id)} title="Supprimer" className="focus:outline-none hover:text-red-700 transition" style={{ background: "none", border: "none", padding: 0 }}>
          <FaTrash className="text-red-500 text-lg" />
        </button>
      </td>
    </tr>
  );
}

function MessageHistory({ history }: { readonly history?: ReadonlyArray<{ date: string; content: string; from: "admin" | "user" }> }) {
  if (!history?.length) return null;
  return (
    <div className="space-y-2 mt-2">
      {history.map((h, idx) => (
        <div key={idx} className={h.from === "admin" ? "text-right" : "text-left"}>
          <div className={"inline-block px-3 py-2 rounded-lg " + (h.from === "admin" ? "bg-blue-50 text-blue-900" : "bg-gray-100 text-gray-800") }>
            <span className="block text-xs text-gray-400 mb-1">{new Date(h.date).toLocaleString('fr-FR')}</span>
            {h.content}
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminMessage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [reply, setReply] = useState("");

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => setMessages((prev) => prev.filter((m) => m.id !== id));
  const handleStatus = (id: number, status: Message["status"]) => setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status } : m));
  const handleArchive = (id: number) => setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: "archivé" } : m));
  const handleView = (message: Message) => { setSelectedMessage(message); setReply(""); };
  const handleReply = () => {
    if (!selectedMessage || !reply.trim()) return;
    setMessages((prev) => prev.map((m) => m.id === selectedMessage.id ? {
      ...m,
      history: [
        ...(m.history || []),
        { date: new Date().toISOString(), content: reply, from: "admin" }
      ],
      status: "en cours"
    } : m));
    setReply("");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-8 font-sans">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
        Messages / Support
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <input
          type="text"
          placeholder="Rechercher par nom, email ou sujet..."
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
              <th className="bg-blue-50 font-semibold p-3 text-left">Sujet</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Date</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Statut</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((m) => (
              <MessageRow
                key={m.id}
                message={m}
                onView={handleView}
                onDelete={handleDelete}
                onStatus={handleStatus}
                onArchive={handleArchive}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal détail message */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 relative">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-2 right-2 text-3xl focus:outline-none"
              style={{ background: "none", border: "none", color: "#111", padding: 0 }}
              title="Fermer"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-2">{selectedMessage.subject}</h3>
            <div className="mb-2 text-sm text-gray-700">
              <div><span className="font-semibold">De :</span> {selectedMessage.name} ({selectedMessage.email})</div>
              <div><span className="font-semibold">Date :</span> {new Date(selectedMessage.date).toLocaleString('fr-FR')}</div>
              <div><span className="font-semibold">Statut :</span> {selectedMessage.status}</div>
            </div>
            <div>
              <span className="font-semibold">Conversation :</span>
              <MessageHistory history={selectedMessage.history} />
            </div>
            <div className="mt-4">
              <textarea
                value={reply}
                onChange={e => setReply(e.target.value)}
                placeholder="Votre réponse..."
                className="w-full border border-gray-300 rounded p-2 text-sm mb-2"
                rows={3}
              />
              <button
                onClick={handleReply}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
              >
                <FaReply /> Répondre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMessage;