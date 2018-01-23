var Vector = function(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;

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
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

// set the magnitude of the vector
this.setMagnitude = function(magnitude) {
	var direction = this.getDirection();
	this.x = Math.cos(direction) * magnitude;
	this.y = Math.sin(direction) * magnitude;
};

// add two vectors together and return a new one
this.add = function(v2) {
	return new Vector(this.x + v2.x, this.y + v2.y, this.y + v2.y);
};

// add a vector to this one
this.addTo = function(v2) {
	this.x += v2.x;
  this.y += v2.y;
  this.z += v2.z;
};

// subtract two vectors and reutn a new one
this.subtract = function(v2) {
	return new Vector(this.x - v2.x, this.y - v2.y, this.y - v2.y);
};

// subtract a vector from this one
this.subtractFrom = function(v2) {
	this.x -= v2.x;
  this.y -= v2.y;
  this.z -= v2.z;
};

// multiply this vector by a scalar and return a new one
this.multiply = function(scalar) {
  return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
};

// multiply this vector by the scalar
this.multiplyBy = function(scalar) {
  this.x *= scalar;
  this.y *= scalar;
  this.z *= scalar;
};

// scale this vector by scalar and return a new vector
this.divide = function(scalar) {
  return new Vector(this.x / scalar, this.y / scalar, this.z / scalar);
};

// scale this vector by scalar
this.divideBy = function(scalar) {
  this.x /= scalar;
  this.y /= scalar;
  this.z /= scalar;
};

this.limit = function(max) {
  this.x = Math.min(this.x, max);
  this.y = Math.min(this.y, max);
  this.z = Math.min(this.z, max);
};

this.normalize = function() {
  var m = this.getMagnitude();
  if (m > 0) {
    this.divideBy(m);
  }
}

// this.normalize = function(a) {
//     var magnitude = this.getMagnitude();
//     var iLen = 1 / magnitude;
//     this.multiplyBy(1 / magnitude);
//     // this.x = multiplyBy
//     // return new Float32Array([a[0] * iLen, a[1] * iLen]);
// }


// Aliases
this.getLength = this.getMagnitude;
this.setLength = this.setMagnitude;

this.getAngle = this.getDirection;
this.setAngle = this.setDirection;

this.mult = this.multiplyBy;

// Utilities
this.copy = function() {
  return new Vector(this.x, this.y, this.z);
};

this.toString = function() {
  return 'x: ' + this.x + ', y: ' + this.y + ', z: ' + this.z;
};

this.toArray = function() {
  return [this.x, this.y, this.z];
};

this.toObject = function() {
  return {x: this.x, y: this.y, z: this.z};
};

return this;

};
// To add
// Scale
// Dot?
