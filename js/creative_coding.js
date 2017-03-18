
var TWO_PI = Math.PI * 2;

var p = CanvasRenderingContext2D.prototype;

p.colour = function (r, g, b, a){
  'use strict';
  this.fillStyle = this.getColour(r, g, b, a);
};

// p.fill = function (r, g, b, a) {
//   'use strict';
//   this.fillStyle = this.getColour(r, g, b, a);
// }

p.lineStyle = function (r, g, b, a){
  'use strict';
  this.strokeStyle = this.getColour(r, g, b, a);
};

p.lineColour = function (r, g, b, a){
  'use strict';
  this.strokeStyle = this.getColour(r, g, b, a);
};

p.colourName = function (c){
  'use strict';
  this.fillStyle = c;
};

p.getColour = function (r, g, b, a){
  'use strict';
  var c;

  if((typeof r === 'string' || r instanceof String) && r.substr(0,1) == "#") {

  return r;

  } else if (typeof r === 'string' || r instanceof String) {

  return r;

  } else if (g == undefined) {

    c = rgb(r, r, r);

  } else if (b == undefined && a == undefined) {

    c = rgba(r, r, r, g);

  } else if (a == undefined) {

    c = rgb(r, g, b);

  } else {

    c = rgba(r, g, b, a);

  }
  return(c);
};



p.makeCircle = function(x, y, radius) {
 'use strict';
 this.beginPath();
 this.arc(x, y, radius/2, 0, Math.PI*2, true);
};

p.circle = function(x, y, radius) {
  'use strict';
  this.makeCircle(x, y, radius);
  this.fill();
  this.closePath();
};

p.fillCircle = function(x, y, radius) {
  'use strict';
 this.makeCircle(x, y, radius);
 this.fill();
 this.closePath();
};

p.strokeCircle = function(x, y, radius) {
 'use strict';
 this.makeCircle(x, y, radius);
 this.stroke();
 this.closePath();
};

p.circleH = function(x, y, width, height) {
  'use strict';
  if (height == undefined) { height = width; }
  this.Hellipse(x,y,width, height);
  this.fill();
  this.closePath();
};

p.ellipse = function(x, y, width, height) {
 if (height == undefined) { height = width; }
 this.beginPath();
 for(var i=0; i<Math.PI*2; i+=Math.PI/16) {
 this.lineTo(x+(Math.cos(i)*width/2), y+(Math.sin(i)*height/2));
 }
 this.closePath();
};

p.Hellipse = function(x, y, width, height) {
 if (height == undefined) { height = width; }
 this.beginPath();
 for(var i=0;i<Math.PI*2;i+=Math.PI/64) {
 this.lineTo(x+(Math.cos(i)*width/2), y+(Math.sin(i)*height/2));
 }
 //this.closePath();
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
 if (height == undefined) { height = width; }
 this.Hellipse(x,y,width, height);
 this.stroke();
 this.beginPath();
};

p.square = function(x, y, width, height) {
  if (height == undefined) height = width;
  this.fillRect(x, y, width, height);
};


p.centreStrokeRect = function(x, y, width, height) {
 this.strokeRect(x - width/2, y - height/2, width, height);
};

p.centreFillRect = function(x, y, width, height) {
 this.fillRect(x - width/2, y - height/2, width, height);
};

p.line = function (x1, y1, x2, y2){
 this.beginPath();
 this.moveTo(x1,y1);
 this.lineTo(x2,y2);
 this.stroke();
 this.closePath();
};


p.strokePolygon = function (x, y, sides, size) {
 'use strict';
 this.polygon(x, y, sides, size);
 this.stroke();
}


p.fillPolygon = function (x, y, sides, size){
 this.polygon(x, y, sides, size);
 this.fill();
}

p.polygon = function (x, y, sides, size){
 Xcenter = x;
 Ycenter = y;
 this.beginPath();
 this.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
 for (var i = 1; i <= sides; i += 1) {
    this.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / sides), Ycenter + size * Math.sin(i * 2 * Math.PI / sides));
  }
}

p.strokeWeight = function(j){
 this.lineWidth = j;
}

