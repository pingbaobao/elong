var express = require('express');
var router = express.Router();

var hotel_controller = require('../controllers/hotel')

/* GET home page. */
router.get('/list', hotel_controller.list);
router.post('/save', hotel_controller.save);
module.exports = router; 
