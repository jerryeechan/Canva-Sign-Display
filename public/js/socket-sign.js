jQuery(function($){
	var socket = io.connect();
	
	$('canvas').on('touchmove mousemove',function(e){
		e.preventDefault();
		if(curCoord!=null) {
			//console.log('emit drawing');
			socket.emit('drawing', curCoord);
		}
	});
	
	/*$('canvas').mousemove(function(){
		
	});*/
	
});