p.triangle = function(x1, y1, x2, y2, x3, y3) {
 'use strict';
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
 this.translate(x, y);
 this.rotate(radians(180));
 this.fillTriangle(0, 0 - sz, 0 + sz, 0 + sz/2, 0 - sz, 0 + sz/2);
 this.rotate(radians(-180));
 this.translate(-x, -y);
}


p.eqDownTriangle = function(x, y, sz, down) {
 this.translate(x, y);
 this.rotate(radians(180));
 this.triangle(0, 0 - sz, 0 + sz, 0 + sz/2, 0 - sz, 0 + sz/2);
 this.rotate(radians(-180));
 this.translate(-x, -y);
}

p.eqFillTriangle = function(x, y, sz, down) {
 this.fillTriangle(x, y - sz, x + sz, y + sz/2, x - sz, y + sz/2);
}

p.eqTriangle = function(x, y, sz, down) {
 this.triangle(x, y - sz, x + sz, y + sz/2, x - sz, y + sz/2);
}


p.background = function (r, g, b, a){
  var c = this.getMyCurrentFill();
 this.fillStyle = this.getColour(r, g, b, a);
 this.fillRect(0, 0, w, h);
 this.fillStyle = c;

};

p.getMyCurrentFill = function() {
  //console.log(ctx.fillStyle);
  var r = parseInt(ctx.fillStyle.substring(1,3), 16);
  var g = parseInt(ctx.fillStyle.substring(3,5), 16);
  var b = parseInt(ctx.fillStyle.substring(5), 16);
  return rgb(r,g,b);
}




function radians(deg) {return deg*Math.PI/180;};

function degrees(rad) {return (rad*180/Math.PI)%360;};

function degreesToPoint(deg, diameter) {
    var rad = Math.PI * deg / 180;
    var r = diameter / 2;
    return {x: r * Math.cos(rad), y: r * Math.sin(rad)};
}

p.rotateDegrees = function(deg){
  this.rotate(radians(deg));
}

p.rotateDeg = function(deg){
  this.rotate(radians(deg));
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
 return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';

};

function rgba(r, g, b, a) {
  if (g == undefined) {
   return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(r),0,255)+', '+clamp(Math.round(r),0,255)+')';
 } else if (b == undefined) {
    return 'rgba('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(r),0,255)+', '+clamp(Math.round(r),0,255)+', '+clamp(g,0,1)+')';
  } else if (a == undefined){
  return 'rgba('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+', 1)';
} else {
return 'rgba('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+', '+clamp(a,0,1)+')';
 }
};

function hsl(h, s, l) {
  return 'hsl('+h+', '+clamp(s,0,100)+'%, '+clamp(l,0,100)+'%)';
};

function hsla(h, s, l, a) { return 'hsla('+h+', '+clamp(s,0,100)+'%, '+clamp(l,0,100)+'%, '+clamp(a,0,1)+')';};

function brightness(r, g, b, _scale){
      var scale = _scale || 100;
      return Math.floor(rgbToHsl(r, g, b)[2]*scale);
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

function hexToRgb(hex) {
    // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
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


function randomInt(min, max) {
  if(max===undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max+1-min)) +min;
}

function randomWhole(min, max) {
  return posNeg() * random(min, max);
}

function randomWholeInt(min, max) {
  return posNeg() * randomInt(min, max);
}


function map(value, min1, max1, min2, max2, clampResult) {
 var returnvalue = ((value-min1) / (max1 - min1) * (max2-min2)) + min2;
 if(clampResult) {
  return clamp(returnvalue, min2, max2);
 } else { return returnvalue; };
};

function log(val){
 console.log(val);
}


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



function tween(pos, target, speed){
 if (speed == undefined) speed = 20;
 pos += (target - pos)/speed;
 return pos;
}

function chance(value){
 if (random(value) > value-1) return true;
}

function posNeg(){
 return randomInt(0,1) * 2 - 1;
}

function sticky(num, clamper){
  return Math.round(num/clamper)*clamper;
}

function ave(num, clamper){
  return Math.round(num/clamper)*clamper;
}

function randomGrey(){
  return rgb(sticky(randomInt(240),10));
}


function greyscale(data){
  for(var y = 0; y < data.height; y++){
        for(var x = 0; x < data.width; x++){
            var i = (y * 4) * data.width + x * 4;
            var avg = (data.data[i] + data.data[i + 1] + data.data[i + 2]) / 3;
            data.data[i] = avg;
            data.data[i + 1] = avg;
            data.data[i + 2] = avg;
        }
    }
    return data;
}

function getAngle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360);
  if (theta == 360) theta = 0;
  return theta;
}

