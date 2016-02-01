var net = require('net');
var fs = require('fs');
var readline = require('readline');
var path = require('path');
var TelnetInput = require('telnet-stream').TelnetInput;
var TelnetOutput = require('telnet-stream').TelnetOutput;
var awsIot = require('aws-iot-device-sdk');

//Initialize AI its a binary classifier it can define either this or that 
// you can use a few of them in order to create a decision tree for 
// different situations for more information you can check limdu
// you must take these values from current readings.
//this is a very bad 
var workingClassifier = new limdu.classifiers.NeuralNetwork();
workingClassifier.trainBatch([
    {input: { current : 0.0015 }, output: 0},  // not working
    {input: { current : 0.0016 }, output: 0}, // not working
    {input: { current : 0.0015 }, output: 0},  // not working
    {input: { current : 0.0016 }, output: 0}, // not working
	{input: { current : 0.0015 }, output: 0},  // not working
    {input: { current : 0.0016 }, output: 0}, // not working
	{input: { current : 0.15 }, output: 1},  //  working
    {input: { current : 0.16 }, output: 1}, //  working
	{input: { current : 0.15 }, output: 1},  //  working
    {input: { current : 0.16 }, output: 1}, //  working
	{input: { current : 0.15 }, output: 1},  // working
    {input: { current : 0.16 }, output: 1}, //  working	
    ]);
// initilize IoT you should use the certificates that you were given
var device = awsIot.device({
   keyPath: './certs/XXXXXXX-private.pem.key',
  certPath: './certs/XXXXXXX-certificate.pem.crt',
    caPath: './certs/rootCA.pem.crt',
  clientId: 'iot_thing', //name of your thing mine is iot_thing
    region: 'us-west-2' //name of your AWS host
});
// connect to Amazon IoT and subscribe to our channel 
device
  .on('connect', function() {
    console.log('connected'); //name of your thing mine is iot_thing
	device.subscribe('iot_thing');
  });
 // reading from socket
var socket = net.createConnection(23, '192.168.2.80', function() {
	var data=[];
    var telnetInput = new TelnetInput();
    var telnetOutput = new TelnetOutput();
	var lineReader = readline.createInterface({
		input: telnetInput,
		output: telnetOutput
	});
	lineReader.on('line', function (line) {
		var deviceStatus = parseFloat(workingClassifier.classify({current : line}));
		if(status <0.5)
			{
				//send message to IoT for publishing or Storing
				device.publish('iot_thing', JSON.stringify({ status: deviceStatus}));
			}
		
	});
    socket.pipe(telnetInput).pipe(writer);
    process.stdin.pipe(telnetOutput).pipe(socket);
});