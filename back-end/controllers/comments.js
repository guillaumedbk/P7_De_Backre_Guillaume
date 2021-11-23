const fs = require('fs');
const jwt = require('jsonwebtoken');
const Model = require('../models')
const Post = require('../models/posts');

exports.creation = (req, res, next) => {
    //Récupérer l'id 
  //  let decodeToken = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET);
  //  let id = decodeToken.userId; 
    //Save
    Model.Comments.create({
   //     UserId: id,
     
        UserId:38,
        PostId: req.body.postId,
        texte: req.body.texte
    })
    .then(()=> res.status(200).json({ message : 'commentaire enregistré' }))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllComments = (req, res, next) =>{
    Model.Comments.findAll()
    .then((comments)=> res.status(200).json({ comments }))
    .catch(error => res.status(400).json({ error }))
}

//Commentaires selon le postId
exports.getOneComment = (req, res, next) =>{
    let id = req.params.id;
    Model.Comments.findAll({where: {postId : id}})
    .then(comment =>res.status(200).json({ comment: comment }))
    .catch(error => res.status(400).json({ error }))
}
/*
exports.postComments = (req, res, next) =>{
    let id = req.params.id;
    Model.Comments.findAll({where: {postId : "74"}})
    .then((comments) =>res.status(200).json({ comments }))
    .catch(error => res.status(400).json({ error }))
}

*/