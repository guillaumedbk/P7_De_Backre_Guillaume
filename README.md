P7_DeBackre_Guillaume
# GROUPOMANIA

Un réseau social interne d'entreprise, moderne et ludique.

## Installation
### Front-end
```bash
Requirements : node version 14
  1. Nvm use 14.0 
  2. Cd new-project (front)
  3. Npm Install
  4. Npm run serve
```

### Back-end
```bash

  Créer fichier .env contenant:
- Le TOKEN_SECRET
- Valeur Crypto_key (crypto js)
- Valeur Crypto_iv  (crypto js)

  1. Npm Install 
  2. Lancer le server node
```
### Base de données

```bash
  Création de la base de données (npx sequelize-cli db:create)
  Configuration dans le fichier config/json
  npx sequelize-cli db:migrate
```
