const fs = require('fs');
const jwt = require('jsonwebtoken');
const Model = require('../models')
const Post = require('../models/post');

//CREATION D'UN POST
exports.creation = (req, res, next) =>{

    //Récupérer l'id 
let decodeToken = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET);
let id = decodeToken.userId; 

    //Enregistrement du post
    Model.Post.create({
        userId: id,
        postId: 1,                  //A CHANGER: pas besoin, la table a déjà un autoincrement
        texte: req.body.texte,
        imageUrl: req.body.imageUrl, //INSERER LE PROTOCOLE PLUS TARD
        usersLiked: "",
        likes: 0
    })
    .then(()=> res.status(200).json({ message : 'post enregistré' }))
    .catch(error => res.status(400).json({ error }))
}

//RECUPERATION DE TOUS LES POSTS
exports.getAllPost = (req, res, next) =>{
    Model.Post.findAll()
    .then(posts =>res.status(200).json({ posts }))
    .catch(error => res.status(400).json({ error }))
}

//Récupération d'un seul post
exports.getOnePost = (req, res, next) =>{
    let id = req.params.id;

    Model.Post.findOne({where: {postId : id}})
    .then(post =>res.status(200).json({ post: post }))
    .catch(error => res.status(400).json({ error }))
}
//Modification d'un post
exports.modifyOnePost = (req, res, next) =>{
    let id = req.params.id;
    Model.Post.findOne({where: {postId : id}})
    .then((post) => {
        post.update({
            texte: req.body.texte
            //AJOUTER LE PROTOCOLE ET LE CHECK POUR L'IMAGE
        })
        post.save()
    })
    .then(post =>res.status(200).json({ message: 'post modifié' }))
    .catch(error => res.status(400).json({ error }))
}
//Suppression d'un post
exports.deleteOne = (req, res, next) =>{
    let id = req.params.id;
    Model.Post.destroy({where: {postId : id}})
    .then(() => res.status(200).json({ message: 'supprimé !' }))
    .catch(error => res.status(400).json({ error }))
}