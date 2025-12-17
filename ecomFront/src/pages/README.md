# Pages

Ce dossier contient les pages routées de l’application (une route = une page). Chaque sous-dossier représente une page avec ses composants spécifiques.

Sous-dossiers suggérés :
- `home/` : page d’accueil, promotions, mises en avant.
- `catalog/` : liste de produits avec filtres et pagination.
- `product/` : page détail produit (galerie, variantes, prix, stock).
- `cart/` : panier, modification des quantités, récapitulatif.
- `checkout/` : tunnel de commande (adresse, livraison, paiement).
- `account/` : espace client (profil, commandes, adresses, authentification).

Bonnes pratiques :
- Garder la logique métier dans `features/` et utiliser ici des composants.
- Utiliser un router (ex: `react-router-dom`) pour la navigation.