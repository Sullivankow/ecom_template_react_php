import React, { useState } from "react";
import Topbar from "../layout/topbar";
import Header from "../layout/headers";
import Footer from "../layout/footer";

/**
 * Page de contact e-commerce
 * - Charte graphique : fond blanc, coins arrondis, ombre, accents bleus/noirs
 * - Responsive mobile/desktop
 * - Labels en français, accessibilité
 */
const ContactForm: React.FC = () => {
	// États pour les champs du formulaire
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [sent, setSent] = useState(false);
	const [error, setError] = useState("");

	// Gestion de la soumission du formulaire
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		// Validation simple (à remplacer par une vraie validation si besoin)
		if (!name || !email || !message) {
			setError("Tous les champs sont requis.");
			return;
		}
		// Simule l'envoi
		setSent(true);
		setTimeout(() => {
			setSent(false);
			setName("");
			setEmail("");
			setMessage("");
		}, 2500);
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			<Topbar />
			<Header />
			<main className="flex-1 flex justify-center items-center py-8 px-2">
				<section id="contact" className="w-full flex justify-center items-center">
					<form
						className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-col gap-6"
						onSubmit={handleSubmit}
						aria-label="Formulaire de contact"
					>
						<h2 className="text-2xl font-bold text-black mb-2 text-center">Contactez-nous</h2>
						<p className="text-gray-500 text-center mb-4">Une question ? Un besoin ? Remplissez le formulaire, notre équipe vous répondra rapidement.</p>

						{/* Champ nom */}
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-black mb-1">Nom</label>
							<input
								id="name"
								name="name"
								type="text"
								autoComplete="name"
								value={name}
								onChange={e => setName(e.target.value)}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition text-black placeholder-gray-400"
								placeholder="Votre nom complet"
								required
							/>
						</div>

						{/* Champ email */}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-black mb-1">Email</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition text-black placeholder-gray-400"
								placeholder="Votre adresse email"
								required
							/>
						</div>

						{/* Champ message */}
						<div>
							<label htmlFor="message" className="block text-sm font-medium text-black mb-1">Message</label>
							<textarea
								id="message"
								name="message"
								rows={5}
								value={message}
								onChange={e => setMessage(e.target.value)}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition text-black placeholder-gray-400 resize-none"
								placeholder="Votre message..."
								required
							/>
						</div>

						{/* Message d'erreur */}
						{error && <div className="text-red-600 text-sm text-center">{error}</div>}
						{/* Message de confirmation */}
						{sent && <div className="text-green-600 text-sm text-center">Votre message a bien été envoyé !</div>}

						{/* Bouton d'envoi */}
						<button
							type="submit"
							className="w-full bg-black text-white font-semibold rounded-lg py-3 mt-2 hover:bg-blue-700 transition"
						>
							Envoyer
						</button>
					</form>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default ContactForm;
