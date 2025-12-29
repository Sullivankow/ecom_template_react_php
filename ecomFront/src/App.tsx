import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Topbar from './components/layout/topbar';
import Header from './components/layout/headers';
import Hero from './components/layout/hero';
import BestSellerSection from './components/layout/bestSellerSection';
import CategorySection from './components/layout/categorySection';
import AvantageSection from './components/layout/avantageSection';
import PromotionSection from './components/layout/promotionSection';
import Footer from './components/layout/footer';
import Registration from './pages/account/registration';
import Login from './pages/account/login';
import NotFound from './pages/notFound';
import Catalog from './pages/catalog/catalog';
import ProductPromo from './pages/catalog/productPromo';
import ContactForm from './components/forms/contactForm';
import ProductPage from './pages/product/productPage';
import SearchResult from './pages/search/searchResult';
import CartPage from './pages/cart/cartPage';
import CategoriesPage from './pages/category/categories';
import CheckoutForm from './pages/checkout/checkoutForm';
import AdminStats from './pages/admin/components/adminStats';

import AdminPage from './pages/admin/adminPage';
// Import du provider Auth
import { AuthProvider, useAuth } from "./hooks/authContext";


// Ce composant vérifie le rôle de l'utilisateur
function RequireAdmin({ children }: { readonly children: React.ReactNode }) {
  const { role, loading } = useAuth();
  if (loading) return <div>Chargement...</div>; // Affiche un loader pendant la vérification
  if (role !== "admin") {
    // Si l'utilisateur n'est pas admin, on le redirige vers la page de login
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Pages de base (à remplacer par tes vraies pages si besoin)
const Boutique = () => <div style={{ padding: 24 }}>Boutique</div>;
const Promotions = () => <div style={{ padding: 24 }}>Promotions</div>;


// Page d'accueil
function Home() {
  useEffect(() => {
    document.title = 'EcomShop — Boutique';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', "EcomShop - Boutique en ligne : prêt-à-porter, accessoires et meilleures offres.");
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) linkCanonical.setAttribute('href', window.location.origin + '/');
  }, []);

  return (
    <>
      <Topbar />
      <Header />

      <main>
        <Hero />
        <BestSellerSection />
        <CategorySection />
        <PromotionSection />
        <AvantageSection />
      </main>

      <Footer />
    </>
  );
}

function App() {
  // On englobe toutes les routes dans le provider Auth
  return (
    <AuthProvider>
      <Routes>
        {/* Route des pages PUBLIQUES */}
        <Route path="/" element={<Home />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product-promo" element={<ProductPromo />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="*" element={<NotFound />} />

        {/* Route des pages ADMIN protégée par RequireAdmin */}
        <Route path="/admin" element={
          <RequireAdmin>
            <AdminPage />
          </RequireAdmin>
        }>
          <Route index element={<div>Bienvenue sur le dashboard admin</div>} />
          <Route path="stats" element={<AdminStats />} />
          <Route path="categories" element={<div>Catégories</div>} />
          <Route path="products" element={<div>Produits</div>} />
          <Route path="stocks" element={<div>Gestion des stocks</div>} />
          <Route path="promos" element={<div>Promotions</div>} />
          <Route path="orders" element={<div>Commandes</div>} />
          <Route path="users" element={<div>Utilisateurs</div>} />
          <Route path="support" element={<div>Messages / Support</div>} />
          <Route path="reviews" element={<div>Avis</div>} />
          <Route path="logs" element={<div>Journal d'activité</div>} />
          <Route path="faq" element={<div>FAQ</div>} />
          <Route path="settings" element={<div>Paramètres</div>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;


