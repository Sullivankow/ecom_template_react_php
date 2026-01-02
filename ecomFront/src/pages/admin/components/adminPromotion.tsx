
import { useState } from "react";
import { FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

// Définition du type Promotion
// type: 'pourcentage' | 'montant' | 'livraison'
type Promotion = {
  id: number;
  nom: string;
  description: string;
  type: string;
  valeur: number;
  dateDebut: string;
  dateFin: string;
  produits: string[];
  actif: boolean;
};

// Exemple de données promotions (à remplacer par des données réelles)
const initialPromotions: Promotion[] = [
  {
    id: 1,
    nom: "Promo Nouvel An",
    description: "-20% sur tout le site",
    type: "pourcentage",
    valeur: 20,
    dateDebut: "2026-01-01",
    dateFin: "2026-01-10",
    produits: ["Tous"],
    actif: true,
  },
  {
    id: 2,
    nom: "Livraison offerte",
    description: "Livraison gratuite dès 50€",
    type: "livraison",
    valeur: 0,
    dateDebut: "2026-01-05",
    dateFin: "2026-01-20",
    produits: ["Catégorie Chaussures"],
    actif: false,
  },
];

function AdminPromotion() {
  // État des promotions
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newPromo, setNewPromo] = useState<Omit<Promotion, "id">>({
    nom: "",
    description: "",
    type: "pourcentage",
    valeur: 0,
    dateDebut: "",
    dateFin: "",
    produits: [],
    actif: true,
  });

  // Filtrage des promotions selon la recherche
  const filteredPromos = promotions.filter((p) =>
    p.nom.toLowerCase().includes(search.toLowerCase()) ||
    p.type.toLowerCase().includes(search.toLowerCase())
  );

  // Ajout d'une nouvelle promotion
  const handleAddPromo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPromotions([
      ...promotions,
      { ...newPromo, id: Date.now() },
    ]);
    setNewPromo({
      nom: "",
      description: "",
      type: "pourcentage",
      valeur: 0,
      dateDebut: "",
      dateFin: "",
      produits: [],
      actif: true,
    });
    setShowForm(false);
  };

  // Activation/désactivation d'une promo
  const toggleActive = (id: number) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, actif: !p.actif } : p))
    );
  };

  // Suppression d'une promo
  const deletePromo = (id: number) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 font-sans">
      {/* Titre principal */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Gestion des promotions</h2>

      {/* Barre de recherche et bouton d'ajout */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher une promotion..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-base"
        />
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
        >
          {showForm ? "Fermer le formulaire" : "Ajouter une promotion"}
        </button>
      </div>

      {/* Formulaire d'ajout de promotion */}
      {showForm && (
        <form onSubmit={handleAddPromo} className="bg-blue-50 rounded-lg p-5 mb-8 shadow flex flex-col gap-4">
          {/* Ligne 1 : nom et description */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Nom de la promotion"
              value={newPromo.nom}
              onChange={(e) => setNewPromo({ ...newPromo, nom: e.target.value })}
              required
              className="flex-1 px-3 py-2 rounded border border-gray-300 text-base"
            />
            <input
              type="text"
              placeholder="Description"
              value={newPromo.description}
              onChange={(e) => setNewPromo({ ...newPromo, description: e.target.value })}
              required
              className="flex-1 px-3 py-2 rounded border border-gray-300 text-base"
            />
          </div>
          {/* Ligne 2 : type, valeur, produits/catégories */}
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={newPromo.type}
              onChange={(e) => setNewPromo({ ...newPromo, type: e.target.value })}
              className="flex-1 px-3 py-2 rounded border border-gray-300 text-base"
            >
              <option value="pourcentage">Pourcentage (%)</option>
              <option value="montant">Montant fixe (€)</option>
              <option value="livraison">Livraison offerte</option>
            </select>
            <input
              type="number"
              placeholder={newPromo.type === "pourcentage" ? "%" : "€"}
              value={newPromo.valeur}
              onChange={(e) => setNewPromo({ ...newPromo, valeur: Number(e.target.value) })}
              className="flex-1 px-3 py-2 rounded border border-gray-300 text-base"
              min={0}
              disabled={newPromo.type === "livraison"}
            />
            <input
              type="text"
              placeholder="Produits/Catégories concernés (séparés par ,)"
              value={newPromo.produits.join(", ")}
              onChange={(e) => setNewPromo({ ...newPromo, produits: e.target.value.split(",").map(s => s.trim()) })}
              className="flex-1 px-3 py-2 rounded border border-gray-300 text-base"
            />
          </div>
          {/* Ligne 3 : dates */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              value={newPromo.dateDebut}
              onChange={(e) => setNewPromo({ ...newPromo, dateDebut: e.target.value })}
              className="flex-1 px-3 py-2 rounded border border-gray-300 text-base"
              required
            />
            <input
              type="date"
              value={newPromo.dateFin}
              onChange={(e) => setNewPromo({ ...newPromo, dateFin: e.target.value })}
              className="flex-1 px-3 py-2 rounded border border-gray-300 text-base"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition self-end"
          >
            Ajouter la promotion
          </button>
        </form>
      )}

      {/* Tableau des promotions */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-gray-50 rounded-lg">
          <thead>
            <tr>
              <th className="bg-blue-50 font-semibold p-3 text-left">Nom</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Type</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Valeur</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Période</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Produits/Catégories</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Statut</th>
              <th className="bg-blue-50 font-semibold p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromos.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.nom}</td>
                <td className="p-3 capitalize">{p.type}</td>
                <td className="p-3">
                  {p.type === "pourcentage" && `${p.valeur} %`}
                  {p.type === "montant" && `${p.valeur} €`}
                  {p.type === "livraison" && "Offerte"}
                </td>
                <td className="p-3">{p.dateDebut} → {p.dateFin}</td>
                <td className="p-3 text-sm">{p.produits.join(", ")}</td>
                <td className="p-3">
                  <span className={p.actif ? "text-green-600 font-semibold" : "text-gray-400 font-semibold"}>
                    {p.actif ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="p-3 flex gap-3 flex-wrap items-center">
                  {/* Icône switch pour activer/désactiver */}
                  <button
                    onClick={() => toggleActive(p.id)}
                    title={p.actif ? "Désactiver" : "Activer"}
                    className="focus:outline-none"
                  >
                    {p.actif ? (
                      <FaToggleOn className="text-2xl text-green-500 hover:text-green-700 transition" />
                    ) : (
                      <FaToggleOff className="text-2xl text-gray-400 hover:text-green-500 transition" />
                    )}
                  </button>
                  {/* Icône corbeille rouge pour supprimer */}
                  <button
                    onClick={() => deletePromo(p.id)}
                    title="Supprimer"
                    className="focus:outline-none"
                  >
                    <FaTrash className="text-2xl text-red-500 hover:text-red-700 transition" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPromotion;