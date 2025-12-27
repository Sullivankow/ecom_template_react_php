
import Header from '../../components/layout/headers';
import Footer from '../../components/layout/footer';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { checkoutSchema } from '../../lib/validation';

// Composant principal du formulaire de commande (checkout)
const CheckoutForm: React.FC = () => {

  const navigate = useNavigate();
  // État local pour stocker les valeurs du formulaire
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    payment: "card",
  });
  // État pour les erreurs de validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Gère la modification des champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  // Gère la soumission du formulaire avec validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await checkoutSchema.validate(form, { abortEarly: false });
      setErrors({});
      // Envoyer les données ou valider la commande
      alert("Commande validée !");
    } catch (err: any) {
      if (err.inner) {
        // Regroupe les erreurs par champ
        const formErrors: { [key: string]: string } = {};
        err.inner.forEach((validationError: any) => {
          if (validationError.path && !formErrors[validationError.path]) {
            formErrors[validationError.path] = validationError.message;
          }
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div id="checkout" className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6 md:p-10 border border-gray-200 my-8">
          {/* Titre du formulaire */}
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">Finaliser ma commande</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Informations personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Champ prénom */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-black`}
                  placeholder="Votre prénom"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              {/* Champ nom */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-black`}
                  placeholder="Votre nom"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            {/* Email et téléphone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Champ email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-black`}
                  placeholder="exemple@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              {/* Champ téléphone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-black`}
                  placeholder="06 12 34 56 78"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
            {/* Adresse */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                id="address"
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-black`}
                placeholder="Adresse complète"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            {/* Ville, code postal, pays */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Champ ville */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-black`}
                  placeholder="Ville"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              {/* Champ code postal */}
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                <input
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-black`}
                  placeholder="75000"
                />
                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
              </div>
              {/* Champ pays */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-black`}
                  placeholder="France"
                />
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
              </div>
            </div>
            {/* Sélection du mode de paiement */}
            <div>
              <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1">Mode de paiement</label>
              <select
                id="payment"
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.payment ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-black`}
              >
                <option value="card">Carte bancaire</option>
                <option value="paypal">PayPal</option>
                <option value="cod">Paiement à la livraison</option>
              </select>
              {errors.payment && <p className="text-red-500 text-xs mt-1">{errors.payment}</p>}
            </div>
            {/* Boutons Précédent et Valider */}
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-3 bg-white border border-gray-300 text-white font-semibold rounded-lg shadow hover:bg-gray-100 transition text-lg"
              >
                Précédent
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-black text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition text-lg"
              >
                Payer la commande
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutForm;


