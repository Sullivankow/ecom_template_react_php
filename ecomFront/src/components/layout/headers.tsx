import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";

// Menu de navigation principal
const menuItems = [
  { name: "Accueil", href: "/home" },
  { name: "Catalogue", href: "#" },
  { name: "Promotions", href: "#" },
  { name: "Contact", href: "#" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 md:py-3">
        {/* Menu burger mobile à gauche */}
        <div className="flex items-center md:hidden order-1 flex-shrink-0">
          <button
            className="p-2 rounded-md border border-black bg-white focus:outline-none"
            style={{ backgroundColor: '#fff' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu"
          >
            {/* Icône burger blanc, bordure noire, traits noirs */}
            <svg className="w-7 h-7" fill="none" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Logo & Nom au centre en mobile, à gauche en desktop */}
        <div className="flex items-center gap-2 min-w-[100px] order-2 md:order-1 flex-1 justify-center md:justify-start">
          <img src={logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <span className="hidden sm:inline font-bold text-xl md:text-2xl tracking-tight text-black">EcomShop</span>
        </div>

        {/* Centre : Menu de navigation (desktop uniquement) */}
        <nav className="flex-1 hidden md:flex justify-center order-2">
          <ul className="flex gap-6 md:gap-10 text-base md:text-lg font-medium">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className="text-gray-700 hover:text-black transition">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Icônes à droite */}
        <div className="flex items-center gap-4 min-w-[90px] justify-end order-3 flex-shrink-0">
          {/* Recherche */}
          <span title="Rechercher un produit" className="text-black cursor-pointer transition-transform hover:scale-110 hover:text-gray-900">
            {/* Icône loupe moderne */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="11" cy="11" r="6" />
              <line x1="17" y1="17" x2="21" y2="21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
          {/* Panier */}
          <span title="Panier" className="text-black cursor-pointer transition-transform hover:scale-110 hover:text-gray-900">
            {/* Icône panier moderne */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="17" cy="20" r="1.5" />
              <path d="M3 4h2l2.68 12.39A2 2 0 0 0 9.61 18h4.78a2 2 0 0 0 1.93-1.61L19 6H6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </span>
          {/* Connexion */}
          <Link
            to="/login"
            title="Connexion"
            className="text-black cursor-pointer transition-transform hover:scale-110 hover:text-gray-900"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            {/* Icône profil moderne */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.7" />
              <path d="M4.5 19c0-2.485 3.357-4.5 7.5-4.5s7.5 2.015 7.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Menu mobile overlay */}
      {/* Overlay et menu mobile avec animation de glissement */}
      <div
        className={`fixed inset-0 z-50 flex justify-end md:hidden transition-all duration-300 ${menuOpen ? 'bg-black bg-opacity-40 pointer-events-auto' : 'bg-transparent pointer-events-none'}`}
        style={{ visibility: menuOpen ? 'visible' : 'hidden' }}
      >
        <div
          className={`w-2/3 max-w-xs h-full shadow-lg p-6 flex flex-col gap-6 bg-white border-l border-gray-200 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <button
            className="self-end mb-4 p-2 rounded-md border border-black bg-white focus:outline-none"
            style={{ backgroundColor: '#fff' }}
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            {/* Icône croix blanche, bordure noire, croix noire */}
            <svg className="w-7 h-7" fill="none" stroke="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="flex flex-col gap-6 text-lg font-medium">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-gray-700 hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
