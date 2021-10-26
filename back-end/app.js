const express = require('express');
const app = express();

//EVITER LES ERREURS DE CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//CONNEXION BDD

//ROUTES IMPORTS
const routeUser = require('./routes/user')
const routePost = require('./routes/post')
const routeComments = require('./routes/comments')

//REDIRECTIONS VERS LES ROUTES
app.use('/api/auth/', routeUser);
app.use('/api/post/', routePost);
app.use('/api/comments', routeComments);

app.use(express.json()); 

module.exports = app;