
var p = CanvasRenderingContext2D.prototype;

p.circle = function(x, y, radius) { 
	this.beginPath(); 
	this.arc(x, y, radius, 0, Math.PI*2, true); 
};

p.fillCircle = function(x, y, radius) { 
	this.circle(x, y, radius); 
	this.fill(); 
	this.beginPath();
};

p.strokeCircle = function(x, y, radius) { 
	this.circle(x, y, radius); 
	this.stroke(); 
	this.beginPath();
};

p.ellipse = function(x, y, width, height) { 
	if (height == undefined) height = width;
	this.beginPath(); 
	for(var i=0;i<Math.PI*2;i+=Math.PI/16) { 
		this.lineTo(x+(Math.cos(i)*width/2), y+(Math.sin(i)*height/2));
	}
	this.closePath(); 
};

p.Hellipse = function(x, y, width, height) { 
	if (height == undefined) height = width;
	this.beginPath(); 
	for(var i=0;i<Math.PI*2;i+=Math.PI/64) { 
		this.lineTo(x+(Math.cos(i)*width/2), y+(Math.sin(i)*height/2));		
	}
	this.closePath(); 
};

p.fillEllipse = function(x, y, width, height) { 
	if (height == undefined) height = width;
	this.ellipse(x,y,width, height); 
	this.fill(); 
	this.beginPath();
};
p.HfillEllipse = function(x, y, width, height) { 
	if (height == undefined) height = width;
	this.Hellipse(x,y,width, height); 
	this.fill(); 
	this.beginPath();
};

p.strokeEllipse = function(x, y, width, height) { 
	if (height == undefined) height = width;
	this.ellipse(x,y,width, height); 
	this.stroke(); 
	this.beginPath();
};
p.HstrokeEllipse = function(x, y, width, height) { 
	if (height == undefined) height = width;
	this.Hellipse(x,y,width, height); 
	this.stroke(); 
	this.beginPath();
};

p.centreStrokeRect = function(x, y, width, height) { 
	this.strokeRect(x - width/2, y - height/2, width, height)
};

p.centreFillRect = function(x, y, width, height) { 
	this.fillRect(x - width/2, y - height/2, width, height)
};

p.line = function (x1, y1, x2, y2){
	this.beginPath(); 
	this.moveTo(x1,y1); 
	this.lineTo(x2,y2); 
	this.stroke(); 
	this.beginPath();
};


p.strokePolygon = function (x, y, sides, size) {
	this.polygon(x, y, sides, size);
	this.stroke();
}


p.fillPolygon = function (x, y, sides, size){
	this.polygon(x, y, sides, size);
	this.fill();
}

p.polygon = function (x, y, sides, size){
	 //var numberOfSides = 6;
       // size = 10;
        Xcenter = x;
        Ycenter = y;

    this.beginPath();
    this.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

    for (var i = 1; i <= sides; i += 1) 
    {
        this.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / sides), Ycenter + size * Math.sin(i * 2 * Math.PI / sides));
    }

  
}
// p.fill = function (f){
// 	this.fillStyle = f; 
// };
p.strokeWeight = function(j){
	this.lineWidth = j;
}

p.triangle = function(x1, y1, x2, y2, x3, y3) {
      this.beginPath(); 
      this.moveTo(x1, y1);
      this.lineTo(x2, y2);
      this.lineTo(x3, y3);
      this.lineTo(x1, y1);
      this.stroke(); 
      this.closePath();
 };

 p.strokeTriangle = function(x1, y1, x2, y2, x3, y3) {
 	this.beginPath(); 
     this.moveTo(x1, y1);
     this.lineTo(x2, y2);
     this.lineTo(x3, y3);
     this.lineTo(x1, y1);
     this.stroke(); 
     this.closePath();
}

 p.fillTriangle = function(x1, y1, x2, y2, x3, y3) {
      this.beginPath(); 
      this.moveTo(x1, y1);
      this.lineTo(x2, y2);
      this.lineTo(x3, y3);
      this.lineTo(x1, y1);
      this.fill(); 
      this.closePath();
 };


p.eqDownFillTriangle = function(x, y, sz, down) {
	//ctx.save();
	ctx.translate(x, y);
	ctx.rotate(radians(180));
	ctx.fillTriangle(0, 0 - sz, 0 + sz, 0 + sz/2, 0 - sz, 0 + sz/2);
	ctx.rotate(radians(-180));
	ctx.translate(-x, -y);
	//ctx.restore();
}


