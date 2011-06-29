var express = require('express');
var sys = require("sys");
var util = require('util');
var io = require("socket.io");
var dgram = require('dgram');

var lightswitch_socket = dgram.createSocket("udp4");
var lightswitch_value = 0;
var last_lightswitch_value = 0;

app = express.createServer();

app.listen(8080);


app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


var socket = io.listen(app);

socket.on('connection', function(client) {

  client.on('message', function(message){
    console.log(message);
    lightswitch_value = message.slider_value;
  });
});

setInterval(function() {
    if ( lightswitch_value != last_lightswitch_value ) {
        var value_in_hex = (parseInt(lightswitch_value)*2.55).toString(16);
        var buffer = new Buffer("0000000000" + value_in_hex + "0000\x0d\x0a");
        lightswitch_socket.send(buffer, 0, 18, 9802, '97.102.15.225', function(a,b,c) {
            console.log(a,b,c);
        });
        last_lightswitch_value = lightswitch_value;
    }
}, 100);

