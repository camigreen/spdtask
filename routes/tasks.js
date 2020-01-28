var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

var host = '10.10.3.31';
var port = '18779';
var username = 'dispatch1';
var password = '1234'

function send(res, data) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Cache-Control", "no-cache");
	res.send(data);
}

router.get('/tasks', function (req, res, next) {
	res.send('TASK API');
});

router.get('/doors', function (req, res, next) {

	var options = {
		'method': 'GET',
		'url': 'http://10.10.3.31:18779/Infinias/IA/Doors/status?username='+username+'&password='+password,
		'headers': {
			'Cache-Control': 'no-cache'
		}
	};
	request(options, function (error, response) { 
		if (error) throw new Error(error);
		var doors = [];
		for(let door of JSON.parse(response.body).Values) {
			if(door.Id == 17 || door.Id == 66) {
				doors.push(door);
			}
		}
		send(res, doors);
	});
	
	
});


// Get Single Door
router.get('/doors/:id', function (req, res, next) {
	
	var options = {
	  	'method': 'GET',
	  	'url': 'http://10.10.3.31:18779/Infinias/IA/Doors?doorids='+req.params.id+'&username='+username+'&password='+password,
	  	'headers': {
			'Cache-Control': 'no-cache'
		}
	};
	request(options, function (error, response) { 
	  if (error) throw new Error(error);
	  send(res, JSON.parse(response.body));
	});
	
});

// Open a Single Door
router.get('/doors/:id/open', function (req, res, next) {
	console.log('Opening Door '+req.params.id);
	var options = {
	  'method': 'PUT',
	  'url': 'http://10.10.3.31:18779/Infinias/IA/Doors',
	  'headers': {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
	    'username': 'dispatch1',
	    'password': '1234',
	    'doorids': req.params.id,
	    'LockStatus': 'Unlocked',
	    'duration': '10'
	  }
	};
	request(options, function (error, response) { 
	  if (error) throw new Error(error);
	  res.send(JSON.parse(response.body));
	});
	
});

// Open a Single Door
router.get('/gates/open', function (req, res, next) {

	var options = {
	  'method': 'PUT',
	  'url': 'http://10.10.3.31:18779/Infinias/IA/Doors',
	  'headers': {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
	    'username': 'dispatch1',
	    'password': '1234',
	    'doorids': '17,66',
	    'LockStatus': 'Unlocked'
	  }
	};
	request(options, function (error, response) { 
	  if (error) throw new Error(error);
	  res.send(JSON.parse(response.body));
	});
	
});

// Open a Single Door
router.get('/gates/close', function (req, res, next) {

	var options = {
	  'method': 'PUT',
	  'url': 'http://10.10.3.31:18779/Infinias/IA/Doors',
	  'headers': {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
	    'username': 'dispatch1',
	    'password': '1234',
	    'doorids': '17,66',
	    'LockStatus': 'Normal'
	  }
	};
	request(options, function (error, response) { 
	  if (error) throw new Error(error);
	  res.send(JSON.parse(response.body));
	});
	
});

// Open a Single Door
router.get('/zones', function (req, res, next) {

	var options = {
	  'method': 'GET',
	  'url': 'http://10.10.3.31:18779/Infinias/IA/zones/Names/Values?username='+username+'&password='+password
	};
	request(options, function (error, response) { 
	  if (error) throw new Error(error);
	  res.send(JSON.parse(response.body));
	});
	
});

module.exports = router;