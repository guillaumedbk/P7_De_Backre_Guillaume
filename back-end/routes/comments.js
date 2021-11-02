//EXPRESS
const express = require('express');
//Router
const router = express.Router();
//Multer
const multer = require('../middleware/multer-config')

//Lien avec le controller
const commentsCtrl = require('../controllers/comments.js');
const { route } = require('./user');


//Routes
router.post('/', commentsCtrl.creation);
/*
router.get('/', commentsCtrl.getAllComments);
router.get('/:id', commentsCtrl.getOneComment);
router.delete('/:id', commentsCtrl.deleteOne);
router.delete('/', commentsCtrl.deleteAll);
router.post('/:id/like', commentsCtrl.like);
*/

//Export
module.exports = router;