function distributeAngles(me, total) {
    return me/total * 360;
}


function bounce(num, min, max, sz) {
  if (sz === undefined) {
    sz = 0;
  }
  if (num >= max - sz/2 || num - sz/2 <= min ) {
    return 1;
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
	return false;
 }

var denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
var numeA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3));
var numeB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3));

if( denom === 0 || (numeA === 0 && numeB === 0) ) {
 return false;
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


function selfHit(p){

  	for (var i = 0; i < balls.length; i++) {
  		if (i != p.me) {

  			p2 = balls[i];

  			if (hittestBall(p, p2)) {
  				p.speedx *= -1;
  				p.speedy *= -1;
  				p2.speedx *= -1;
  				p2.speedy *= -1;
  			}
  		}

  		}
      return p;
}

function hittestBall(p, p2){

      if(p.x > p2.x - p2.sz  && p.x <  p2.x + p2.sz  && p.y > p2.y - p2.sz  && p.y < p2.y + p2.sz) {
        return true;
      }
}


function lineCircleCollide(a, b, circle, radius, nearest) {
  //check to see if start or end points lie within circle
    var tmp = {x:0, y:0}

    if (pointCircleCollide(a, circle, radius)) {
        if (nearest) {
            nearest.x = a.x
            nearest.y = a.y
        }
        return true
    } if (pointCircleCollide(b, circle, radius)) {
        if (nearest) {
            nearest.x = b.x
            nearest.y = b.y
        }
        return true
    }

    var x1 = a.x,
        y1 = a.y,
        x2 = b.x,
        y2 = b.y,
        cx = circle.x,
        cy = circle.y

    //vector d
    var dx = x2 - x1
    var dy = y2 - y1
    //vector lc
    var lcx = cx - x1
    var lcy = cy - y1


    //project lc onto d, resulting in vector p
    var dLen2 = dx * dx + dy * dy //len2 of d
    var px = dx
    var py = dy
    if (dLen2 > 0) {
        var dp = (lcx * dx + lcy * dy) / dLen2
        px *= dp
        py *= dp
    }

    if (!nearest)
        nearest = tmp
    nearest.x = x1 + px
    nearest.y = y1 + py

    //len2 of p
    var pLen2 = px * px + py * py

    //check collision
    return pointCircleCollide(nearest, circle, radius)
            && pLen2 <= dLen2 && (px * dx + py * dy) >= 0
}

function pointCircleCollide(point, circle, r) {
    if (r===0) return false
    var dx = circle.x - point.x
    var dy = circle.y - point.y
    return dx * dx + dy * dy <= r * r
}


function cross(_x, _y, _w, _h){
 if (_w === undefined) _w =20;
 if (_h === undefined) _h =60;
 ctx.fillRect( _x - _w/2, _y - _h/2,  _w, _h);
 ctx.fillRect( _x - _h/2, _y - _w/2,  _h, _w);
}

function makeGrid(_w, _h){
 var grid = [];
 var k = 0;
 for (var y = 0; y < _h; y++) {
  for (var x = 0; x < _w; x++) {
  grid[k] = [x, y];
  k++;
  }
};
 return grid;
}


function colourPool(){

  this.colours = [];
  this.probs = [];
  this.colour_list = [];

  this.add = function(_colour, _prob){
    if (_prob == undefined)_prob = 1;
    this.colours.push(_colour);
    this.probs.push(_prob);
    this.colour_list  = this.generateWeighedList(this.colours, this.probs);
    return this;
  }

  this.get = function(){
    return this.colour_list[randomInt(this.colour_list.length-1)];
  }

  this.generateWeighedList = function(list, weight) {
    var weighed_list = [];

    // Loop over weights
    for (var i = 0; i < weight.length; i++) {

        var multiples = weight[i] * 100;

        // Loop over the list of items
        for (var j = 0; j < multiples; j++) {
            weighed_list.push(list[i]);
        }
    }

    return weighed_list;
};

  return this;
}

var Vector = function(_x, _y, _z){
  this.x = _x || 0;
  this.y = _y || 0;
  this.z = _z || 0;

  this.add = function(_vector){
    this.x += _vector.x || 0;
    this.y += _vector.y || 0;
    this.z += _vector.z || 0;
    return this;
  }

  this.subtract = function(_vector){
    this.x -= _vector.x || 0;
    this.y -= _vector.y || 0;
    this.z -= _vector.z || 0;
    return this;
  }

  this.subtr = function(_vector2){
    var v = new Vector();
    v.x = this.x - _vector2.x || 0;
    v.y = this.y - _vector2.y || 0;
    v.z = this.z - _vector2.z || 0;
    return v;
  }

  this.multiply = function(_vector){
    this.x *= _vector.x || 0;
    this.y *= _vector.y || 0;
    this.z *= _vector.z || 0;
    return this;
  }

  this.divide = function(_vector){
    this.x /= _vector.x || 1;
    this.y /= _vector.y || 1;
    this.z /= _vector.z || 1;
    return this;
  }

  this.angle = function(x1, x2){
    return degrees(Math.atan2(this.x - x1, this.y - y2)) || degrees(Math.atan2(this.y/this.y));
  }

  this.velocity = function(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  // return the angle of the vector in radians
  this.getDirection = function() {
  	return Math.atan2(this.y, this.x);
  };

  // set the direction of the vector in radians
  this.setDirection = function(direction) {
  	var magnitude = this.getMagnitude();
    this.x = Math.cos(angle) * magnitude;
    this.y = Math.sin(angle) * magnitude;
  };

  // get the magnitude of the vector
  this.getMagnitude = function() {
  	// use pythagoras theorem to work out the magnitude of the vector
    //console.log("y: "+ this.y * this.y);
  	return Math.sqrt((this.x * this.x) + (this.y * this.y));
  };

  // set the magnitude of the vector
  this.setMagnitude = function(magnitude) {
  	var direction = this.getDirection();
  	this.x = Math.cos(direction) * magnitude;
  	this.y = Math.sin(direction) * magnitude;
  };

  return this;

}



function createGrid(_gw, _gh, _w, _h){

  if (_w === undefined) _w = w;
  if (_h === undefined) _h = h;

  var spacing_x = _w/_gw;
  var spacing_y = _h/_gh;
  var grid = [];
  var k = 0;

  for (var y = 0; y < _gh; y++) {

    for (var x = 0; x < _gw; x++) {

      grid[k] = {
        0: x*spacing_x+ spacing_x/2, 1: y*spacing_y+ spacing_y/2,
        x: x*spacing_x+ spacing_x/2, y: y*spacing_y+ spacing_y/2
      };
      k++;
    }
  };

  return grid;

}


function Grid(_num_items_horiz, _num_items_vert, _grid_w, _grid_h, _startx, _starty){

  if (_num_items_horiz == undefined) _num_items_horiz = 1;
  if (_num_items_vert == undefined) _num_items_vert = 1;
  var _horiz = _num_items_horiz || 1;
  var _vert = _num_items_vert || 1;

  this.spacing_x;
  this.spacing_y;

  this.num_items_horiz = 0;
  this.num_items_vert = 0;

  this.start = {x: _startx || 0 , y: _starty || 0};

  this.grid_w = _grid_w || window.innerWidth;
  this.grid_h = _grid_h || window.innerHeight;

  this.x = [];
  this.y = [];

  this.add = function(_horiz, _vert) {

    this.num_items_horiz += _horiz || 1;
    this.num_items_vert += _vert || 1;

    this.spacing_x = this.grid_w / this.num_items_horiz;
    this.spacing_y = this.grid_h / this.num_items_vert;

    this.createGrid();

    return this;

  }


  this.setStart = function(_x, _y) {

     this.start = {x: _x || 0 , y: _y || 0};
     createGrid();

  }

  this.createGrid = function() {

    for (var _y = 0; _y < this.grid_h; _y+=this.spacing_y) {

      for (var _x = 0; _x < this.grid_w; _x+=this.spacing_x) {

        this.x.push(this.start.x + this.spacing_x/2 + _x);
        this.y.push(this.start.y + this.spacing_y/2 + _y);

      }
    };

  }

  this.add(_horiz, _vert);

  return this;

}


////// EFFECTS

p.pixelate = function (blocksize) {

  if (blocksize == undefined) blocksize = 20;
  var imgData=this.getImageData(0,0,w,h);

  this.clearRect(0,0,w,h);

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
          ctx.fillRect(x, y, blocksize, blocksize);

        }
    }

}


