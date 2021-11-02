const express = require('express');
const app = express();
const User = require('./models/user');
var Sequelize = require('sequelize');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

//EVITER LES ERREURS DE CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json()); 

//ROUTES IMPORTS
const routeUser = require('./routes/user')
const routePost = require('./routes/post')
const routeComments = require('./routes/comments')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//REDIRECTIONS VERS LES ROUTES
app.use('/api/auth/', routeUser);
app.use('/api/post/', routePost);
app.use('/api/comments', routeComments);



module.exports = app;