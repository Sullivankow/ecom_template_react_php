# Features

Fonctionnalités métier regroupées par domaine. Chaque feature peut contenir logique, hooks, composants spécifiques et tests.

Exemples :
- `auth/` : inscription, connexion, mot de passe oublié.
- `product/` : affichage et interactions des produits.
- `cart/` : gestion du panier et de ses calculs.
- `order/` : suivi et historique des commandes.
- `payment/` : intégration paiement (ex: Stripe) et webhooks.
- `search/` : barre de recherche, suggestions, résultats.

But : isoler la logique métier pour rester modulable et testable.