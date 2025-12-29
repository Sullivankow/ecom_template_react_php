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
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../lib/validation";
import { auth, db } from "../../lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Icônes SVG pour Google et GitHub
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill="#4285F4" d="M533.5 278.4c0-23.4-1.9-46.1-5.7-68.1H272v128.8h147.1c-6.4 34.9-25.4 64.4-54.2 84.1l87.4 67c51-46.9 82.2-116.3 82.2-211.8z"/>
    <path fill="#34A853" d="M272 544.3c73.6 0 135.5-24.3 180.7-66.2l-87.4-67c-24.2 16.3-55.1 26-93.3 26-71.7 0-132.4-48.3-154.1-113.1l-89.8 69.4C72.2 481 165.8 544.3 272 544.3z"/>
    <path fill="#FBBC05" d="M117.9 328.8c-10.9-32.6-10.9-67.6 0-100.2L28.1 159.2C-8.6 221.6-8.6 322.8 28.1 385.1l89.8-69.4z"/>
    <path fill="#EA4335" d="M272 109.2c39.9 0 75.8 13.7 104 40.6l78-78C398.1 24.4 336.2 0 272 0 165.8 0 72.2 63.3 28.1 159.2l89.8 69.4C139.6 157.5 200.3 109.2 272 109.2z"/>
  </svg>
);



const Login: React.FC = () => {
  // États pour les champs et l'erreur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Connexion Google
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Récupération du rôle dans Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (role === "admin") {
          navigate("/admin");
        } else {
          setError("Accès réservé aux administrateurs.");
        }
      } else {
        setError("Utilisateur non trouvé dans la base de données.");
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de la connexion Google.");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await loginSchema.validate({ email, password });
      // Connexion avec Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Récupération du rôle dans Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (role === "admin") {
          navigate("/admin");
        } else {
          setError("Accès réservé aux administrateurs.");
        }
      } else {
        setError("Utilisateur non trouvé dans la base de données.");
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de la connexion.");
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
            <div className="mt-4 flex justify-center">
              <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center gap-2 py-2 px-6 rounded-md bg-blue-600 hover:bg-blue-700 transition border border-blue-600" aria-label="Se connecter avec Google">
                <GoogleIcon />
                <span className="text-sm text-white">Google</span>
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




