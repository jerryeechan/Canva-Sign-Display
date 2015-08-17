
var colors = [
    "#333333",
    "#FF2100",
    "#35B36C",
    "#87601C",
    "#00ABE4",
    "#FF9900",
    "#FFFF00",
    "#FFFFFF"
];

var brushes = [
 { label : "Large", size : 20 },
 { label : "Medium", size : 15 },
 { label : "Small", size : 5 }
];

/*function save() {
    if ( window.JSON ) {
        var data = tp.getData();
        var jsonText = JSON.stringify( data );
        pictureDao.save( jsonText, function(){
        } );
    }
}

function exportToPNG() {
	save();
    if ( window.JSON ) {
        var data = tp.getData();
        var jsonText = JSON.stringify( data );
        var exportData = document.getElementById( "exportData" );
        exportData.value = jsonText;
        var form = document.getElementById( "exportForm" );
        form.submit();
    }
}

function loadData() {
    pictureDao.load( function( json ) {
        try {
            var data = JSON.parse(json);
            for ( var i=0; i < data.length; i+=1 ) {
                tp.plotLine( data[i].s, data[i].e, data[i].c, data[i].sz );
            }
        } catch( error ) {
            alert("error loading " + error );
        }
    });
}*/

function selectColor( e ) {
    var _target = e.target;
    if ( !_target.color ) {
        _target = _target.parentNode;
    }
    if ( ! _target.color ) { return; }
    tp.setColor( _target.color );
    var _targetId = _target.targetId;
    for ( var i=0; i < colors.length; i+=1 ) {
        var _id = "color-item-" + i;
        var div = document.getElementById( _id );
        if ( _id === _targetId ) {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    }
    e.preventDefault();
}

window.onload = function() {
  // initailize the wiget
  window.tp = new TouchPaint( "touchpaint", {"height":1000,"width":1000} );

  // only use db if init was a success
 /* pictureDao.init( function() {
      var autosave = setInterval( save, 60000 );
      loadData();
  });*/
};
