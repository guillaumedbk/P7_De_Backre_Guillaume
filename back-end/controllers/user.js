const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const passwordValidator = require ('../middleware/passwordValidator');
const { Sequelize } = require("sequelize");
const Model = require('../models')

require('dotenv').config()

exports.signup = (req, res, next)=>{

        //Ajout de l'utilisateur
          Model.User.create({
            email: req.body.email,
            password: req.body.password,
            prenom: req.body.prenom,
            nom: req.body.nom,
            bio: req.body.bio,
            isAdmin: true
          })
          
        .then((user)=> res.status(200).json( {
          userId : user.id,
          token : jwt.sign(
            { userId: User.id },
            'process.env.TOKEN_SECRET',
            { expiresIn: '24h' }
          )
        }))
        .catch(error => res.status(400).json({ error }));
    }
   

    
  exports.login = (req, res, next) => {
    Model.User.findOne({ where: { email: req.body.email } })
    .then(user =>{
      if(!user){
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
    })
    bcrypt.compare(req.body.password, user.password)
            .then(valid => {
              if (!valid) {
                  res.status(401).json({ error: 'Mot de passe incorrect !' });
              }
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  'process.env.TOKEN_SECRET',
                  { expiresIn: '24h' }
                )
              });
            })
            .catch(error =>  res.status(500).json({ error: 'bcrypt compare' }));
          }
       
