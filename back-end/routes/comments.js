//EXPRESS
const express = require('express');
//Router
const router = express.Router();
//Multer
const multer = require('../middleware/multer-config')

//Lien avec le controller
const commentsCtrl = require('../controllers/comments.js');
const { route } = require('./user');
//Auth
const auth = require('../middleware/auth')

//Routes
router.post('/', auth, commentsCtrl.creation);
router.get('/', auth, commentsCtrl.getAllComments);
router.get('/:id', auth, commentsCtrl.getOneComment);

//router.get('/:id', commentsCtrl.postComments);
/*
router.delete('/:id', commentsCtrl.deleteOne);
router.delete('/', commentsCtrl.deleteAll);
router.post('/:id/like', commentsCtrl.like);
*/

//Export
module.exports = router;