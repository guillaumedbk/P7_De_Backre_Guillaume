/*
const Post = require('../models/posts');
const fs = require('fs');

exports.creation = (req, res, next) =>{
    //Récupération des données
    const postObject = JSON.parse(req.body.post);
    const post = new Post ({
        ...postObject,
        likes:0,
        dislikes:0
    })
    //Regarder comment save le nouvel object avec sequalize

    //Envoyer réponse du server
}*/