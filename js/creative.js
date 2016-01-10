
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
	this.beginPath(); 
	for(var i=0;i<Math.PI*2;i+=Math.PI/16) { 
		this.lineTo(x+(Math.cos(i)*width/2), y+(Math.sin(i)*height/2));
	}
	this.closePath(); 
};

p.Hellipse = function(x, y, width, height) { 
	this.beginPath(); 
	for(var i=0;i<Math.PI*2;i+=Math.PI/64) { 
		this.lineTo(x+(Math.cos(i)*width/2), y+(Math.sin(i)*height/2));		
	}
	this.closePath(); 
};

p.fillEllipse = function(x, y, width, height) { 
	this.ellipse(x,y,width, height); 
	this.fill(); 
	this.beginPath();
};
p.HfillEllipse = function(x, y, width, height) { 
	this.Hellipse(x,y,width, height); 
	this.fill(); 
	this.beginPath();
};

p.strokeEllipse = function(x, y, width, height) { 
	this.ellipse(x,y,width, height); 
	this.stroke(); 
	this.beginPath();
};
p.HstrokeEllipse = function(x, y, width, height) { 
	this.Hellipse(x,y,width, height); 
	this.stroke(); 
	this.beginPath();
};

p.line = function (x1, y1, x2, y2){
	this.beginPath(); 
	this.moveTo(x1,y1); 
	this.lineTo(x2,y2); 
	this.stroke(); 
	this.beginPath();
};

// p.fill = function (f){
// 	this.fillStyle = f; 
// };

 p.triangle = function(x1, y1, x2, y2, x3, y3) {
      this.beginPath(); 
      this.moveTo(x1, y1);
      this.lineTo(x2, y2);
      this.lineTo(x3, y3);
      this.lineTo(x1, y1);
      this.stroke(); 
      this.closePath();
 };

 p.fillTriangle = function(x1, y1, x2, y2, x3, y3) {
      this.beginPath(); 
      this.moveTo(x1, y1);
      this.lineTo(x2, y2);
      this.lineTo(x3, y3);
      this.lineTo(x1, y1);
      this.fill(); 
      this.closePath();
 };

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

function radians(deg) {return deg*Math.PI/180;}; 
function degrees(rad) {return rad*180/Math.PI;};
function rgb(r, g, b) { return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';};
function rgba(r, g, b, a) { return 'rgba('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+', '+clamp(a,0,1)+')';};
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

function map(value, min1, max1, min2, max2, clampResult) { 
	var returnvalue = ((value-min1) / (max1 - min1) * (max2-min2)) + min2; 
	if(clampResult) return clamp(returnvalue, min2, max2); 
	else return returnvalue; 
};

function clamp(value, min, max) { 
	if(max<min) { 
		var temp = min; 
		min = max; 
		max = temp; 
		
	}
	return Math.max(min, Math.min(value, max)); 
};

function dist(x1, y1, x2, y2) { 
	x2-=x1; y2-=y1; 
	return Math.sqrt((x2*x2) + (y2*y2)); 
}


function tween(pos, target, speed){
	if (speed == undefined) speed = 20;
	pos  += (target - pos)/speed;
	return pos;
}

function chance(value){
	if (random(value) > value-1) return true;
}

function posNeg(){
	return random(0,1) * 2 - 1;
}

var mousePressed = 0;
document.onmousedown = function() { 
  ++mousePressed;
}
document.onmouseup = function() {
  --mousePressed;
}


var mouseX = 0, 
	mouseY = 0, 
	lastMouseX = 0, 
	lastMouseY = 0, 
	frameRate = 60, 
	lastUpdate = Date.now(),
	mouseDown = false;

function cjsloop() {

	var now = Date.now(); 
	var elapsedMils = now - lastUpdate; 
	
	
	if((typeof window.draw == 'function') && (elapsedMils>=(1000/window.frameRate))) {
		window.draw(); 
		
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