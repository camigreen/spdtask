var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/tasks', function (req, res, next) {
	http.get('http://10.10.3.31:18779/Infinias/IA/Doors')
	res.send('TASK API');
});

router.get('/doors', function (req, res, next) {
	http.get("http://10.10.3.31:18779/Infinias/ia/doors/status?username=dispatch1&password=1234", resp => {
    let data = "";

	    // A chunk of data has been recieved.
	    resp.on("data", chunk => {
	      data += chunk;
	    });

	    // The whole response has been received. Print out the result.
	    resp.on("end", () => {
	      let doors = JSON.parse(data);
	      console.log(doors);
	  	});
	});
});

module.exports = router;