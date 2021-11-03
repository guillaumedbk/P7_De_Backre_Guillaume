const fs = require('fs');
const jwt = require('jsonwebtoken');
const Model = require('../models')
const Post = require('../models/posts');

exports.creation = (req, res, next) => {
    //Récupérer l'id 
    let decodeToken = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET);
    let id = decodeToken.userId; 
    //Save
    Model.Comments.create({
        UserId: id,
        PostId: 1,
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

exports.getOneComment = (req, res, next) =>{
    let id = req.params.id;
    Model.Comments.findOne({where: {id : id}})
    .then(comment =>res.status(200).json({ comment: comment }))
    .catch(error => res.status(400).json({ error }))
}

