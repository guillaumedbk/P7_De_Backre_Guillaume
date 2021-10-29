const fs = require('fs');
const Model = require('../models')
const Post = require('../models/post')

exports.creation = (req, res, next) =>{

    //Récupérer l'id fournis 

    //Enregistrement du post
    Model.Post.create({
        //userId: req.body.id,
        postId: 1,
        texte: req.body.texte,
        imageUrl: req.body.imageUrl,
        usersLiked: req.body.usersLiked,
        likes: 0

    })
    .then(()=> res.status(200).json({ message : 'post enregistré' }))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllPost = (req, res, next) =>{
    Model.Post.findAll()
    .then(posts =>res.status(200).json({ posts }))
    .catch(error => res.status(400).json({ error }))
}