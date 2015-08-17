var ctx1, ctx2, ctx3, ctx4, ctx5;
var lineWidth = 10;
var lineStyle = 'round';
var mx1, my1;
var mx2, my2;
var mx3, my3;
var mx4, my4;
var mx5, my5;
jQuery(function($){
	var socket = io.connect();
	ctx1 = document.getElementById('canvas1').getContext("2d");
	ctx2 = document.getElementById('canvas2').getContext("2d");
	ctx3 = document.getElementById('canvas3').getContext("2d");
	ctx4 = document.getElementById('canvas4').getContext("2d");
	ctx5 = document.getElementById('canvas5').getContext("2d");
	ctx1.lineWidth = lineWidth;
	ctx2.lineWidth = lineWidth;
	ctx3.lineWidth = lineWidth;
	ctx4.lineWidth = lineWidth;
	ctx5.lineWidth = lineWidth;
	ctx1.lineCap = lineStyle;
	ctx2.lineCap = lineStyle;
	ctx3.lineCap = lineStyle;
	ctx4.lineCap = lineStyle;
	ctx5.lineCap = lineStyle;
	
	socket.on('display1-st', function(data){
		ctx1.beginPath();
		ctx1.moveTo(data.x, data.y);
	});
	socket.on('display1', function(data){
		ctx1.lineTo(data.x, data.y);
		ctx1.stroke();
	});
	
	socket.on('display2-st', function(data){
		ctx2.beginPath();
		ctx2.moveTo(data.x, data.y);
	});
	socket.on('display2', function(data){
		ctx2.lineTo(data.x, data.y);
		ctx2.stroke();
	});
	
	socket.on('display3-st', function(data){
		ctx3.beginPath();
		ctx3.moveTo(data.x, data.y);
	});
	socket.on('display3', function(data){
		ctx3.lineTo(data.x, data.y);
		ctx3.stroke();
	});
	
	socket.on('display4-st', function(data){
		ctx4.beginPath();
		ctx4.moveTo(data.x, data.y);
	});
	socket.on('display4', function(data){
		ctx4.lineTo(data.x, data.y);
		ctx4.stroke();
	});
	
	socket.on('display5-st', function(data){
		ctx5.beginPath();
		ctx5.moveTo(data.x, data.y);
	});
	socket.on('display5', function(data){
		ctx5.lineTo(data.x, data.y);
		ctx5.stroke();
	});
});

