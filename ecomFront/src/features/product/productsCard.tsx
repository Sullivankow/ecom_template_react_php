
import Button from "../../components/ui/button";
import { Link } from "react-router-dom";


// Définition des props attendues pour la fiche produit
interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  promoPrice?: number;
  isPromo?: boolean;
}

// Composant réutilisable pour une fiche produit e-commerce
const ProductCard = ({ id, image, title, price, description, promoPrice, isPromo }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="block group focus:outline-none">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col w-full max-w-xs mx-auto sm:max-w-sm transition hover:scale-[1.02] hover:shadow-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover object-center group-hover:brightness-90 transition"
        />
        <div className="flex flex-col flex-1 p-4 gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 flex items-center gap-2">
            {title}
            {/* Badge promo */}
            {isPromo && (
              <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">Promo</span>
            )}
          </h2>
          <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
          <div className="flex items-center justify-between mt-2">
            {/* Affichage prix promo et barré */}
            {isPromo && promoPrice !== undefined && promoPrice < price ? (
              <span>
                <span className="line-through text-gray-400 mr-2">{price.toFixed(2)} €</span>
                <span className="text-red-600 font-extrabold text-xl">{promoPrice.toFixed(2)} €</span>
              </span>
            ) : (
              <span className="text-black font-semibold">{price.toFixed(2)} €</span>
            )}
            {/* Bouton avec icône + pour ajouter au panier */}
            <Button className="px-2 py-1 text-lg rounded-full flex items-center justify-center" aria-label="Ajouter au panier" onClick={e => { e.preventDefault(); /* Ajout panier ici */ }}>
              {/* Icône plus (SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;




