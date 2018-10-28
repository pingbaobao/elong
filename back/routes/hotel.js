var express = require('express');
var router = express.Router();
var fileUPload=require('../middlewaers/fileUpload');
var hotel_controller = require('../controllers/hotel')

/* GET home page. */
router.get('/list', hotel_controller.list);
// router.get('/listall', hotel_controller.listall);
router.post('/save',fileUPload, hotel_controller.save);
router.post('/update',fileUPload, hotel_controller.update);
router.get('/remove', hotel_controller.remove);
router.get('/findOne', hotel_controller.findOne);
module.exports = router; 
