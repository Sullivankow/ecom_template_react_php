import { useState } from "react";
import { products } from "../../lib/product";
import ProductList from "../../features/product/producList";
import Header from "../../components/layout/headers";
import Topbar from "../../components/layout/topbar";
import FilterSidebar from "../../components/filters/filterSidebar";
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
          {/* Sidebar filtres centralisée */}
          <FilterSidebar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={categories}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minPrice={Math.min(...products.map(p => p.price))}
            maxPriceLimit={Math.max(...products.map(p => p.price))}
          />
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
