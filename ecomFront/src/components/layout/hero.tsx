
import Button from "../ui/button";
import { useNavigate } from "react-router-dom";



const imageUrl = "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80";

export default function Hero() {
	const navigate = useNavigate();
	return (
		<div className="relative isolate px-6 pt-14 lg:px-8 min-h-[80vh] flex items-center justify-center bg-gray-900">
			{/* Image de fond prêt-à-porter */}
			<img
				src={imageUrl}
				alt="Prêt-à-porter"
				className="absolute inset-0 w-full h-full object-cover z-0 brightness-75"
			/>
			{/* Overlay pour fondu sombre */}
			<div className="absolute inset-0 bg-black/60 z-10" />
			<div className="relative z-20 mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 w-full">
				<div className="text-center">
					<h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 text-balance">
						Découvrez notre nouvelle collection prêt-à-porter
					</h1>
					<p className="mt-4 text-base xs:text-lg sm:text-xl text-gray-200 font-medium text-pretty">
						Profitez des dernières tendances à prix doux, livraison rapide et service client premium. Faites-vous plaisir dès aujourd'hui !
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						{/* Bouton qui redirige vers le catalogue */}
						<Button onClick={() => navigate('/catalog')}>
							Découvrir la boutique
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

