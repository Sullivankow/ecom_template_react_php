import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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


import AdminPage from './pages/admin/adminPage';

// Pages de base (à remplacer par tes vraies pages si besoin)
const Boutique = () => <div style={{ padding: 24 }}>Boutique</div>;
const Promotions = () => <div style={{ padding: 24 }}>Promotions</div>;

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
  return (
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


      {/* Route des pages ADMIN */}
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;


