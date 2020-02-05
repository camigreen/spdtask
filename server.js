var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var jail = require('./routes/jail');
var doors = require('./routes/doors');

var port = 3000;

var app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api/doors', doors);
app.use('/api/jail', jail);

app.listen(port, function () {
	console.log('Server Started on Port '+ port);
});

// Rtsp Stream
// Stream = require('node-rtsp-stream');
// stream = new Stream({
//   name: 'name',
//   streamUrl: 'rtsp://192.168.0.64:8554/camera/0/33',
//   wsPort: 9999,
//   ffmpegOptions: { // options ffmpeg flags
// 	'-stats': '', // an option with no neccessary value uses a blank string
// 	'-r': 30 // options with required values specify the value after the key
//   }
// });