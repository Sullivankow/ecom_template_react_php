# Services

Accès aux données et intégrations externes.

Contenu typique :
- `http.ts` : client HTTP (fetch/axios), gestion des erreurs, interceptors.
- `endpoints.ts` : constantes d’URL et helpers.
- Clients API (catalogue, panier, compte, commandes).

Principe : aucune logique UI ici, uniquement communication avec le backend.