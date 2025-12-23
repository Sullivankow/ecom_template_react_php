import Button from "../../components/ui/button";
import ProductCard from "../../features/product/productsCard";

// Tableau de produits best sellers (données en dur)
const products = [
	{
		image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
		title: "Jean slim classique",
		price: 59.99,
		description: "Jean coupe slim, denim stretch confortable, indémodable pour tous les styles.",
	},
	{
		image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
		title: "T-shirt oversize unisexe",
		price: 29.99,
		description: "T-shirt 100% coton bio, coupe moderne et confortable. Disponible en plusieurs couleurs.",
	},
	{
		image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
		title: "Chemise lin homme",
		price: 49.99,
		description: "Chemise légère en lin naturel, idéale pour l'été. Plusieurs tailles disponibles.",
	},
	{
		image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
		title: "Robe fluide femme",
		price: 39.99,
		description: "Robe élégante et confortable, tissu doux et respirant. Parfaite pour toutes occasions.",
    },
    {
		image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
		title: "Robe fluide femme",
		price: 39.99,
		description: "Robe élégante et confortable, tissu doux et respirant. Parfaite pour toutes occasions.",
    },
    {
		image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
		title: "Robe fluide femme",
		price: 39.99,
		description: "Robe élégante et confortable, tissu doux et respirant. Parfaite pour toutes occasions.",
	},
	
];

// Composant BestSellerSection : section scrollable horizontalement
export default function BestSellerSection() {
	return (
		<section className="py-12 px-4 bg-gray-50">
			{/* Titre de la section */}
			<h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-900">Nos best sellers</h2>

			{/* Liste de produits scrollable horizontalement */}
			{/* Grille de 4 produits maximum */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto py-2">
				{products.slice(0, 4).map((p, idx) => (
					<div key={idx} className="w-full">
						<ProductCard {...p} />
					</div>
				))}
			</div>

			{/* Bouton voir tout */}
			<div className="flex justify-center mt-6">
				<Button className="px-6 py-2 text-base font-semibold" onClick={() => window.location.href = '#'}>
					Voir tout
				</Button>
			</div>

	
		</section>
	);
}

