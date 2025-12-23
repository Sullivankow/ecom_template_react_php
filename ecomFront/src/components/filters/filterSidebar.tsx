import React from "react";

// Props attendues pour le composant de filtres
interface FilterSidebarProps {
	search: string;
	setSearch: (value: string) => void;
	category: string;
	setCategory: (value: string) => void;
	categories: string[];
	maxPrice: number;
	setMaxPrice: (value: number) => void;
	minPrice: number;
	maxPriceLimit: number;
}

/**
 * Composant réutilisable pour la sidebar de filtres produits (recherche, catégorie, prix max)
 * Utilisable dans catalog, productPromo, etc.
 */
const FilterSidebar: React.FC<FilterSidebarProps> = ({
	search,
	setSearch,
	category,
	setCategory,
	categories,
	maxPrice,
	setMaxPrice,
	minPrice,
	maxPriceLimit,
}) => {
	return (
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
					min={minPrice}
					max={maxPriceLimit}
					value={maxPrice}
					onChange={e => setMaxPrice(Number(e.target.value))}
					className="w-full accent-black"
				/>
			</div>
		</aside>
	);
};

export default FilterSidebar;
