import { useState } from "react";
import { products } from "../../lib/product";
import ProductList from "../../features/product/producList";
import Header from "../../components/layout/headers";
import Topbar from "../../components/layout/topbar";
import Footer from "../../components/layout/footer";

// Liste des catégories extraites des produits (à adapter selon structure réelle)
const categories = [
  ...new Set(products.map((p) => p.name.split(" ")[1])) // Ex: "Nike", "Addidas", etc.
];

// Composant principal du catalogue avec filtres
function Catalog() {
  // État pour le texte de recherche
  const [search, setSearch] = useState("");
  // État pour la catégorie sélectionnée
  const [category, setCategory] = useState("");
  // État pour le prix maximum (slider)
  const [maxPrice, setMaxPrice] = useState(() => Math.max(...products.map(p => p.price)));

  // Fonction de filtrage des produits selon les filtres actifs
  const filteredProducts = products.filter((product) => {
    // Filtre par recherche texte
    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
    // Filtre par catégorie (si sélectionnée)
    const matchCategory = category ? product.name.toLowerCase().includes(category.toLowerCase()) : true;
    // Filtre par prix max
    const matchPrice = product.price <= maxPrice;
    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <div id="catalog">
      {/* Barre promotionnelle en haut */}
      <Topbar />
      {/* Header/navigation */}
      <Header />
      {/* Contenu principal */}
      <div className="px-2 py-4 max-w-7xl mx-auto">
        {/* Layout principal : sidebar filtres à gauche, produits à droite */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filtres */}
          <aside className="md:w-1/4 w-full bg-white rounded-xl shadow p-4 flex flex-col gap-6 mb-4 md:mb-0">
            {/* Filtre recherche texte */}
            <div>
              <label htmlFor="search-input" className="block text-sm font-medium text-black mb-1">Rechercher</label>
              <input
                id="search-input"
                type="text"
                placeholder="Nom du produit..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition text-black placeholder-gray-400"
              />
            </div>
            {/* Filtre catégorie */}
            <div>
              <label htmlFor="category-select" className="block text-sm font-medium text-black mb-1">Catégorie</label>
              <select
                id="category-select"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black transition text-black"
              >
                <option value="">Toutes</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {/* Filtre prix max */}
            <div>
              <label htmlFor="price-range" className="block text-sm font-medium text-black mb-1">Prix maximum : {maxPrice} €</label>
              <input
                id="price-range"
                type="range"
                min={Math.min(...products.map(p => p.price))}
                max={Math.max(...products.map(p => p.price))}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black"
              />
            </div>
          </aside>
          {/* Zone produits */}
          <main className="flex-1">
            <ProductList products={filteredProducts} />
            {/* Message si aucun produit */}
            {filteredProducts.length === 0 && (
              <div className="text-center text-gray-500 py-10">Aucun produit ne correspond à vos critères.</div>
            )}
          </main>
        </div>
          </div>
          <Footer />
    </div>
  );
}

export default Catalog;