p.eqDownTriangle = function(x, y, sz, down) {
	//ctx.save();
	ctx.translate(x, y);
	ctx.rotate(radians(180));
	ctx.triangle(0, 0 - sz, 0 + sz, 0 + sz/2, 0 - sz, 0 + sz/2);
	ctx.rotate(radians(-180));
	ctx.translate(-x, -y);

}

p.eqFillTriangle = function(x, y, sz, down) {
	ctx.fillTriangle(x, y - sz, x + sz, y + sz/2, x - sz, y + sz/2);
}

p.eqTriangle = function(x, y, sz, down) {
	ctx.triangle(x, y - sz, x + sz, y + sz/2, x - sz, y + sz/2);
}
 // p.triangle2 = function(x,y,width, height) {
 // 	this.save();
 // 	this.translate(window.innerWidth/2-x/2,window.innerHeight/2-y/2);
 //    this.beginPath(); 
 //    this.moveTo(width/2, 0);
 //    this.lineTo(width, height);
 //    this.lineTo(0, height);
 //    this.lineTo(width/2, 0);
 //    this.stroke(); 
 //    this.closePath();
 //    this.restore();
 // };



p.background = function (r, g, b, a){
	if (g == undefined) {

		this.fillStyle = rgb(r, r, r);

	} else if (b == undefined && a == undefined) {

		this.fillStyle = rgba(r, r, r, g); 

	} else if (a == undefined) {

		this.fillStyle = rgb(r, g, b);

	} else {
		this.fillStyle = rgba(r, g, b, a); 
	}
	
	this.fillRect(0, 0, w, h); 
};

function radians(deg) {return deg*Math.PI/180;}; 
function degrees(rad) {return rad*180/Math.PI;};

function degreesToPoint(deg, diameter) {
    var rad = Math.PI * deg / 180;
    var r = diameter / 2;
    return {x: r * Math.cos(rad), y: r * Math.sin(rad)};
}


function xyz(px, py, pz, pitch, roll, yaw) {
	
    var cosa = Math.cos(yaw);
    var sina = Math.sin(yaw);

    var cosb = Math.cos(pitch);
    var sinb = Math.sin(pitch);

    var cosc = Math.cos(roll);
    var sinc = Math.sin(roll);

    var Axx = cosa*cosb;
    var Axy = cosa*sinb*sinc - sina*cosc;
    var Axz = cosa*sinb*cosc + sina*sinc;

    var Ayx = sina*cosb;
    var Ayy = sina*sinb*sinc + cosa*cosc;
    var Ayz = sina*sinb*cosc - cosa*sinc;

    var Azx = -sinb;
    var Azy = cosb*sinc;
    var Azz = cosb*cosc;

    x = Axx*px + Axy*py + Axz*pz;
    y = Ayx*px + Ayy*py + Ayz*pz;
    z = Azx*px + Azy*py + Azz*pz;

    return {x:x, y:y, z:z};
}

function rgb(r, g, b) { 
	if (g == undefined) g = r;
	if (b == undefined) b = r;
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';};

function rgba(r, g, b, a) { 
	if (b == undefined) {
		return 'rgba('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(r),0,255)+', '+clamp(Math.round(r),0,255)+', '+clamp(g,0,1)+')';
	} else {
		return 'rgba('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+', '+clamp(a,0,1)+')';
	
	}
	};
function hsl(h, s, l) { return 'hsl('+h+', '+clamp(s,0,100)+'%, '+clamp(l,0,100)+'%)';};
function hsla(h, s, l, a) { return 'hsla('+h+', '+clamp(s,0,100)+'%, '+clamp(l,0,100)+'%, '+clamp(a,0,1)+')';};

function brightness(r, g, b){
      return Math.floor(rgbToHsl(r, g, b)[2]*100);
    };

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function randomInt(min, max) {
	if(max===undefined) {
		max = min; 
		min = 0; 
	}
	return Math.floor(Math.random() * (max+1-min)) +min;
}



function map(value, min1, max1, min2, max2, clampResult) { 
	var returnvalue = ((value-min1) / (max1 - min1) * (max2-min2)) + min2; 
	if(clampResult) return clamp(returnvalue, min2, max2); 
	else return returnvalue; 
};

function log(val){
	console.log(val);
}

// function clamp(value, min, max) { 
// 	if(max<min) { 
// 		var temp = min; 
// 		min = max; 
// 		max = temp; 
		
