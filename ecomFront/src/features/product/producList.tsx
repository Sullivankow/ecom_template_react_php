import ProductCard from './productsCard';

// Définition du type pour la prop products
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  promoPrice?: number;
  isPromo?: boolean;
}

// Composant pour afficher la liste des produits filtrés
// Reçoit la liste des produits à afficher en prop
const ProductList = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map(product => (
      <ProductCard
        key={product.id}
        image={product.image}
        title={product.name}
        price={product.price}
        description={product.description}
        promoPrice={product.promoPrice}
        isPromo={product.isPromo}
      />
    ))}
  </div>
);

export default ProductList;