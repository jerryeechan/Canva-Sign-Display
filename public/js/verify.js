var Verifier = function(pageName)
{
	var key = pageName;
	function init()
	{
		console.log('init');
		console.log($('#touchpaint').get(0));
		$('#touchpaint').css('visibility','hidden');
	}
	this.test = function(password)
	{
		console.log('test');		
		if(key == password)
		{
			console.log('correct');
			$('#touchpaint').css('visibility','visible');
			$('#passwordform').css('display','none');
		}

		
		return false;
	}
	init();
}