// 	}
// 	return Math.max(min, Math.min(value, max)); 
// };

function clamp(value, min, max){
 	return Math.min(Math.max(value, Math.min(min, max)),Math.max(min, max));
}

function inRange(value){
 	return value >= Math.min(min, max) && value <= Math.max(min, max);
}

function dist(x1, y1, x2, y2) { 
	x2-=x1; y2-=y1; 
	return Math.sqrt((x2*x2) + (y2*y2)); 
}

function random(min, max) { 
	if(min===undefined) { 
		min = 0; 
		max = 1; 
	} else if(max=== undefined) { 
		max = min; 
		min = 0; 
	}
	return (Math.random() * (max-min)) + min;
};

function tween(pos, target, speed){
	if (speed == undefined) speed = 20;
	pos  += (target - pos)/speed;
	return pos;
}

function chance(value){
	if (random(value) > value-1) return true;
}

function posNeg(){
	return randomInt(0,1) * 2 - 1;
}

function bounce(num, min, max) {
	if (num >= max || num <= min) {
		return 1 
	} else {
		return 0;
	}
   //return num > max ? -1 : num < min ? -1 : 1
}

// Adapted from https://github.com/psalaets/line-intersect/
function checkIntersection( x1, y1, x2, y2, x3, y3, x4, y4 ) {
	
	if(
		(x1 === x3 && y1 == y3) ||
		(x1 === x4 && y1 == y4) ||
		(x2 === x3 && y2 == y3) ||
		(x2 === x4 && y2 == y4)
	) {
		return false
	}
		
	
	var denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
	var numeA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3));
	var numeB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3));

	if( denom === 0 || (numeA === 0 && numeB === 0) ) {
		return false
	}

	var uA = numeA / denom;
	var uB = numeB / denom;

	if( uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1 ) {
		return [
			(uA * (x2 - x1)) + x1,
			(uA * (y2 - y1)) + y1
		]
	}
	
}

function cross(_x, _y, _w, _h){
	if (_w === undefined) _w =20;
	if (_h === undefined) _h =60;
	ctx.fillRect( _x - _w/2, _y - _h/2,  _w, _h);
	ctx.fillRect( _x - _h/2, _y - _w/2,  _h, _w);
}

function makeGrid(_w, _h){
	var grid = [];
	var k = 0
	for (var y = 0; y < _h; y++) {
		for (var x = 0; x < _w; x++) {
		grid[k] = [x, y];
		k++;
		}
	};
	//console.log(grid);
	return grid;
}

function createGrid(_gw, _gh, _w, _h){
	var spacing_x = _w/_gw;
	var spacing_y = _h/_gh;
	var grid = [];
	var k = 0
	for (var y = 0; y < _gh; y++) {
		for (var x = 0; x < _gw; x++) {
		grid[k] = [x*spacing_x+ spacing_x/2, y*spacing_y+ spacing_y/2];
		k++;
		}
	};
	//console.log(grid);
	return grid;
}


function pixelate(blocksize,blockshape) {
  if (blockshape == undefined) blockshape = 0;
  if (blocksize == undefined) blocksize = 20;
  var imgData=ctx.getImageData(0,0,w,h); 
  ctx.clearRect(0,0,w,h);
    //var sourceBuffer8 = new Uint8Array(imgData.data.buffer);
    //var sourceBuffer8 = new Uint8ClampedArray(imgData.data.buffer);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    for(var x = 0; x < w; x += blocksize)
    {
        for(var y = 0; y < h; y += blocksize)
        {

          var pos = (x + y * w);
          var b = (sourceBuffer32[pos] >> 16) & 0xff;
          var g = (sourceBuffer32[pos] >> 8) & 0xff;
          var r = (sourceBuffer32[pos] >> 0) & 0xff;
          ctx.fillStyle = rgb(r,g,b);
          if (blockshape == 0) {
            ctx.fillRect(x, y, blocksize, blocksize);
          } else if (blockshape == 1) {
          	ctx.fillEllipse(x, y, blocksize, blocksize);
          } else if (blockshape == 2) {
          	var bb = brightness(r,g,b);
          	ctx.fillStyle = (bb < 40 ? rgb(0) : rgb(255));
            ctx.fillEllipse(x, y, blocksize-1, blocksize-1);
          } else {
          	var bb = brightness(r,g,b);
          	if (bb< 40) {
          		ctx.fillStyle = rgb(0);
          		ctx.fillEllipse(x, y, blocksize-1, blocksize-1);
          	} else {
          		ctx.fillStyle = rgb(255);
          		ctx.fillEllipse(x, y, blocksize-1, blocksize-1);
            	ctx.strokeEllipse(x, y, blocksize, blocksize);
          	}
          	//ctx.fillStyle = (bb < 40 ? rgb(0) : rgb(255));
          	
          	
            
          };

        }
    }

}


