//EXPRESS
const express = require('express');
//Router
const router = express.Router();
//Multer
const multer = require('../middleware/multer-config')

//Lien avec le controller
const postCtrl = require('../controllers/post');


//Routes
router.post('/', postCtrl.creation);
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.modifyOnePost);
router.delete('/:id', postCtrl.deleteOne);
//router.post('/:id/like', postCtrl.like);


//Export
module.exports = router;