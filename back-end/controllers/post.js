const fs = require('fs');
const jwt = require('jsonwebtoken');
const Model = require('../models')
const Post = require('../models/posts');

const multer = require('multer')

const upload = multer({
    dest: './uploads',
})



//CREATION D'UN POST
exports.creation = (req, res, next) =>{

    //Récupérer l'id 
 //   let decodeToken = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET);
  //  let id = decodeToken.userId; 

    //Enregistrement du post
    Model.Posts.create({
  //      UserId: id,
        UserId: 1,
        texte: req.body.texte,
       // imageUrl:req.body.imageUrl,
        imageUrl: "",
        usersLiked: "",
        likes: 0
    })
    .then(()=> res.status(200).json({ message : 'post enregistré' }))
    .catch(error => res.status(400).json({ error }))
}

exports.addPost =(req, res) => {
    //Enregistrement du post
      Model.Posts.create({
          UserId: 37,
          texte: req.body.texte,
         // imageUrl:req.body.imageUrl,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          usersLiked: "",
          likes: 0
      })
      .then(()=> res.status(200).json({ message : 'post enregistré' }))
    .catch(error => res.status(400).json({ error }))
    }

//RECUPERATION DE TOUS LES POSTS
exports.getAllPost = (req, res, next) =>{
    Model.Posts.findAll()
    .then(posts =>res.status(200).json({ posts }))
    .catch(error => res.status(400).json({ error }))
}

//Récupération d'un seul post
exports.getOnePost = (req, res, next) =>{
    let id = req.params.id;

    Model.Posts.findOne({where: {id : id}})
    .then(posts =>res.status(200).json({ posts: posts }))
    .catch(error => res.status(400).json({ error }))
}

exports.modifyOnePost = (req, res, next) =>{
    let id = req.params.id;
    const postObject = req.file ?
      {
        texte: req.body.texte,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Model.Posts.findOne({where:{id:id}})
    .then((post)=>{
        post.update({
            ...postObject
        })
        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
        .catch(error => res.status(400).json({ error }));
    })
}

//Suppression d'un post
exports.deleteOne = (req, res, next) =>{
    let id = req.params.id;
    Model.Posts.destroy({where: { id : id}})
    .then(() => res.status(200).json({ message: 'supprimé !' }))
    .catch(error => res.status(400).json({ error }))
}