function pixelate(blocksize,blockshape, _ctx) {
  if (_ctx == undefined) _ctx = ctx;
  if (blockshape == undefined) blockshape = 0;
  if (blocksize == undefined) blocksize = 20;
  var imgData=ctx.getImageData(0,0,w,h);

  ctx.clearRect(0,0,w,h);
  //console.log(blockshape)
  if (blockshape == 3) {
    ctx.background(0);
  }

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
           } else if (blockshape == 3) {
            ctx.fillStyle = rgb(r,g,b);
            ctx.fillEllipse(x, y, blocksize-3, blocksize-3);
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
          };

        }
    }

}

p.posterize = function(blocksize, ammt) {
 if (ammt == undefined) ammt = 0;

 if (blocksize == undefined) blocksize = 20;

 ammt = Math.floor(ammt);
 blocksize = Math.floor(blocksize);

 var imgData=this.getImageData(0,0,w,h);

 this.clearRect(0,0,w,h);

 var sourceBuffer32 = new Uint32Array(imgData.data.buffer);

 for (var x = 0; x < w; x += blocksize) {

   for (var y = 0; y < h; y += blocksize) {

         var pos = (x + y * w);
         var b = (sourceBuffer32[pos] >> 16) & 0xff;
         var g = (sourceBuffer32[pos] >> 8) & 0xff;
         var r = (sourceBuffer32[pos] >> 0) & 0xff;
         r = sticky(r, ammt);
         g = sticky(g, ammt);
         b = sticky(b, ammt);
         this.fillStyle = rgb(r,g,b);
         this.fillRect(x, y, blocksize, blocksize);

       }
   }

}

 p.theshhold = function(blocksize, ammt ,flip) {
  if (ammt == undefined) ammt = 0;

  if (blocksize == undefined) blocksize = 20;
  if (flip == undefined) flip = false;

  ammt = Math.floor(ammt);
  blocksize = Math.floor(blocksize);

  var imgData=this.getImageData(0,0,w,h);

  this.clearRect(0,0,w,h);

  var sourceBuffer32 = new Uint32Array(imgData.data.buffer);

  for (var x = 0; x < w; x += blocksize) {

    for (var y = 0; y < h; y += blocksize) {

          var pos = (x + y * w);
          var b = (sourceBuffer32[pos] >> 16) & 0xff;
          var g = (sourceBuffer32[pos] >> 8) & 0xff;
          var r = (sourceBuffer32[pos] >> 0) & 0xff;
          // r = sticky(r, ammt);
          // g = sticky(g, ammt);
          // b = sticky(b, ammt);

          if(brightness(r,g,b) < ammt) {
          this.fillStyle = rgb(0);
          this.fillRect(w-x, y, blocksize, blocksize);
          }

        }
    }

}


