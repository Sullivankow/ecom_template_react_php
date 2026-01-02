
import { useState } from "react";

// Définition du type Produit
type Produit = {
	id: number;
	nom: string;
	categorie: string;
	stock: number;
};

// Exemple de données produits (à remplacer par des données réelles)
const initialProducts: Produit[] = [
	{ id: 1, nom: "Produit A", categorie: "Catégorie 1", stock: 12 },
	{ id: 2, nom: "Produit B", categorie: "Catégorie 2", stock: 3 },
	{ id: 3, nom: "Produit C", categorie: "Catégorie 1", stock: 0 },
];

function AdminStock() {
	// État des produits
	const [products, setProducts] = useState<Produit[]>(initialProducts);
	const [search, setSearch] = useState<string>("");
	const [newProduct, setNewProduct] = useState<Omit<Produit, "id">>({ nom: "", categorie: "", stock: 0 });

	// Filtrage des produits selon la recherche
	const filteredProducts = products.filter(
		(p) =>
			p.nom.toLowerCase().includes(search.toLowerCase()) ||
			p.categorie.toLowerCase().includes(search.toLowerCase())
	);

	// Modification du stock
	const updateStock = (id: number, value: number) => {
		setProducts((prev) =>
			prev.map((p) => (p.id === id ? { ...p, stock: value } : p))
		);
	};

	// Ajout d'un nouveau produit
	const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newProduct.nom || !newProduct.categorie) return;
		setProducts([
			...products,
			{ ...newProduct, id: Date.now() },
		]);
		setNewProduct({ nom: "", categorie: "", stock: 0 });
	};

	return (
		<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 font-sans">
			{/* Titre principal */}
			<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Gestion des stocks</h2>

			{/* Section recherche et filtrage */}
			<div className="flex justify-end mb-6">
				<input
					type="text"
					placeholder="Rechercher par nom ou catégorie..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-base"
				/>
			</div>

			{/* Liste des produits avec leur stock actuel */}
			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-4 text-blue-700">Gestion des stocks</h2>
				<div className="overflow-x-auto">
					<table className="w-full border-collapse bg-gray-50 rounded-lg">
						<thead>
							<tr>
								<th className="bg-blue-50 font-semibold p-3 text-left">Nom</th>
								<th className="bg-blue-50 font-semibold p-3 text-left">Catégorie</th>
								<th className="bg-blue-50 font-semibold p-3 text-left">Stock</th>
								<th className="bg-blue-50 font-semibold p-3 text-left">Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredProducts.map((p) => {
								// Extraction de la classe de ligne selon le stock
								let rowClass = "";
								if (p.stock === 0) {
									rowClass = "bg-red-50 text-red-700";
								} else if (p.stock < 5) {
									rowClass = "bg-yellow-50";
								}
								return (
									<tr key={p.id} className={rowClass}>
										<td className="p-3">{p.nom}</td>
										<td className="p-3">{p.categorie}</td>
										<td className="p-3">
											{p.stock}
											{p.stock === 0 && (
												<span className="ml-2 text-xs font-semibold text-red-600">(Épuisé)</span>
											)}
											{p.stock > 0 && p.stock < 5 && (
												<span className="ml-2 text-xs font-semibold text-yellow-600">(Faible)</span>
											)}
										</td>
										<td className="p-3">
											<input
												type="number"
												min="0"
												value={p.stock}
												onChange={(e) => updateStock(p.id, Number(e.target.value))}
												className="w-20 px-2 py-1 rounded border border-gray-300 text-base focus:border-blue-500"
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>

			{/* Ajout de nouveaux produits au stock */}
			<div className="bg-blue-50 rounded-lg p-5 mb-8 shadow">
				<h3 className="text-lg font-semibold mb-3 text-blue-600">Ajouter un produit</h3>
				<form onSubmit={handleAddProduct} className="flex flex-wrap gap-4">
					<input
						type="text"
						placeholder="Nom du produit"
						value={newProduct.nom}
						onChange={(e) => setNewProduct({ ...newProduct, nom: e.target.value })}
						required
						className="flex-1 min-w-[120px] px-3 py-2 rounded border border-gray-300 text-base"
					/>
					<input
						type="text"
						placeholder="Catégorie"
						value={newProduct.categorie}
						onChange={(e) => setNewProduct({ ...newProduct, categorie: e.target.value })}
						required
						className="flex-1 min-w-[120px] px-3 py-2 rounded border border-gray-300 text-base"
					/>
					<input
						type="number"
						min="0"
						placeholder="Stock initial"
						value={newProduct.stock}
						onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
						required
						className="w-24 px-3 py-2 rounded border border-gray-300 text-base"
					/>
					<button
						type="submit"
						className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition"
					>
						Ajouter
					</button>
				</form>
			</div>

			{/* Historique des mouvements de stock (exemple statique) */}
			<div className="bg-gray-100 rounded-lg p-5 shadow">
				<h3 className="text-lg font-semibold mb-3 text-gray-700">Historique des mouvements</h3>
				<ul className="list-none m-0 p-0">
					<li className="py-1 text-gray-600">02/01/2026 : +5 Produit A</li>
					<li className="py-1 text-gray-600">01/01/2026 : -2 Produit B</li>
				</ul>
			</div>
		</div>
	);
}

export default AdminStock;

