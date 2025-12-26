




// Import des dépendances et composants nécessaires
import { useSearchParams } from 'react-router-dom';
import { products } from '../../lib/product';
import ProductCard from '../../features/product/productsCard';
import Topbar from '../../components/layout/topbar';
import Header from '../../components/layout/headers';
import Footer from '../../components/layout/footer';


// Composant principal pour afficher les résultats de recherche
const SearchResult: React.FC = () => {
  // Récupère le paramètre de recherche dans l'URL
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('query') || '').toLowerCase();

  // Filtre les produits selon le terme recherché (dans le nom ou la description)
  const filtered = products.filter(
    p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Barre du haut et navigation */}
      <Topbar />
      <Header />
      {/* Contenu principal */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-2 py-8">
        {/* Titre de la page */}
        <h1 className="text-2xl font-bold text-black mb-6">Résultats de recherche</h1>
        {/* Affichage du terme recherché */}
        {query && (
          <p className="mb-4 text-gray-600">Recherche pour : <span className="font-semibold text-black">{query}</span></p>
        )}
        {/* Affichage des résultats ou d'un message si aucun produit */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map(product => (
              // Affiche chaque produit trouvé avec la carte produit
              <ProductCard key={product.id} {...product} title={product.name} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">Aucun produit ne correspond à votre recherche.</div>
        )}
      </main>
      {/* Pied de page */}
      <Footer />
    </div>
  );
};

export default SearchResult;