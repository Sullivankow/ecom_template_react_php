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

// Icônes SVG pour Google et GitHub
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="#4285F4" d="M533.5 278.4c0-23.4-1.9-46.1-5.7-68.1H272v128.8h147.1c-6.4 34.9-25.4 64.4-54.2 84.1l87.4 67c51-46.9 82.2-116.3 82.2-211.8z"/>
    <path fill="#34A853" d="M272 544.3c73.6 0 135.5-24.3 180.7-66.2l-87.4-67c-24.2 16.3-55.1 26-93.3 26-71.7 0-132.4-48.3-154.1-113.1l-89.8 69.4C72.2 481 165.8 544.3 272 544.3z"/>
    <path fill="#FBBC05" d="M117.9 328.8c-10.9-32.6-10.9-67.6 0-100.2L28.1 159.2C-8.6 221.6-8.6 322.8 28.1 385.1l89.8-69.4z"/>
    <path fill="#EA4335" d="M272 109.2c39.9 0 75.8 13.7 104 40.6l78-78C398.1 24.4 336.2 0 272 0 165.8 0 72.2 63.3 28.1 159.2l89.8 69.4C139.6 157.5 200.3 109.2 272 109.2z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 .297c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.838 1.238 1.838 1.238 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.381 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.841 1.235 1.912 1.235 3.222 0 4.61-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" fill="#fff" />
  </svg>
);

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
                <GoogleIcon />
                <span className="text-sm text-white">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition border border-blue-600">
                <GitHubIcon />
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




