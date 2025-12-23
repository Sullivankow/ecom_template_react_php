import { useState } from "react";


import ProductList from "../../features/product/producList";
import { products } from "../../lib/product";
import Header from "../../components/layout/headers";
import Topbar from "../../components/layout/topbar";
import Footer from "../../components/layout/footer";
import FilterSidebar from "../../components/filters/filterSidebar";

// Page qui affiche uniquement les produits en promotion
// Liste des catégories extraites des produits en promo
const promoCategories = [
  ...new Set(products.filter(p => p.isPromo && p.promoPrice !== undefined && p.promoPrice < p.price).map((p) => p.name.split(" ")[1]))
];

function ProductPromo() {
  // États pour les filtres
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  // On récupère tous les prix soldés pour le slider
  const allPromoPrices = products.filter(p => p.isPromo && p.promoPrice !== undefined && p.promoPrice < p.price).map(p => p.promoPrice ?? 0);
  const minPromoPrice = allPromoPrices.length ? Math.min(...allPromoPrices) : 0;
  const maxPromoPrice = allPromoPrices.length ? Math.max(...allPromoPrices) : 0;
  const [maxPrice, setMaxPrice] = useState(maxPromoPrice);

  // Filtrage des produits en promo selon les filtres
  const promoProducts = products.filter(p => {
    const isPromo = p.isPromo && p.promoPrice !== undefined && p.promoPrice < p.price;
    if (!isPromo) return false;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category ? p.name.toLowerCase().includes(category.toLowerCase()) : true;
    const matchPrice = p.promoPrice !== undefined && p.promoPrice <= maxPrice;
    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <div id="product-promo">
      <Topbar />
      <Header />
      <div className="px-2 py-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-black">Nos promotions du moment</h1>
        {/* Filtres en sidebar à gauche, produits à droite */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar filtres */}
          <FilterSidebar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={promoCategories}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minPrice={minPromoPrice}
            maxPriceLimit={maxPromoPrice}
          />
          {/* Zone produits */}
          <main className="flex-1">
            <ProductList products={promoProducts} />
            {/* Message si aucune promo */}
            {promoProducts.length === 0 && (
              <div className="text-center text-gray-500 py-10">Aucune promotion en cours.</div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductPromo;