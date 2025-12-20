/**
 * Section de promotion
 * -------------------
 * Composant React reprenant le design de la capture d'écran fournie.
 * - Image à gauche avec overlay bleu
 * - Bloc texte à droite (titre, description, bouton)
 * - Respect de la charte graphique (bleu, blanc, noir)
 * - Responsive
 * - Commentaires en français
 */
import React from "react";

const PromotionSection: React.FC = () => {
	return (
		<section className="w-full rounded-xl overflow-hidden bg-[#181C2A] flex flex-col md:flex-row shadow-lg border border-gray-900/10">
			{/* Image avec overlay bleu */}
			<div className="md:w-1/2 w-full h-64 md:h-auto relative">
				   <img
					   src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
					   alt="Commerce moderne et shopping"
					   className="w-full h-full object-cover object-center"
				   />
				<div className="absolute inset-0 bg-blue-700/70 mix-blend-multiply" />
			</div>

			{/* Bloc texte */}
			<div className="md:w-1/2 w-full flex flex-col justify-center p-8 text-white">
				   <span className="text-blue-400 font-medium mb-2">Offre spéciale</span>
				   <h2 className="text-3xl font-bold mb-4 leading-tight text-white">Promotions exclusives à ne pas manquer !</h2>
				   <p className="mb-6 text-lg text-gray-200">
					   Bénéficiez dès maintenant de réductions exceptionnelles sur une large sélection d’articles. Quantités limitées, faites vite pour profiter des meilleures offres de la saison !
				   </p>
				   <a
					   href="#promotions"
					   className="inline-block px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition w-fit"
				   >
					   Découvrir les promos
				   </a>
			</div>
		</section>
	);
};

export default PromotionSection;
