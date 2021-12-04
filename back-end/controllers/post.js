const fs = require('fs');
const jwt = require('jsonwebtoken');
const Model = require('../models')
const Post = require('../models/posts');

const multer = require('multer')

const upload = multer({
    dest: './uploads',
})

//CREATION D'UN POST
exports.addPost =(req, res, next) => {
    //Enregistrement du post
      Model.Posts.create({
          UserId: req.body.userId,
          texte: req.body.texte,
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
//Modification d'un post
exports.modifyOnePost = (req, res, next) =>{
    //Id du post en question
    let postid = req.params.id;
    //headers authorization
    let decodeToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET);
    //Id de la personne qui souhaite modifier
    const id = decodeToken.userId;

     //Vérifier si ce userId est modérateur
     Model.Users.findOne({
        where: {id : id}
    }).then((user)=>{
        
        //Vérfication autorisation à modifier
        Model.Posts.findOne({
            //Recherche du post en question dans la base de données
            where: {id : postid}
        }).then((post)=>{
            //Vérification que la personne qui souhaite modifier est la même que celle qui a créé le post ou bien modératrice
            if(post.userId == id || user.isAdmin == true){
                
                //logique de modification
                const postObject = req.file ?
                {
                    texte: req.body.texte,
                    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : { ...req.body };
                
                Model.Posts.findOne({where:{id:postid}})
                .then((post)=>{
                    post.update({
                        ...postObject
                    })
                    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                    .catch(error => res.status(400).json({ error }));
                })
            
            }else{
                //Renvoyer erreur 401
                res.status(401).json({ message: 'Utilisateur non autorisé à modifier ce post'})
            }
        }).catch(error => res.status(500).json(error));
    })
}

//Suppression d'un post
exports.deleteOne = (req, res, next) =>{
    let postid = req.params.id;
    let decodeToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET);
    const id = decodeToken.userId;
 
    //Vérification autorisation
    Model.Users.findOne({
        where: {id : id}
    }).then((user)=>{
        if(user.id == id || user.isAdmin == true){
    Model.Posts.destroy({where: { id : postid}})
    .then(() => res.status(200).json({ message: 'supprimé !' }))
    .catch(error => res.status(400).json({ error }))
}else{
    res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce post' })
}
}).catch(error => res.status(500).json(error));
}