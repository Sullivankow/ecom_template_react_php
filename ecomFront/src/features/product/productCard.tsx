

import Button from "../../components/ui/button";

// Définition des props attendues pour la fiche produit
interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  description: string;
}

// Composant réutilisable pour une fiche produit e-commerce
const ProductCard = ({ image, title, price, description }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col w-full max-w-xs mx-auto sm:max-w-sm transition hover:scale-[1.02] hover:shadow-xl">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover object-center"
      />
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">{title}</h2>
        <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-semibold text-black">{price.toFixed(2)} €</span>
          {/* Bouton avec icône + pour ajouter au panier */}
          <Button className="px-2 py-1 text-lg rounded-full flex items-center justify-center" aria-label="Ajouter au panier">
            {/* Icône plus (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


