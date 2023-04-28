const express = require('express');
const router = express.Router();
const {v4 : uuidv4} = require('uuid');

const homeController = require('../controllers/home_controller');

// router.get('/',function(req,res){
//     res.redirect(`/${uuidv4()}`)
// });
router.get('/',homeController.index)
router.get('/:room',homeController.home)

module.exports = router;