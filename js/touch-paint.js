/*
TouchPaint

Copyright (c) 2011, Greg Murray
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.
3. All advertising materials mentioning features or use of this software
   must display the following acknowledgement:
   This product includes software developed by Greg Murray.
4. Neither the name of Greg Murray nor the
   names of its contributors may be used to endorse or promote products
   derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY Greg Murray ''AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Greg Murray BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

window.TouchPaint = function( uuid, args) {

  console.log(args);
   var _widget = this;
   var _enabled = true;
   _widget.last = null;
   _widget.history = [];
   _widget.color = "#333333";
   _widget.strokeSize = 15;
   _widget.strokes = [];
   _widget.firstTouch = null;

  function getPosition( _e ){
      var pX = 0;
      var pY = 0;
      if( _e.offsetParent ) {
          while(true){
              pY += _e.offsetTop;
              pX += _e.offsetLeft;
              if( _e.offsetParent === null ) {
                  break;
              }
              _e = _e.offsetParent;
          }
      } else if( _e.y ) {
          pY += _e.y;
          pX += _e.x;
      }
      return  { x: pX, y: pY };
  }

  this.setColor = function( _color ) {
      _widget.ctx.strokeStyle = _color;
      _widget.color = _color;
  };

  this.setStrokeSize = function( _size ) {
    _widget.ctx.lineWidth = _size;
    _widget.strokeSize = _size;
  };

  this.reset = function() {
      _widget.clear();
  };

  this.clear = function() {
      _widget.ctx.beginPath();
      _widget.ctx.fillStyle = "#FFFFFF";
      _widget.ctx.clearRect( 0, 0, _widget.width, _widget.height );
      _widget.ctx.fillRect( 0, 0, _widget.width, _widget.height );
      _widget.ctx.closePath();
      _widget.history = [];
      _widget.strokes = [];
      _widget.last = null;
  	  _widget.firstTouch = null;
	  _widget.drawing = false;
	  _widget.refreshPosition();
  };

  function startDrawing( e ) {
      _widget.pos = getPosition( _widget.canvas );
      _widget.drawing = true;
      _widget.strokes = [];
	  _widget.firstTouch = null;
	  var _next;
      var _current;
      if ( e.targetTouches && e.targetTouches.item(0) !== null ) {
              var te =  e.targetTouches.item(0);
              _current = { x : te.pageX - _widget.pos.x -1, y : te.pageY - _widget.pos.y }; 
              _next = { x : te.pageX - _widget.pos.x + 1, y : te.pageY - _widget.pos.y };     
	  } else {
              _current =  { x : e.pageX - _widget.pos.x  - 1, y : e.pageY - _widget.pos.y };
              _next = _current ={ x : e.pageX - _widget.pos.x + 1, y : e.pageY - _widget.pos.y };
      }
	  _widget.firstTouch = { current : _current, next : _next } ;
	  e.preventDefault();
  }

  function saveStrokes() {
      if ( window.JSON ) {
        var jsonText = JSON.stringify(_widget.history);
        pictureDao.save( jsonText );
    }
  }

  function stopDrawing( e ) {
      // if we are just a dot
	  if ( _widget.strokes.length === 0 && _widget.firstTouch !== null) {
          _widget.plotLine( _widget.firstTouch.current, _widget.firstTouch.next );
	  }
	  _widget.firstTouch = null;
      _widget.drawing = false;
      _widget.last = null;
      saveStrokes();
      e.preventDefault();
  }

  function move( e ) {
      if ( _widget.drawing ) {
          var te =  e.targetTouches.item(0);
          var _current = { x : te.pageX - _widget.pos.x -1, y : te.pageY - _widget.pos.y }; 
          if ( _widget.last !== null) {
              _widget.plotLine( _widget.last, _current );
          }
          _widget.last = _current;
      }
      e.preventDefault();
  }

  function moveMouse( e ) {
      if ( _widget.drawing ) {
          var _current = { x : e.pageX - _widget.pos.x, y : e.pageY - _widget.pos.y };
          if ( _widget.last !== null) {
              _widget.plotLine( _widget.last, _current );
          }
          _widget.last = _current;
      }
      e.preventDefault();
  }

  this.plotLine = function( start, end, _color, _size ) {
      if ( typeof _color !== "undefined" ) {
          _widget.ctx.strokeStyle = _color;
      } else {
          _color = _widget.color;
      }
      if ( typeof _size !== "undefined" ) {
          _widget.ctx.lineWidth = _size;
      } else {
          _size = _widget.strokeSize;
      }
      _widget.ctx.beginPath();
      _widget.ctx.moveTo( start.x,start.y );
      _widget.ctx.lineTo( end.x, end.y );
      _widget.ctx.stroke();
      _widget.ctx.closePath();
      var _item = { s : start, e : end, c : _color, sz : _size };
      _widget.strokes.push( _item );
      _widget.history.push( _item );
      _widget.ctx.strokeStyle = _widget.color;
      _widget.ctx.lineWidth = _widget.strokeSize;
  };
  
  function gobbler( e ) {
      e.preventDefault();
  }

  this.getData = function() {
      return _widget.history;
  };

  this.refreshPosition = function() {
      _widget.pos = getPosition( _widget.canvas );
  };

  function init() {
  	if ( typeof args.enabled === "boolean" ) {
  	    _enabled = args.enabled;
  	}
	
    _widget.canvas = document.getElementById( uuid );
	if ( typeof args.height === "number" ) {
	    _widget.height = args.height;
	} else {
	    _widget.height = _widget.canvas.clientHeight;
	}
	if ( typeof args.width === "number" ) {
	    _widget.width = args.width;
	} else {
	    _widget.width = _widget.canvas.clientWidth;
	}
    _widget.canvas.style.cursor = "crosshair";
	_widget.canvas.style.background = "#fff";
    _widget.ctx = _widget.canvas.getContext( "2d" );
	_widget.ctx.lineCap = "round";

    if ( _enabled === true ) {
       _widget.canvas.addEventListener( "touchmove", move, false );
        _widget.canvas.addEventListener( "touchstart", startDrawing, false );
        document.body.addEventListener( "gesturestart", gobbler, true );
        _widget.canvas.addEventListener( "touchend", stopDrawing, false );
        _widget.canvas.addEventListener( "mousemove", moveMouse, false );
        _widget.canvas.addEventListener( "mousedown", startDrawing, false );
        _widget.canvas.addEventListener( "click", stopDrawing, false );
    }
    _widget.setColor( _widget.color );
    _widget.ctx.lineWidth = _widget.strokeSize;

  }

  init();

};