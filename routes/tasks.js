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
		send(res,  JSON.parse(response.body));
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

// Open a Single Door or multiple doors
router.put('/doors/unlock', function (req, res, next) {
	console.log(req.body);
	var options = {
	  'method': 'PUT',
	  'url': 'http://10.10.3.31:18779/Infinias/IA/Doors',
	  'headers': {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
	    'username': 'dispatch1',
	    'password': '1234',
	    'doorids': req.body.doorIDs,
	    'LockStatus': 'Unlocked',
	    'duration': req.body.duration
	  }
	};
	request(options, function (error, response) { 
	  if (error) throw new Error(error);
	  send(res, JSON.parse(response.body));
	});
	
});

// Close a Single Door or multiple doors
router.put('/doors/lock', function (req, res, next) {
	console.log(req.body);
	var options = {
	  'method': 'PUT',
	  'url': 'http://10.10.3.31:18779/Infinias/IA/Doors',
	  'headers': {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  form: {
	    'username': 'dispatch1',
	    'password': '1234',
	    'doorids': req.body.doorIDs,
	    'LockStatus': req.body.lockStatus
	  }
	};
	request(options, function (error, response) { 
	  if (error) throw new Error(error);
	  send(res, JSON.parse(response.body));
	});
	
});

module.exports = router;