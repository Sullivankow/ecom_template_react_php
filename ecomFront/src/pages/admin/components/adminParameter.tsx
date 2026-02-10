import React, { useState } from "react";



export default function AdminParameter() {
	// États pour chaque catégorie de paramètres
	const [siteName, setSiteName] = useState("Ecom-template");
	const [siteEmail, setSiteEmail] = useState("contact@ecom.com");
	const [sitePhone, setSitePhone] = useState("0123456789");
	const [paymentEnabled, setPaymentEnabled] = useState({ stripe: true, paypal: false });
	const [deliveryFee, setDeliveryFee] = useState(5);
	const [promoEnabled, setPromoEnabled] = useState(true);
	// Ajoute d'autres états selon besoin

	// Gestion de la sauvegarde (simulation)
	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		alert("Paramètres sauvegardés !");
	};

	return (
		<div className="admin-parameter-section max-w-xl mx-auto p-8 bg-gray-50 rounded-2xl shadow-lg border border-gray-200">
			<h2 className="text-xl md:text-2xl font-bold mb-8 text-center sm:text-left text-black">Gestion des paramètres</h2>
			<form onSubmit={handleSave} className="parameter-form space-y-6">
				{/* Informations générales */}
				<fieldset className="border border-gray-200 rounded-xl p-4 bg-white">
					<legend className="font-semibold text-blue-600 mb-2">Informations générales</legend>
					<label className="block mb-3 text-gray-700">
						Nom du site
						<input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-600 focus:ring-blue-600" />
					</label>
					<label className="block mb-3 text-gray-700">
						Email
						<input type="email" value={siteEmail} onChange={e => setSiteEmail(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-600 focus:ring-blue-600" />
					</label>
					<label className="block mb-3 text-gray-700">
						Téléphone
						<input type="tel" value={sitePhone} onChange={e => setSitePhone(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-600 focus:ring-blue-600" />
					</label>
				</fieldset>

				{/* Paiement */}
				<fieldset className="border border-gray-200 rounded-xl p-4 bg-white">
					<legend className="font-semibold text-blue-600 mb-2">Paiement</legend>
					<label className="flex items-center mb-2 text-gray-700">
						<input type="checkbox" checked={paymentEnabled.stripe} onChange={e => setPaymentEnabled({ ...paymentEnabled, stripe: e.target.checked })} className="mr-2 accent-blue-600" />
						Stripe
					</label>
					<label className="flex items-center text-gray-700">
						<input type="checkbox" checked={paymentEnabled.paypal} onChange={e => setPaymentEnabled({ ...paymentEnabled, paypal: e.target.checked })} className="mr-2 accent-blue-600" />
						PayPal
					</label>
				</fieldset>

				{/* Livraison */}
				<fieldset className="border border-gray-200 rounded-xl p-4 bg-white">
					<legend className="font-semibold text-blue-600 mb-2">Livraison</legend>
					<label className="block text-gray-700">
						Frais de livraison (€)
						<input type="number" min="0" value={deliveryFee} onChange={e => setDeliveryFee(Number(e.target.value))} className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:border-blue-600 focus:ring-blue-600" />
					</label>
				</fieldset>

				{/* Promotions */}
				<fieldset className="border border-gray-200 rounded-xl p-4 bg-white">
					<legend className="font-semibold text-blue-600 mb-2">Promotions</legend>
					<label className="flex items-center text-gray-700">
						<input type="checkbox" checked={promoEnabled} onChange={e => setPromoEnabled(e.target.checked)} className="mr-2 accent-blue-600" />
						Activer les codes promo
					</label>
				</fieldset>

				<button type="submit" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold">Sauvegarder</button>
			</form>
		</div>
	);
}


