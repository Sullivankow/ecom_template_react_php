import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

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
				<h2 className="text-xl md:text-2xl font-bold mb-4 text-black text-center sm:text-left">Gestion des stocks</h2>
				{/* Responsive : tableau sur desktop, cartes sur mobile */}
				<div className="hidden sm:block overflow-x-auto rounded-lg shadow-sm">
					<table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
						<thead>
							<tr className="bg-gray-100">
								<th className="p-3 border text-left font-semibold text-gray-700">Nom</th>
								<th className="p-3 border text-left font-semibold text-gray-700">Catégorie</th>
								<th className="p-3 border text-center font-semibold text-gray-700">Stock</th>
								<th className="p-3 border text-center font-semibold text-gray-700">Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredProducts.map((p) => {
								let rowClass = "";
								if (p.stock === 0) {
									rowClass = "bg-red-50 text-red-700";
								} else if (p.stock < 5) {
									rowClass = "bg-yellow-50";
								}
								return (
									<tr key={p.id} className={rowClass + " hover:bg-gray-100 transition-all"}>
										<td className="p-3 border font-medium text-black align-middle whitespace-nowrap">{p.nom}</td>
										<td className="p-3 border text-gray-700 align-middle whitespace-nowrap">{p.categorie}</td>
										<td className="p-3 border text-center align-middle">
											<span className="font-bold text-gray-700">{p.stock}</span>
											{p.stock === 0 && (
												<span className="ml-2 text-xs font-semibold text-red-600">(Épuisé)</span>
											)}
											{p.stock > 0 && p.stock < 5 && (
												<span className="ml-2 text-xs font-semibold text-yellow-600">(Faible)</span>
											)}
										</td>
										<td className="p-3 border text-center align-middle">
											<div className="flex items-center gap-2 mt-2">
												<input
													type="number"
													min="0"
													value={p.stock}
													onChange={(e) => updateStock(p.id, Number(e.target.value))}
													className="w-20 px-2 py-1 rounded border border-gray-300 text-base focus:border-blue-500"
												/>
												<button title="Modifier" className="p-2 rounded-full hover:bg-blue-100 transition" style={{ color: '#2563eb', background: '#fff' }}>
													<FaEdit size={18} />
												</button>
												<button title="Supprimer" className="p-2 rounded-full hover:bg-red-100 transition" style={{ color: '#e3342f', background: '#fff' }}>
													<FaTrash size={18} />
												</button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{/* Cartes sur mobile */}
				<div className="sm:hidden flex flex-col gap-4">
					{filteredProducts.map((p) => (
						<div key={p.id} className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2 ${p.stock === 0 ? 'bg-red-50' : p.stock < 5 ? 'bg-yellow-50' : ''}`}>
							<div className="flex justify-between items-center mb-2">
								<span className="font-semibold text-black text-base">{p.nom}</span>
								<span className="text-xs font-medium text-gray-500">{p.categorie}</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-base font-bold text-gray-700">Stock : {p.stock}</span>
								{p.stock === 0 && <span className="text-xs font-semibold text-red-600">(Épuisé)</span>}
								{p.stock > 0 && p.stock < 5 && <span className="text-xs font-semibold text-yellow-600">(Faible)</span>}
							</div>
							<div className="flex items-center gap-2 mt-2">
								<input
									type="number"
									min="0"
									value={p.stock}
									onChange={(e) => updateStock(p.id, Number(e.target.value))}
									className="w-20 px-2 py-1 rounded border border-gray-300 text-base focus:border-blue-500"
								/>
								<button title="Modifier" className="p-2 rounded-full hover:bg-blue-100 transition" style={{ color: '#2563eb', background: '#fff' }}>
									<FaEdit size={18} />
								</button>
								<button title="Supprimer" className="p-2 rounded-full hover:bg-red-100 transition" style={{ color: '#e3342f', background: '#fff' }}>
									<FaTrash size={18} />
								</button>
							</div>
						</div>
					))}
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

