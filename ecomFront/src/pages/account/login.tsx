/**
 * Page de connexion
 * -----------------
 * Composant React pour l'authentification utilisateur.
 * - Fond blanc, texte noir, accents bleus (charte graphique)
 * - Flèche retour en haut à gauche
 * - Formulaire email/mot de passe, boutons sociaux
 * - Validation avec yup
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginSchema } from "../../lib/validation";

const Login: React.FC = () => {
  // États pour les champs et l'erreur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Soumission du formulaire avec validation yup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
		await loginSchema.validate({ email, password });
		 // Simulation d'une connexion locale
      if (email !== "sundly@live.fr" || password !== "Azerty123") {
        setError("Email ou mot de passe incorrect !");
        return;
      }
      // Ici, tu continues la logique de connexion (API, etc.)
      alert("Connexion réussie !");
      
    } catch (err: any) {
      setError(err.message); // Affiche le message d’erreur de yup
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900 px-4 relative">
      {/* Flèche retour à l'accueil */}
      <Link to="/" aria-label="Retour à l'accueil" title="Retour à l'accueil" className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white hover:bg-gray-100 text-blue-600 shadow-md border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* Titre principal */}
          <h1 className="text-2xl font-semibold text-gray-900">Connexion à votre compte</h1>
        </div>

        {/* Bloc formulaire */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Adresse e-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="block w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            {/* Affichage du message d'erreur de validation */}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center text-gray-700">
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded bg-gray-100 border-gray-300" />
                <span className="ml-2">Se souvenir de moi</span>
              </label>
              <a href="/" className="text-blue-600 hover:text-blue-500">Mot de passe oublié ?</a>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold hover:from-blue-700 hover:to-blue-500 transition"
              aria-label="Se connecter"
            >
              <span className="text-white">Se connecter</span>
            </button>
          </form>

          {/* Boutons sociaux */}
          <div className="mt-6">
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-200" />
              <span className="px-4 text-sm text-gray-500">Ou continuer avec</span>
              <div className="flex-grow border-t border-gray-200" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition border border-blue-600" aria-label="Se connecter avec Google">
                {/* ...icône Google... */}
                <span className="text-sm text-white">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition border border-blue-600">
                {/* ...icône GitHub... */}
                <span className="text-sm text-white">GitHub</span>
              </button>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">Pas encore membre ? <a href="/registration" className="text-blue-600 hover:text-blue-500">Inscrivez-vous ici</a></p>
      </div>
    </div>
  );
};

export default Login;




