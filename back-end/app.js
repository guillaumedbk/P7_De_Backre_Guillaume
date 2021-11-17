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


////IMAGES
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}

const upload = multer({
  dest: './uploads',
  fileFilter,
  limits: {
    fileSize: 5000000
  }
});

app.post('/uploads', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});

app.use((err, req, res, next) => {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: 'Only images are allowed' });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: 'Allow file size is 500KB' });
    return;
  }
});

module.exports = app;