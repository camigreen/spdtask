var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/tasks', function (req, res, next) {
	http.get('http://10.10.3.31:18779/Infinias/IA/Doors')
	res.send('TASK API');
});

router.get('/doors', function (req, res, next) {
	http.get('http://10.10.3.31:18779/Infinias/ia/doors/status?username=dispatch1&password=1234', (res) => {
	  const { statusCode } = res;
	  const contentType = res.headers['content-type'];

	  let error;
	  if (statusCode !== 200) {
	    error = new Error('Request Failed.\n' +
	                      `Status Code: ${statusCode}`);
	  } else if (!/^application\/json/.test(contentType)) {
	    error = new Error('Invalid content-type.\n' +
	                      `Expected application/json but received ${contentType}`);
	  }
	  if (error) {
	    console.error(error.message);
	    // Consume response data to free up memory
	    res.resume();
	    return;
	  }

	  res.setEncoding('utf8');
	  let rawData = '';
	  res.on('data', (chunk) => { rawData += chunk; });
	  res.on('end', () => {
	    try {
	      const parsedData = JSON.parse(rawData);
	      console.log(parsedData);
	      res.send(parsedData);
	    } catch (e) {
	      console.error(e.message);
	    }
	  });
	}).on('error', (e) => {
	  console.error(`Got error: ${e.message}`);
	});
});

module.exports = router;