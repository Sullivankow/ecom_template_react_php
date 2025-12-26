


// Importation du header et du footer pour l'affichage global
import Header from '../../components/layout/headers';
import Footer from '../../components/layout/footer';
// Importation du hook personnalisé pour la gestion du panier
import { useCart } from '../../hooks/useCart';

// Composant principal de la page panier
const CartPage: React.FC = () => {
  // Récupération des fonctions et données du panier via le hook useCart
  const { cart, updateQuantity, removeFromCart, clearCart, total } = useCart();

  return (
    <>
      {/* En-tête du site */}
      <Header />
      {/* Contenu principal du panier */}
      <div id="cartPage" style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
        <h1>Mon panier</h1>
        {/* Affichage si le panier est vide */}
        {cart.length === 0 ? (
          <p style={{ color: 'black', textAlign: 'center', fontSize: 22, margin: '40px 0' }}>
            Votre panier est vide.
          </p>
        ) : (
          <>
            {/* Tableau des articles du panier */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Sous-total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Boucle sur chaque article du panier */}
                {cart.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td>
                      {/* Affichage de l'image du produit si disponible */}
                      {item.image && (
                        <img src={item.image} alt={item.name} style={{ width: 50, marginRight: 8 }} />
                      )}
                      {item.name}
                    </td>
                    {/* Prix unitaire */}
                    <td>{item.price.toFixed(2)} €</td>
                    {/* Quantité modifiable */}
                    <td>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => updateQuantity(item.id, Number(e.target.value))}
                        style={{ width: 60 }}
                      />
                    </td>
                    {/* Sous-total pour cet article */}
                    <td>{(item.price * item.quantity).toFixed(2)} €</td>
                    {/* Bouton de suppression */}
                    <td>
                      <button onClick={() => removeFromCart(item.id)} style={{ color: 'red' }}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Actions panier et affichage du total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={clearCart} style={{ background: '#eee', color: '#333', padding: '8px 16px' }}>
                Vider le panier
              </button>
              <h2>Total : {total.toFixed(2)} €</h2>
            </div>
            {/* Bouton pour passer à la caisse */}
            <div style={{ textAlign: 'right', marginTop: 24 }}>
              <button style={{ background: '#007bff', color: '#fff', padding: '12px 32px', fontSize: 18, border: 'none', borderRadius: 4 }}>
                Passer à la caisse
              </button>
            </div>
          </>
        )}
      </div>
      {/* Pied de page du site */}
      <Footer />
    </>
  );
};

export default CartPage;


