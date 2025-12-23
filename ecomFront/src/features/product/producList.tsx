import { products } from '../../lib/product';
import ProductCard from './productsCard';


// Composant pour afficher la liste des produits
export const ProductList = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {products.map(product => (
      <ProductCard
        key={product.id}
        image={product.image}
        title={product.name}
        price={product.price}
        description={product.description}
      />
    ))}
  </div>
);

export default ProductList;