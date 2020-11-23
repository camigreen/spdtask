const WebSocket = require('ws');

// Constructor
function TaskWS() {
    // always initialize all instance properties
    this.wss = new WebSocket.Server({ port: 3030 });
    this.message = "Welcome to the SPD WebSocket";
    this.wss.on('connection', ws => {
        ws.on('message', message => {
          console.log(`Received message => ${wsc.getMessage(message)}`);
        });
        ws.send(this.message);
      });
    
  }
  // class methods
  TaskWS.prototype.getMessage = function() {
    return this.message;
  };
  // export the class
  module.exports = TaskWS;