function halftone(blocksize, reverse) {
  if (reverse == undefined) reverse = 1;
  if (reverse == true) reverse = -1;
  if (blocksize == undefined) blocksize = 20;
  var imgData=ctx.getImageData(0,0,w,h); 
  
  ctx.clearRect(0,0,w,h);
  var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
  ctx.fillStyle = rgb(0,0,0);

  for(var x = 0; x < w; x += blocksize) {
        
        for(var y = 0; y < h; y += blocksize) {

        	var pos = (x + y * w);
        	var b = (sourceBuffer32[pos] >> 16) & 0xff;
			var g = (sourceBuffer32[pos] >> 8) & 0xff;
        	var r = (sourceBuffer32[pos] >> 0) & 0xff;
          	if (reverse == -1) {
          		var bb = 100 - brightness(r,g,b);
          	} else {
          		var bb = brightness(r,g,b);
          	}

          	ctx.fillEllipse(x, y, blocksize*bb/100, blocksize*bb/100);
          
            
          };

        }
    }




function triangulate(grid_w, grid_h, alpha) {

	if (grid_h == undefined) {
		grid_h = grid_w;
	}

	if (alpha == undefined) {
		alpha = 0.8;
	}

	var ww = Math.ceil(w/grid_w);
	var	hh = Math.ceil(h/grid_h);
	//console.log(ww)
    var imgData=ctx.getImageData(0,0,w,h); 
    ctx.clearRect(0,0,w,h);
    //var sourceBuffer8 = new Uint8Array(imgData.data.buffer);
    //var sourceBuffer8 = new Uint8ClampedArray(imgData.data.buffer);

    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    var i =0;
    for(var x = 0; x < w; x += grid_w)
    {
        for(var y = 0; y < h; y += grid_h)
        {

          var pos = (x + y * w);
          var b = (sourceBuffer32[pos] >> 16) & 0xff;
          var g = (sourceBuffer32[pos] >> 8) & 0xff;
          var r = (sourceBuffer32[pos] >> 0) & 0xff;
          ctx.fillStyle = rgba(r,g,b, alpha);

          if (i%2) {
			ctx.fillTriangle(x, y - grid_h, x, y + grid_h, x - grid_w, y );
			} else {
			ctx.fillTriangle(x - grid_w, y - grid_h, x, y, x - grid_w , y + grid_h);

			}

			i++;
        }
    }

}

var mousePressed = 0;
document.onmousedown = function() { 
  mousePressed = 1;
  //window.mousePressed();
}
document.onmouseup = function() {
  mousePressed = 0;
  //window.mouseup();
}


var mouseX = 0, 
	mouseY = 0, 
	lastMouseX = 0, 
	lastMouseY = 0, 
	frameRate = 60,
	frameCount = frameNumber = 0, 
	lastUpdate = Date.now(),
	mouseDown = false;

function cjsloop() {

	var now = Date.now(); 
	var elapsedMils = now - lastUpdate; 
	
	if((typeof window.draw == 'function') && (elapsedMils>=(1000/window.frameRate))) {
		window.draw(); 
		frameCount++;
		frameNumber++;
		lastUpdate = now - elapsedMils % (1000/window.frameRate );
		lastMouseX = mouseX; 
		lastMouseY = mouseY; 		
	}
	
	
	requestAnimationFrame(cjsloop);

};

	


// requestAnimationFrame 
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());




function init() {
	
	window.addEventListener('mousemove', function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	window.addEventListener('mousedown', function(e){mouseDown =true; if(typeof onMouseDown == 'function') onMouseDown() ;});
	window.addEventListener('mouseup', function(e){mouseDown = false;if(typeof onMouseUp == 'function') onMouseUp()  ;});
	window.addEventListener('keydown', function(e){if(typeof onKeyDown == 'function') onKeyDown(e)  ;});
	window.addEventListener('keyup', function(e){if(typeof onKeyUp == 'function') onKeyUp(e)  ;});
	
	if(typeof window.setup == 'function') window.setup();
	cjsloop(); 
		
}

window.addEventListener('load',init);