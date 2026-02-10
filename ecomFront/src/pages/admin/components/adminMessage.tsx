
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
      {/* Cards responsive */}
      <div className="flex flex-col gap-4 mt-6">
        {filteredMessages.length === 0 ? (
          <div className="text-center p-4 bg-white rounded shadow">Aucun message trouvé.</div>
        ) : (
          filteredMessages.map((m) => (
            <div key={m.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-200">
              <div className="font-semibold text-base mb-1">{m.subject}</div>
              <div className="text-sm text-gray-600 mb-1">De : <span className="font-medium">{m.name}</span> (<span className="font-medium">{m.email}</span>)</div>
              <div className="text-sm text-gray-600 mb-1">Date : <span className="font-medium">{new Date(m.date).toLocaleString('fr-FR')}</span></div>
              <div className="text-sm text-gray-600 mb-1">
                Statut :
                <select
                  value={m.status}
                  onChange={e => handleStatus(m.id, e.target.value as Message["status"])}
                  className="rounded border border-gray-300 px-2 py-1 text-xs md:text-base ml-2 capitalize"
                >
                  <option value="nouveau">Nouveau</option>
                  <option value="en cours">En cours</option>
                  <option value="résolu">Résolu</option>
                  <option value="archivé">Archivé</option>
                </select>
              </div>
              <div className="text-sm text-gray-600 mb-1">Message : <span className="font-medium">{m.content}</span></div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleView(m)}
                  title="Voir"
                  className="p-2 rounded-full hover:bg-blue-100 transition"
                  style={{ color: '#2563eb', background: '#fff' }}
                >
                  <FaEye size={18} />
                </button>
                <button
                  onClick={() => handleArchive(m.id)}
                  title="Archiver"
                  className="p-2 rounded-full hover:bg-gray-200 transition"
                  style={{ color: '#6b7280', background: '#fff' }}
                >
                  <FaArchive size={18} />
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  title="Supprimer"
                  className="p-2 rounded-full hover:bg-red-100 transition"
                  style={{ color: '#e3342f', background: '#fff' }}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))
        )}
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