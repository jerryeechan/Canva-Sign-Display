var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server); 

server.listen(3000);
app.use(express.static(__dirname + '/public'));

app.get('/',function(req, res){
	res.sendFile(__dirname + '/index.html');
});
app.get('/sign1',function(req, res){
	res.sendFile(__dirname + '/1.html');
});
app.get('/sign2',function(req, res){
	res.sendFile(__dirname + '/2.html');
});
app.get('/sign3',function(req, res){
	res.sendFile(__dirname + '/3.html');
});
app.get('/sign4',function(req, res){
	res.sendFile(__dirname + '/4.html');
});
app.get('/sign5',function(req, res){
	res.sendFile(__dirname + '/5.html');
});

io.sockets.on('connection', function(socket){
	
	socket.on('drawing1', function(data){
		io.sockets.emit('display1', data);
	});
	socket.on('drawing2', function(data){
		io.sockets.emit('display2', data);
	});
	socket.on('drawing3', function(data){
		io.sockets.emit('display3', data);
	});
	socket.on('drawing4', function(data){
		io.sockets.emit('display4', data);
	});
	socket.on('drawing5', function(data){
		io.sockets.emit('display5', data);
	});
	
});