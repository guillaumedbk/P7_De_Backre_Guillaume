P7_DeBackre_Guillaume
# GROUPOMANIA

Un réseau social interne d'entreprise, moderne et ludique.

## Installation
### Front-end
```bash
Requirements : node version 14
  1. Cd new-project (front)
  2. Npm Install
  3. Npm run serve
```

### Back-end
```bash

  Créer fichier .env contenant:
- Le TOKEN_SECRET
- CryptoJs, ajouter les éléments suivants :
 
  Crypto_key = //Assigner une valeur
  Crypto_iv = //Assigner une valeur

  1. cd back-end
  2. Npm Install 
  3. Lancer le server node
```
### Base de données

```bash
  Configuration dans le fichier config/json
  Création de la base de données (npx sequelize-cli db:create)
  npx sequelize-cli db:migrate
```
