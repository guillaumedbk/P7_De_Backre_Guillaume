//EXPRESS
const express = require('express');
//Router
const router = express.Router();
//Multer
const multer = require('../middleware/multer-config')

//Lien avec le controller
const postCtrl = require('../controllers/post');
//Auth
const auth = require('../middleware/auth')

//Routes
//router.post('/', postCtrl.creation);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', multer, postCtrl.modifyOnePost);
router.delete('/:id', postCtrl.deleteOne);
//router.post('/:id/like', postCtrl.like);
router.post('/uploads/:id', multer, postCtrl.addPost)

//Export
module.exports = router;