
/**
 * Page 404 Not Found
 * ------------------
 * Composant React pour afficher une erreur 404 (page non trouvée).
 * - Respecte la charte graphique : fond blanc, accents bleus, texte centré
 * - Illustration, message explicite, bouton retour à l'accueil
 * - Commentaires en français
 */

import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 px-4">
      {/* Illustration ou icône d'erreur */}
      <div className="mb-8">
        <svg className="w-24 h-24 text-blue-500 mx-auto" fill="none" viewBox="0 0 64 64" stroke="currentColor">
          <circle cx="32" cy="32" r="30" strokeWidth="4" className="text-blue-200" />
          <path d="M24 24l16 16M40 24L24 40" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      {/* Message principal */}
      <h1 className="text-3xl font-bold mb-2">404 - Page non trouvée</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      {/* Bouton retour à l'accueil */}
      <Link to="/" className="inline-block px-6 py-3 rounded-md bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold hover:from-blue-700 hover:to-blue-500 transition shadow-md">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;