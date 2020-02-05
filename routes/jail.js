var express = require('express');
var router = express.Router();
var request = require('request');
var parseString = require('xml2js').parseString;
var Cell = require('../lib/cell.js');

var settings = {
	host: '192.168.0.37',
	port: null
}
  

router.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Cache-Control", "no-cache");
	next();
})


router.get('/status', function (req, res, next) {

	var options = {
		'method': 'GET',
		'url': 'http://'+settings.host+'/stateFull.xml',
		'headers': {
			'Cache-Control': 'no-cache'
		}
	};
	request(options, function (error, response) { 
		if (error) throw new Error(error);
		parseString(response.body, function(err, result) {
			var i = 1;	
			var cells = [];
			console.log(result.datavalues)
			Object.keys(result.datavalues).forEach(function(key) {
				cell = new Cell();
				cell.status = result.datavalues[key][0];
				cells.push(cell);
			})
			console.log(cells);
			res.send(result);
		});
	
		
	});
	
	
});

module.exports = router;