function pixelShuffle(blockwidth, blockheight, freq, x1, y1, x2, y2) {

  if (x1 == undefined) {
    x1 = 0; y1 = 0; x2 = w; y2 = h;
  }
	if (freq == undefined) freq = 20;
	if (blockwidth == undefined) blockwidth = 20;
	if (blockheight == undefined) blockheight = blockwidth;
    var imgData=ctx.getImageData(x1,y1,x2,y2);
    //var sourceBuffer8 = new Uint8Array(imgData.data.buffer);
    //var sourceBuffer8 = new Uint8ClampedArray(imgData.data.buffer);
    //shuffle(sourceBuffer8, 1);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);

    for(var x = x1; x < x2; x += blockwidth) {

        for(var y = y1; y < y2; y += blockheight) {

          var pos = (x + y * x2);
          if (chance(freq)) {
            pos = (pos + randomInt(-100,100)*4) % (x2*y2*4);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;
            ctx.fillStyle = rgba(r,g,b, 0.9);
          ctx.fillRect(x, y, blockwidth, blockheight);
          }
        };

    }

}




function shuffle(a, ammt) {
 if (ammt = undefined) ammt = a.length;
    var j, x, i;
    for (i = ammt; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
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


// MIRROR THE CANVAS

function mirror(){

  var input = ctx.getImageData(0, 0, w, h);
  var output = ctx.createImageData(w, h);
  var inputData = input.data;
  var outputData = output.data
   // loop
   for (var y = 1; y < h-1; y += 1) {
       for (var x = 0; x < w/2; x += 1) {
         // RGB
         var i = (y*w + x)*4;
         var flip = (y*w + (w/2 - x))*4;
         for (var c = 0; c < 4; c += 1) {
            outputData[i+c] = inputData[flip+c];
         }
       }
   }
   ctx.putImageData(output, w/2, 0);

}


function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}


function ScaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {

    var result = { width: 0, height: 0, fScaleToTargetWidth: true };

    if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
        return result;
    }

    // scale to the target width
    var scaleX1 = targetwidth;
    var scaleY1 = (srcheight * targetwidth) / srcwidth;

    // scale to the target height
    var scaleX2 = (srcwidth * targetheight) / srcheight;
    var scaleY2 = targetheight;

    // now figure out which one we should use
    var fScaleOnWidth = (scaleX2 > targetwidth);
    if (fScaleOnWidth) {
        fScaleOnWidth = fLetterBox;
    }
    else {
       fScaleOnWidth = !fLetterBox;
    }

    if (fScaleOnWidth) {
        result.width = Math.floor(scaleX1);
        result.height = Math.floor(scaleY1);
        result.fScaleToTargetWidth = true;
    }
    else {
        result.width = Math.floor(scaleX2);
        result.height = Math.floor(scaleY2);
        result.fScaleToTargetWidth = false;
    }
    result.targetleft = Math.floor((targetwidth - result.width) / 2);
    result.targettop = Math.floor((targetheight - result.height) / 2);

    return result;
}



