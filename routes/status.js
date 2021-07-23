var express = require('express');
var router = express.Router();
var request = require('request');
var parseString = require('xml2js').parseString
var Device = require('./device');

var settings = {};
  
router.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Cache-Control", "no-cache");
	next();
})


router.get('/', function (req, res, next) {

    var devices = [];
    
    res.send(results);
    });
    var test = new Device();
	console.log(test.serial);
	
});

module.exports = router;