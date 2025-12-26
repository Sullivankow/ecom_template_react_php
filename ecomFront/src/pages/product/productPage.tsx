
import { useParams, Link } from 'react-router-dom';
import { products } from '../../lib/product';
import Topbar from '../../components/layout/topbar';
import Header from '../../components/layout/headers';
import Footer from '../../components/layout/footer';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Topbar />
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-bold text-black mb-4">Produit introuvable</h1>
          <Link to="/catalog" className="text-blue-600 hover:underline">Retour au catalogue</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Topbar />
      <Header />
      <main className="flex-1 flex flex-col md:flex-row gap-8 max-w-5xl mx-auto p-4 md:p-10">
        {/* Image produit */}
        <div className="flex-1 flex items-center justify-center mb-6 md:mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-xs md:max-w-md rounded-2xl shadow-lg object-cover object-center bg-gray-100"
          />
        </div>
        {/* Détails produit */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">{product.name}</h1>
          <p className="text-gray-600 text-base mb-2">{product.description}</p>
          <div className="flex items-center gap-4 mb-4">
            {product.isPromo && product.promoPrice !== undefined && product.promoPrice < product.price ? (
              <>
                <span className="line-through text-gray-400 text-lg">{product.price.toFixed(2)} €</span>
                <span className="text-red-600 font-extrabold text-2xl">{product.promoPrice.toFixed(2)} €</span>
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold ml-2">Promo</span>
              </>
            ) : (
              <span className="text-black font-semibold text-2xl">{product.price.toFixed(2)} €</span>
            )}
          </div>
          {/* Bouton ajouter au panier */}
          <button className="w-full md:w-fit bg-black text-white font-semibold rounded-lg py-3 px-8 mt-2 hover:bg-blue-700 transition text-lg shadow">
            Ajouter au panier
          </button>
          {/* Retour catalogue */}
          <Link to="/catalog" className="text-blue-600 hover:underline mt-4">← Retour au catalogue</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;