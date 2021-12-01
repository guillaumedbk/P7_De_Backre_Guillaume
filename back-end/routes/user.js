//EXPRESS
const express = require('express');
//Lien avec le controller
const userCtrl = require('../controllers/user');
//Router
const router = express.Router();
//Auth
const auth = require('../middleware/auth')

//Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', auth, userCtrl.getUser);
router.put('/usermodifs/:id', userCtrl.modifyUser);
//Export
module.exports = router;
