import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer style={{ background: "#222", color: "#fff", padding: "2rem 0", marginTop: "2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 250px", margin: "1rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>EcomTemplate</h2>
          <p>Votre boutique en ligne de confiance pour tous vos achats !</p>
        </div>
        <div style={{ flex: "1 1 200px", margin: "1rem" }}>
          <h3>Contact</h3>
          <p>Email : contact@ecomtemplate.com</p>
          <p>Téléphone : +33 1 23 45 67 89</p>
          <p>Adresse : 123 Rue du Commerce, Paris</p>
        </div>
        <div style={{ flex: "1 1 200px", margin: "1rem" }}>
          <h3>Liens utiles</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="/" style={{ color: "#fff", textDecoration: "none" }}>Accueil</a></li>
            <li><a href="/catalog" style={{ color: "#fff", textDecoration: "none" }}>Catalogue</a></li>
            <li><a href="/cart" style={{ color: "#fff", textDecoration: "none" }}>Panier</a></li>
            <li><a href="/account" style={{ color: "#fff", textDecoration: "none" }}>Mon compte</a></li>
          </ul>
        </div>
        <div style={{ flex: "1 1 200px", margin: "1rem" }}>
          <h3>Suivez-nous</h3>
          <div style={{ display: "flex", gap: "1rem", fontSize: "1.5rem" }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.9rem", color: "#bbb" }}>
        &copy; {new Date().getFullYear()} EcomTemplate. Tous droits réservés.<br />
        <a href="/mentions-legales" style={{ color: "#bbb", marginRight: "1rem", textDecoration: "underline" }}>Mentions légales</a>
        <a href="/politique-confidentialite" style={{ color: "#bbb", textDecoration: "underline" }}>Politique de confidentialité</a>
      </div>
    </footer>
  );
};

export default Footer;


