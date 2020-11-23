var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var jail = require('./routes/jail');
var doors = require('./routes/doors');
const Websocket = require('ws');

var cams = true;

var port = 3000;

var app = express();

//view engine
console.log(path.join(__dirname, 'views'));
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

  if(cams) {
  // Rtsp Stream
Stream = require('node-rtsp-stream');
var streams = [];
streams.push(new Stream({
  name: 'WestGate',
  streamUrl: 'rtsp://192.168.0.64:8554/camera/0/28',
  wsPort: 9990,
  ffmpegOptions: { // options ffmpeg flags
	'-stats': '', // an option with no neccessary value uses a blank string
	'-r': 30 // options with required values specify the value after the key
  }
}));

streams.push(new Stream({
  name: 'InsideGate',
  streamUrl: 'rtsp://192.168.0.64:8554/camera/0/18',
  wsPort: 9991,
  ffmpegOptions: { // options ffmpeg flags
	'-stats': '', // an option with no neccessary value uses a blank string
	'-r': 30 // options with required values specify the value after the key
  }
}));


}

// var ping = require('ping');
 
// var hosts = ['10.10.3.40'];
// hosts.forEach(function(host){
//     ping.sys.probe(host, function(isAlive){
//         var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
//         console.log(msg);
//     });
// });