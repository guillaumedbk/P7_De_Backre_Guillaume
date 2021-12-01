const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const passwordValidator = require ('../middleware/passwordValidator');
const { Sequelize } = require("sequelize");
const Model = require('../models');
const utils = require('../utils/token');
const { enc } = require('crypto-js');

require('dotenv').config()

exports.signup = (req, res, next)=>{
    var key = CryptoJS.enc.Hex.parse(process.env.Crypto_key); 
    var iv = CryptoJS.enc.Hex.parse(process.env.Crypto_iv); 
    let encryptedMail = CryptoJS.AES.encrypt(req.body.mail, key, { iv: iv }).toString();
    var decrypted = CryptoJS.AES.decrypt(encryptedMail, key, { iv: iv }).toString();  
    let decrypt = decrypted.toString(CryptoJS.enc.Utf8)
    
        //Ajout de l'utilisateur
        bcrypt.hash(req.body.password, 10)
        .then((hash) =>{
          Model.Users.create({
            email: encryptedMail,
            password: hash,
            prenom: req.body.prenom,
            nom: req.body.nom,
            bio: req.body.bio,
            isAdmin: true
          })
         // .then((encryptedMail)=> {console.log(decrypted.toString(CryptoJS.enc.Utf8))})
          .then(()=> res.status(200).json({ message : 'objet enregistré'}))
        })
        .catch(error => res.status(400).json({ error }));
    }
   
  exports.login = (req, res, next) => {

    Model.Users.findOne({ 
      attributes:['id', 'email', 'password'],
      where: {email: req.body.email} 
    })
    .then(user =>{
      if(!user){
        
        return res.status(401).json( {error : 'Utilisateur non trouvé !'} ),
        console.log({error: 'Utilisateur non trouvé !'} )
    }else{

      bcrypt.compare(req.body.password, user.password)
      .then(valid =>{
        if(!valid){
          res.status(401).json({ error: 'Mot de passe incorrect !' }),
          console.log({error:'Mot de passe incorrect !' } )
        }else{
          res.status(200).json({ 
            status: 200,
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              process.env.TOKEN_SECRET,
              { expiresIn: '24h' }
            ),
          });
        }
       
      })
      .catch(error =>  res.status(500).json({ error: 'bcrypt' }));
    }
    })}
  
exports.getUser = (req, res, next) => {
    let id = req.params.id;
    Model.Users.findOne({
      where: {id : id}}
      )
      .then(user =>res.status(200).json({ user: user }))
    .catch(error => res.status(400).json({ error }))
}
//
exports.modifyUser = (req, res, next) =>{
  var key = CryptoJS.enc.Hex.parse(process.env.Crypto_key); 
  var iv = CryptoJS.enc.Hex.parse(process.env.Crypto_iv); 
  let encryptedMail = CryptoJS.AES.encrypt(req.body.mail, key, { iv: iv }).toString();
 
  let decodeToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET);
  const id = decodeToken.userId;

  Model.Users.findOne({
    where: {id : id}
  }).then((user)=>{

    if(user.id == id || user.isAdmin == true){

          bcrypt.hash(req.body.password, 10)
          .then((hash) =>{
          Model.Users.findOne({where: {id : id}})
            .then((users)=>{
              users.update({
                email: encryptedMail,
                password: hash,
                prenom: req.body.prenom,
                nom: req.body.nom,
                bio: req.body.bio,
                idAdmin:true
              })
              .then((users) => res.status(200).json({ users }))
            })
              .catch(error => res.status(400).json({ error }));
          })   
    }else{
      res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce profil' })
    }
  }).catch(error => res.status(500).json(error));
}
//
exports.deleteUser = (req, res, next) =>{

  let decodeToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET);
  const id = decodeToken.userId;

  Model.Users.findOne({
    where: {id : id}
  }).then((user)=>{

  if(user.id == id || user.isAdmin == true){
  Model.Users.destroy({where: { id : id}})
    .then(() => res.status(200).json({ message: 'supprimé !' }))
    .catch(error => res.status(400).json({ error }))
  }else{
    res.status(401).json({ error: 'Utilisateur non autorisé à supprimer ce profil' })
  }
}).catch(error => res.status(500).json(error));
}