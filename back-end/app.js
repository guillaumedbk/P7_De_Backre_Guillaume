const express = require('express');
const app = express();
const User = require('./models/users');
var Sequelize = require('sequelize');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const multer = require ('multer');
const path = require ('path');
const cors =require ('cors');

//EVITER LES ERREURS DE CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json()); 

app.use(cors())


//ROUTES IMPORTS
const routeUser = require('./routes/user')
const routePost = require('./routes/post')
const routeComments = require('./routes/comments');
//const { diskStorage } = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//REDIRECTIONS VERS LES ROUTES
app.use('/api/auth/', routeUser);
app.use('/api/post/', routePost);
app.use('/api/comments', routeComments);

app.use('/images', express.static(path.join(__dirname, 'uploads')));

module.exports = app;