var mousePressed = 0;
var mouseReleased = 0;
document.onmousedown = function() {
  mousePressed = 1;
  //window.mousePressed();
}
document.onmouseup = function() {
  mousePressed = 0;
  mouseReleased = 1;
  //window.mouseup();
}

var mouseSpeedX = 0,
mouseSpeedX = 0,
mouseX = 0,
mouseY = 0,
lastMouseX = 0,
lastMouseY = 0,
oldMouseX = 0,
oldMouseY = 0,
frameRate = 60,
frameCount = 0,
frameNumber = 0,
lastUpdate = Date.now(),
mouseDown = false,
mouseMoved = false;

function loop() {

 var now = Date.now();
 var elapsedMils = now - lastUpdate;

 if((typeof window.draw == 'function') && (elapsedMils>=(1000/window.frameRate))) {
 window.draw();
 frameCount++;
 frameNumber++;
 lastUpdate = now - elapsedMils % (1000/window.frameRate );
 mouseReleased = 0;
 mouseMoved = 0;
 }
 requestAnimationFrame(loop);

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
  oldMouseX = mouseX;
  oldMouseY = mouseY;
  mouseX = e.clientX;
  mouseY = e.clientY;
  mouseSpeedX = mouseX - oldMouseX;
  mouseSpeedY = mouseX - oldMouseX;
  lastMouseX = oldMouseX = mouseX;
  lastMouseY = oldMouseY = mouseY;
  mouseMoved = true;
});

window.addEventListener('mousedown', function(e){mouseDown =true; if(typeof onMouseDown == 'function') onMouseDown() ;});
window.addEventListener('mouseup', function(e){mouseDown = false;if(typeof onMouseUp == 'function') onMouseUp()  ;});
window.addEventListener('keydown', function(e){if(typeof onKeyDown == 'function') onKeyDown(e);});
window.addEventListener('keyup', function(e){if(typeof onKeyUp == 'function') onKeyUp(e);});
if(typeof window.setup == 'function') window.setup();
loop();
}

window.addEventListener('load',init);
