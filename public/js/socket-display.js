var ctx1, ctx2, ctx3, ctx4, ctx5;
var lineWidth = 10;
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
	
	
	socket.on('display1', function(data){
		ctx1.beginPath();
		ctx1.moveTo(mx1, my1);
		ctx1.lineTo(data.x, data.y);
		ctx1.stroke();
		
		mx1 = data.x;
		my1 = data.y;
	});
	socket.on('display2', function(data){
		ctx2.beginPath();
		ctx2.moveTo(mx2, my2);
		ctx2.lineTo(data.x, data.y);
		ctx2.stroke();
		
		mx2 = data.x;
		my2 = data.y;
	});
	socket.on('display3', function(data){
		ctx3.beginPath();
		ctx3.moveTo(mx3, my3);
		ctx3.lineTo(data.x, data.y);
		ctx3.stroke();
		
		mx3 = data.x;
		my3 = data.y;
	});
	socket.on('display4', function(data){
		ctx4.beginPath();
		ctx4.moveTo(mx4, my4);
		ctx4.lineTo(data.x, data.y);
		ctx4.stroke();
		
		mx4 = data.x;
		my4 = data.y;
	});
	socket.on('display5', function(data){
		ctx5.beginPath();
		ctx5.moveTo(mx5, my5);
		ctx5.lineTo(data.x, data.y);
		ctx5.stroke();
		
		mx5 = data.x;
		my5 = data.y;
	});
	
});

