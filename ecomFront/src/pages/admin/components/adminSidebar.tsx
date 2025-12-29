

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../../../hooks/authContext';
import { FaHome, FaBoxOpen, FaTags, FaUsers, FaCog, FaStar, FaSignOutAlt, FaClipboardList, FaChartBar, FaThList, FaBoxes, FaEnvelope, FaHistory, FaQuestionCircle } from "react-icons/fa";
import logo from '../../../assets/react.svg';

const sidebarLinks = [
  { name: "Statistiques", to: "/admin/stats", icon: <FaChartBar /> },
  { name: "Dashboard", to: "/admin/dashboard", icon: <FaHome /> },
  { name: "Catégories", to: "/admin/categories", icon: <FaThList /> },
  { name: "Produits", to: "/admin/products", icon: <FaBoxOpen /> },
  { name: "Gestion des stocks", to: "/admin/stocks", icon: <FaBoxes /> },
  { name: "Promotions", to: "/admin/promos", icon: <FaTags /> },
  { name: "Commandes", to: "/admin/orders", icon: <FaClipboardList /> },
  { name: "Utilisateurs", to: "/admin/users", icon: <FaUsers /> },
  { name: "Messages / Support", to: "/admin/support", icon: <FaEnvelope /> },
  { name: "Avis", to: "/admin/reviews", icon: <FaStar /> },
  { name: "Journal d'activité", to: "/admin/logs", icon: <FaHistory /> },
  { name: "FAQ", to: "/admin/faq", icon: <FaQuestionCircle /> },
  { name: "Paramètres", to: "/admin/settings", icon: <FaCog /> },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Récupération de la fonction logout du contexte Auth
  const { logout } = useAuth();

  return (
    <>
      {/* Bouton burger mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md border border-black bg-white focus:outline-none"
        style={{ backgroundColor: '#fff' }}
        onClick={() => setOpen(!open)}
        aria-label="Ouvrir le menu"
      >
        {/* Icône burger blanc, bordure noire, traits noirs (identique header) */}
        <svg className="w-7 h-7" fill="none" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50 flex flex-col transition-transform duration-300 overflow-y-auto
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:shadow-none`}
        style={{ minHeight: '100vh' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 min-h-[56px]">
          <Link to="/admin" aria-label="Accueil admin">
            <img src={logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
          </Link>
          <span className="font-bold text-xl md:text-2xl tracking-tight text-black">EcomAdmin</span>
        </div>
        <nav className="flex-1 py-6 px-2 flex flex-col gap-2">
          {sidebarLinks.map(link => (
            <Link
              key={link.name}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-base transition
                ${location.pathname === link.to
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 shadow'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-black'}
              `}
              onClick={() => setOpen(false)}
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-6 py-4 border-t border-gray-100 flex flex-col gap-3">
          {/* Lien retour en boutique */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium text-base transition border border-transparent hover:border-blue-200"
            title="Retour en boutique"
          >
            {/* Icône maison déjà utilisée plus haut, on peut la réutiliser ou choisir une autre */}
            <FaHome className="text-lg" />
            Retour en boutique
          </Link>
          {/* Bouton déconnexion qui utilise le contexte Auth */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-red-50 font-medium text-base transition border border-transparent hover:border-red-200"
            onClick={async () => {
              await logout();
              navigate('/');
            }}
            title="Déconnexion"
          >
            <FaSignOutAlt className="text-lg" />
            Déconnexion
          </button>
          <span className="text-xs text-gray-400">© 2025 EcomShop</span>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;