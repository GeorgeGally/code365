Vector = function() {
  var x, y, z;
  // This is how it comes in with createVector()
  // if (arguments[0] instanceof p5) {
  //   // save reference to p5 if passed in
  //   this.p5 = arguments[0];
  //   x = arguments[1][0] || 0;
  //   y = arguments[1][1] || 0;
  //   z = arguments[1][2] || 0;
  //   // This is what we'll get with new Vector()
  // } else {
    x = arguments[0] || 0;
    y = arguments[1] || 0;
    z = arguments[2] || 0;
  //}
  /**
   * The x component of the vector
   * @property x {Number}
   */
  this.x = x;
  /**
   * The y component of the vector
   * @property y {Number}
   */
  this.y = y;
  /**
   * The z component of the vector
   * @property z {Number}
   */
  this.z = z;
};


/**
 * Returns a string representation of a vector v by calling String(v)
 * or v.toString(). This method is useful for logging vectors in the
 * console.
*/

Vector.prototype.toString = function p5VectorToString() {
  return 'Vector Object : [' + this.x + ', ' + this.y + ', ' + this.z + ']';
};


/**
 * Sets the x, y, and z component of the vector
*/

Vector.prototype.set = function set(x, y, z) {
  if (x instanceof Vector) {
    this.x = x.x || 0;
    this.y = x.y || 0;
    this.z = x.z || 0;
    return this;
  }
  if (x instanceof Array) {
    this.x = x[0] || 0;
    this.y = x[1] || 0;
    this.z = x[2] || 0;
    return this;
  }
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  return this;
};


/**
 * Gets a copy of the vector, returns a Vector object.
 *
 */

 Vector.prototype.copy = function copy() {
   if (this.p5) {
     return new Vector(this.p5, [this.x, this.y, this.z]);
   } else {
     return new Vector(this.x, this.y, this.z);
   }
 };


 /**
  * Adds x, y, and z components to a vector, adds one vector to another, or
  * adds two independent vectors together. The version of the method that adds
  * two vectors together is a static method and returns a Vector, the others
  * acts directly on the vector.
 */

 Vector.prototype.add = function add(x, y, z) {
   if (x instanceof Vector) {
     this.x += x.x || 0;
     this.y += x.y || 0;
     this.z += x.z || 0;
     return this;
   }
   if (x instanceof Array) {
     this.x += x[0] || 0;
     this.y += x[1] || 0;
     this.z += x[2] || 0;
     return this;
   }
   this.x += x || 0;
   this.y += y || 0;
   this.z += z || 0;
   return this;
 };


 /**
  * Subtracts x, y, and z components from a vector, subtracts one vector from
  * another, or subtracts two independent vectors. The version of the method
  * that subtracts two vectors is a static method and returns a Vector, the
  * other acts directly on the vector.
 */

  Vector.prototype.sub = function sub(x, y, z) {
    if (x instanceof Vector) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      this.z -= x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      this.z -= x[2] || 0;
      return this;
    }
    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    return this;
  };

  /**
   * Multiply the vector by a scalar. The static version of this method
   * creates a new Vector while the non static version acts on the vector
   * directly. See the examples for more context.
   *
   * @method mult
   * @param  {Number}    n the number to multiply with the vector
   * @chainable
   * @example
   * <div class="norender">
   * <code>
   * var v = createVector(1, 2, 3);
   * v.mult(2);
   * // v's components are set to [2, 4, 6]
   * </code>
   * </div>
   *
   * <div class="norender">
   * <code>
   * // Static method
   * var v1 = createVector(1, 2, 3);
   * var v2 = Vector.mult(v1, 2);
   * // v2 has components [2, 4, 6]
   * print(v2);
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * function draw() {
   *   background(240);
   *
   *   var v0 = createVector(50, 50);
   *   var v1 = createVector(25, -25);
   *   drawArrow(v0, v1, 'red');
   *
   *   var num = map(mouseX, 0, width, -2, 2, true);
   *   var v2 = Vector.mult(v1, num);
   *   drawArrow(v0, v2, 'blue');
   *
   *   noStroke();
   *   text('multiplied by ' + num.toFixed(2), 5, 90);
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */
  Vector.prototype.mult = function mult(n) {
    if (!(typeof n === 'number' && isFinite(n))) {
      console.warn(
        'Vector.prototype.mult:',
        'n is undefined or not a finite number'
      );
      return this;
    }
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  };

  /**
   * Divide the vector by a scalar. The static version of this method creates a
   * new Vector while the non static version acts on the vector directly.
   * See the examples for more context.
   *
   * @method div
   * @param  {number}    n the number to divide the vector by
   * @chainable
   * @example
   * <div class="norender">
   * <code>
   * var v = createVector(6, 4, 2);
   * v.div(2); //v's components are set to [3, 2, 1]
   * </code>
   * </div>
   *
   * <div class="norender">
   * <code>
   * // Static method
   * var v1 = createVector(6, 4, 2);
   * var v2 = Vector.div(v1, 2);
   * // v2 has components [3, 2, 1]
   * print(v2);
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * function draw() {
   *   background(240);
   *
   *   var v0 = createVector(0, 100);
   *   var v1 = createVector(50, -50);
   *   drawArrow(v0, v1, 'red');
   *
   *   var num = map(mouseX, 0, width, 10, 0.5, true);
   *   var v2 = Vector.div(v1, num);
   *   drawArrow(v0, v2, 'blue');
   *
   *   noStroke();
   *   text('divided by ' + num.toFixed(2), 10, 90);
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */
  Vector.prototype.div = function div(n) {
    if (!(typeof n === 'number' && isFinite(n))) {
      console.warn(
        'Vector.prototype.div:',
        'n is undefined or not a finite number'
      );
      return this;
    }
    if (n === 0) {
      console.warn('Vector.prototype.div:', 'divide by 0');
      return this;
    }
    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  };

  /**
   * Calculates the magnitude (length) of the vector and returns the result as
   * a float (this is simply the equation sqrt(x*x + y*y + z*z).)
   *
   * @method mag
   * @return {Number} magnitude of the vector
   * @example
   * <div>
   * <code>
   * function draw() {
   *   background(240);
   *
   *   var v0 = createVector(0, 0);
   *   var v1 = createVector(mouseX, mouseY);
   *   drawArrow(v0, v1, 'black');
   *
   *   noStroke();
   *   text('vector length: ' + v1.mag().toFixed(2), 10, 70, 90, 30);
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   * <div class="norender">
   * <code>
   * var v = createVector(20.0, 30.0, 40.0);
   * var m = v.mag();
   * print(m); // Prints "53.85164807134504"
   * </code>
   * </div>
   */
  Vector.prototype.mag = function mag() {
    return Math.sqrt(this.magSq());
  };

  /**
   * Calculates the squared magnitude of the vector and returns the result
   * as a float (this is simply the equation <em>(x*x + y*y + z*z)</em>.)
   * Faster if the real length is not required in the
   * case of comparing vectors, etc.
   *
   * @method magSq
   * @return {number} squared magnitude of the vector
   * @example
   * <div class="norender">
   * <code>
   * // Static method
   * var v1 = createVector(6, 4, 2);
   * print(v1.magSq()); // Prints "56"
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * function draw() {
   *   background(240);
   *
   *   var v0 = createVector(0, 0);
   *   var v1 = createVector(mouseX, mouseY);
   *   drawArrow(v0, v1, 'black');
   *
   *   noStroke();
   *   text('vector length squared: ' + v1.magSq().toFixed(2), 10, 45, 90, 55);
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */
  Vector.prototype.magSq = function magSq() {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    return x * x + y * y + z * z;
  };

  /**
   * Calculates the dot product of two vectors. The version of the method
   * that computes the dot product of two independent vectors is a static
   * method. See the examples for more context.
   *
   *
   * @method dot
   * @param  {Number} x   x component of the vector
   * @param  {Number} [y] y component of the vector
   * @param  {Number} [z] z component of the vector
   * @return {Number}       the dot product
   *
   * @example
   * <div class="norender">
   * <code>
   * var v1 = createVector(1, 2, 3);
   * var v2 = createVector(2, 3, 4);
   *
   * print(v1.dot(v2)); // Prints "20"
   * </code>
   * </div>
   *
   * <div class="norender">
   * <code>
   * //Static method
   * var v1 = createVector(1, 2, 3);
   * var v2 = createVector(3, 2, 1);
   * print(Vector.dot(v1, v2)); // Prints "10"
   * </code>
   * </div>
   */
  /**
   * @method dot
   * @param  {Vector} value value component of the vector or a Vector
   * @return {Number}
   */
  Vector.prototype.dot = function dot(x, y, z) {
    if (x instanceof Vector) {
      return this.dot(x.x, x.y, x.z);
    }
    return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
  };

  /**
   * Calculates and returns a vector composed of the cross product between
   * two vectors. Both the static and non static methods return a new Vector.
   * See the examples for more context.
   *
   * @method cross
   * @param  {Vector} v Vector to be crossed
   * @return {Vector}   Vector composed of cross product
   * @example
   * <div class="norender">
   * <code>
   * var v1 = createVector(1, 2, 3);
   * var v2 = createVector(1, 2, 3);
   *
   * v1.cross(v2); // v's components are [0, 0, 0]
   * </code>
   * </div>
   *
   * <div class="norender">
   * <code>
   * // Static method
   * var v1 = createVector(1, 0, 0);
   * var v2 = createVector(0, 1, 0);
   *
   * var crossProduct = Vector.cross(v1, v2);
   * // crossProduct has components [0, 0, 1]
   * print(crossProduct);
   * </code>
   * </div>
   */
  Vector.prototype.cross = function cross(v) {
    var x = this.y * v.z - this.z * v.y;
    var y = this.z * v.x - this.x * v.z;
    var z = this.x * v.y - this.y * v.x;
    if (this.p5) {
      return new Vector(this.p5, [x, y, z]);
    } else {
      return new Vector(x, y, z);
    }
  };

  /**
   * Calculates the Euclidean distance between two points (considering a
   * point as a vector object).
   *
   * @method dist
   * @param  {Vector} v the x, y, and z coordinates of a Vector
   * @return {Number}      the distance
   * @example
   * <div class="norender">
   * <code>
   * var v1 = createVector(1, 0, 0);
   * var v2 = createVector(0, 1, 0);
   *
   * var distance = v1.dist(v2); // distance is 1.4142...
   * print(distance);
   * </code>
   * </div>
   *
   * <div class="norender">
   * <code>
   * // Static method
   * var v1 = createVector(1, 0, 0);
   * var v2 = createVector(0, 1, 0);
   *
   * var distance = Vector.dist(v1, v2);
   * // distance is 1.4142...
   * print(distance);
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * function draw() {
   *   background(240);
   *
   *   var v0 = createVector(0, 0);
   *
   *   var v1 = createVector(70, 50);
   *   drawArrow(v0, v1, 'red');
   *
   *   var v2 = createVector(mouseX, mouseY);
   *   drawArrow(v0, v2, 'blue');
   *
   *   noStroke();
   *   text('distance between vectors: ' + v2.dist(v1).toFixed(2), 5, 50, 95, 50);
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */
  Vector.prototype.dist = function dist(v) {
    return v
      .copy()
      .sub(this)
      .mag();
  };

  /**
   * Normalize the vector to length 1 (make it a unit vector).
   *
   * @method normalize
   * @return {Vector} normalized Vector
   * @example
   * <div class="norender">
   * <code>
   * var v = createVector(10, 20, 2);
   * // v has components [10.0, 20.0, 2.0]
   * v.normalize();
   * // v's components are set to
   * // [0.4454354, 0.8908708, 0.089087084]
   * </code>
   * </div>
   * <div>
   * <code>
   * function draw() {
   *   background(240);
   *
   *   var v0 = createVector(50, 50);
   *   var v1 = createVector(mouseX - 50, mouseY - 50);
   *
   *   drawArrow(v0, v1, 'red');
   *   v1.normalize();
   *   drawArrow(v0, v1.mult(35), 'blue');
   *
   *   noFill();
   *   ellipse(50, 50, 35 * 2);
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */
  Vector.prototype.normalize = function normalize() {
    var len = this.mag();
    // here we multiply by the reciprocal instead of calling 'div()'
    // since div duplicates this zero check.
    if (len !== 0) this.mult(1 / len);
    return this;
  };

  /**
   * Limit the magnitude of this vector to the value used for the <b>max</b>
   * parameter.
   *
   * @method limit
   * @param  {Number}    max the maximum magnitude for the vector
   * @chainable
   * @example
   * <div class="norender">
   * <code>
   * var v = createVector(10, 20, 2);
   * // v has components [10.0, 20.0, 2.0]
   * v.limit(5);
   * // v's components are set to
   * // [2.2271771, 4.4543543, 0.4454354]
   * </code>
   * </div>
   * <div>
   * <code>
   * function draw() {
   *   background(240);
   *
   *   var v0 = createVector(50, 50);
   *   var v1 = createVector(mouseX - 50, mouseY - 50);
   *
   *   drawArrow(v0, v1, 'red');
   *   drawArrow(v0, v1.limit(35), 'blue');
   *
   *   noFill();
   *   ellipse(50, 50, 35 * 2);
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */
  Vector.prototype.limit = function limit(max) {
    var mSq = this.magSq();
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)) //normalize it
        .mult(max);
    }
    return this;
  };

  /**
   * Set the magnitude of this vector to the value used for the <b>len</b>
   * parameter.
   *
   * @method setMag
   * @param  {number}    len the new length for this vector
   * @chainable
   * @example
   * <div class="norender">
   * <code>
   * var v = createVector(10, 20, 2);
   * // v has components [10.0, 20.0, 2.0]
   * v.setMag(10);
   * // v's components are set to [6.0, 8.0, 0.0]
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * function draw() {
   *   background(240);
   *
   *   var v0 = createVector(0, 0);
   *   var v1 = createVector(50, 50);
   *
   *   drawArrow(v0, v1, 'red');
   *
   *   var length = map(mouseX, 0, width, 0, 141, true);
   *   v1.setMag(length);
   *   drawArrow(v0, v1, 'blue');
   *
   *   noStroke();
   *   text('magnitude set to: ' + length.toFixed(2), 10, 70, 90, 30);
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */
  Vector.prototype.setMag = function setMag(n) {
    return this.normalize().mult(n);
  };

  /**
   * Calculate the angle of rotation for this vector (only 2D vectors)
   *
   * @method heading
   * @return {Number} the angle of rotation
   * @example
   * <div class = "norender">
   * <code>
   * function setup() {
   *   var v1 = createVector(30, 50);
   *   print(v1.heading()); // 1.0303768265243125
   *
   *   v1 = createVector(40, 50);
   *   print(v1.heading()); // 0.8960553845713439
   *
   *   v1 = createVector(30, 70);
   *   print(v1.heading()); // 1.1659045405098132
   * }
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * function draw() {
   *   background(240);
   *
   *   var v0 = createVector(50, 50);
   *   var v1 = createVector(mouseX - 50, mouseY - 50);
   *
   *   drawArrow(v0, v1, 'black');
   *
   *   var myHeading = v1.heading();
   *   noStroke();
   *   text(
   *     'vector heading: ' +
   *       myHeading.toFixed(2) +
   *       ' radians or ' +
   *       degrees(myHeading).toFixed(2) +
   *       ' degrees',
   *     10,
   *     50,
   *     90,
   *     50
   *   );
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */

  Vector.prototype.heading = function heading() {
    var h = Math.atan2(this.y, this.x);
    //return radians(h);
    return h;
  };

  /**
   * Rotate the vector by an angle (only 2D vectors), magnitude remains the
   * same
   *
   * @method rotate
   * @param  {number}    angle the angle of rotation
   * @chainable
   * @example
   * <div class="norender">
   * <code>
   * var v = createVector(10.0, 20.0);
   * // v has components [10.0, 20.0, 0.0]
   * v.rotate(HALF_PI);
   * // v's components are set to [-20.0, 9.999999, 0.0]
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * var angle = 0;
   * function draw() {
   *   background(240);
   *
   *   var v0 = createVector(50, 50);
   *   var v1 = createVector(50, 0);
   *
   *   drawArrow(v0, v1.rotate(angle), 'black');
   *   angle += 0.01;
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */
  Vector.prototype.rotate = function rotate(a) {
    var newHeading = this.heading() + a;
    if (this.p5) newHeading = this._toRadians(newHeading);
    var mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  };

  /**
   * Calculates and returns the angle (in radians) between two vectors.
   * @method angleBetween
   * @param  {Vector}    the x, y, and z components of a Vector
   * @return {Number}       the angle between (in radians)
   * @example
   * <div class="norender">
   * <code>
   * var v1 = createVector(1, 0, 0);
   * var v2 = createVector(0, 1, 0);
   *
   * var angle = v1.angleBetween(v2);
   * // angle is PI/2
   * print(angle);
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * function draw() {
   *   background(240);
   *   var v0 = createVector(50, 50);
   *
   *   var v1 = createVector(50, 0);
   *   drawArrow(v0, v1, 'red');
   *
   *   var v2 = createVector(mouseX - 50, mouseY - 50);
   *   drawArrow(v0, v2, 'blue');
   *
   *   var angleBetween = v1.angleBetween(v2);
   *   noStroke();
   *   text(
   *     'angle between: ' +
   *       angleBetween.toFixed(2) +
   *       ' radians or ' +
   *       degrees(angleBetween).toFixed(2) +
   *       ' degrees',
   *     10,
   *     50,
   *     90,
   *     50
   *   );
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */
  Vector.prototype.angleBetween = function angleBetween(v) {
    var dotmagmag = this.dot(v) / (this.mag() * v.mag());
    // Mathematically speaking: the dotmagmag variable will be between -1 and 1
    // inclusive. Practically though it could be slightly outside this range due
    // to floating-point rounding issues. This can make Math.acos return NaN.
    //
    // Solution: we'll clamp the value to the -1,1 range
    var angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
    if (this.p5) return this._fromRadians(angle);
    return angle;
  };

  /**
   * Linear interpolate the vector to another vector
   *
   * @method lerp
   * @param  {Number}    x   the x component
   * @param  {Number}    y   the y component
   * @param  {Number}    z   the z component
   * @param  {Number}    amt the amount of interpolation; some value between 0.0
   *                         (old vector) and 1.0 (new vector). 0.9 is very near
   *                         the new vector. 0.5 is halfway in between.
   * @chainable
   *
   * @example
   * <div class="norender">
   * <code>
   * var v = createVector(1, 1, 0);
   *
   * v.lerp(3, 3, 0, 0.5); // v now has components [2,2,0]
   * </code>
   * </div>
   *
   * <div class="norender">
   * <code>
   * var v1 = createVector(0, 0, 0);
   * var v2 = createVector(100, 100, 0);
   *
   * var v3 = Vector.lerp(v1, v2, 0.5);
   * // v3 has components [50,50,0]
   * print(v3);
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * var step = 0.01;
   * var amount = 0;
   *
   * function draw() {
   *   background(240);
   *   var v0 = createVector(0, 0);
   *
   *   var v1 = createVector(mouseX, mouseY);
   *   drawArrow(v0, v1, 'red');
   *
   *   var v2 = createVector(90, 90);
   *   drawArrow(v0, v2, 'blue');
   *
   *   if (amount > 1 || amount < 0) {
   *     step *= -1;
   *   }
   *   amount += step;
   *   var v3 = Vector.lerp(v1, v2, amount);
   *
   *   drawArrow(v0, v3, 'purple');
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */
  /**
   * @method lerp
   * @param  {Vector} v   the Vector to lerp to
   * @param  {Number}    amt
   * @chainable
   */
  Vector.prototype.lerp = function lerp(x, y, z, amt) {
    if (x instanceof Vector) {
      return this.lerp(x.x, x.y, x.z, y);
    }
    this.x += (x - this.x) * amt || 0;
    this.y += (y - this.y) * amt || 0;
    this.z += (z - this.z) * amt || 0;
    return this;
  };

  /**
   * Return a representation of this vector as a float array. This is only
   * for temporary use. If used in any other fashion, the contents should be
   * copied by using the <b>Vector.copy()</b> method to copy into your own
   * array.
   *
   * @method array
   * @return {Number[]} an Array with the 3 values
   * @example
   * <div class = "norender">
   * <code>
   * function setup() {
   *   var v = createVector(20, 30);
   *   print(v.array()); // Prints : Array [20, 30, 0]
   * }
   * </code>
   * </div>
   *
   * <div class="norender">
   * <code>
   * var v = createVector(10.0, 20.0, 30.0);
   * var f = v.array();
   * print(f[0]); // Prints "10.0"
   * print(f[1]); // Prints "20.0"
   * print(f[2]); // Prints "30.0"
   * </code>
   * </div>
   */
  Vector.prototype.array = function array() {
    return [this.x || 0, this.y || 0, this.z || 0];
  };

  /**
   * Equality check against a Vector
   *
   * @method equals
   * @param {Number} [x] the x component of the vector
   * @param {Number} [y] the y component of the vector
   * @param {Number} [z] the z component of the vector
   * @return {Boolean} whether the vectors are equals
   * @example
   * <div class = "norender">
   * <code>
   * var v1 = createVector(5, 10, 20);
   * var v2 = createVector(5, 10, 20);
   * var v3 = createVector(13, 10, 19);
   *
   * print(v1.equals(v2.x, v2.y, v2.z)); // true
   * print(v1.equals(v3.x, v3.y, v3.z)); // false
   * </code>
   * </div>
   *
   * <div class="norender">
   * <code>
   * var v1 = createVector(10.0, 20.0, 30.0);
   * var v2 = createVector(10.0, 20.0, 30.0);
   * var v3 = createVector(0.0, 0.0, 0.0);
   * print(v1.equals(v2)); // true
   * print(v1.equals(v3)); // false
   * </code>
   * </div>
   */
  /**
   * @method equals
   * @param {Vector|Array} value the vector to compare
   * @return {Boolean}
   */
  Vector.prototype.equals = function equals(x, y, z) {
    var a, b, c;
    if (x instanceof Vector) {
      a = x.x || 0;
      b = x.y || 0;
      c = x.z || 0;
    } else if (x instanceof Array) {
      a = x[0] || 0;
      b = x[1] || 0;
      c = x[2] || 0;
    } else {
      a = x || 0;
      b = y || 0;
      c = z || 0;
    }
    return this.x === a && this.y === b && this.z === c;
  };

  // Static Methods

  /**
   * Make a new 2D vector from an angle
   *
   * @method fromAngle
   * @static
   * @param {Number}     angle the desired angle, in radians
   * @param {Number}     [length] the length of the new vector (defaults to 1)
   * @return {Vector}       the new Vector object
   * @example
   * <div>
   * <code>
   * function draw() {
   *   background(200);
   *
   *   // Create a variable, proportional to the mouseX,
   *   // varying from 0-360, to represent an angle in degrees.
   *   angleMode(DEGREES);
   *   var myDegrees = map(mouseX, 0, width, 0, 360);
   *
   *   // Display that variable in an onscreen text.
   *   // (Note the nfc() function to truncate additional decimal places,
   *   // and the "\xB0" character for the degree symbol.)
   *   var readout = 'angle = ' + nfc(myDegrees, 1) + '\xB0';
   *   noStroke();
   *   fill(0);
   *   text(readout, 5, 15);
   *
   *   // Create a Vector using the fromAngle function,
   *   // and extract its x and y components.
   *   var v = Vector.fromAngle(radians(myDegrees), 30);
   *   var vx = v.x;
   *   var vy = v.y;
   *
   *   push();
   *   translate(width / 2, height / 2);
   *   noFill();
   *   stroke(150);
   *   line(0, 0, 30, 0);
   *   stroke(0);
   *   line(0, 0, vx, vy);
   *   pop();
   * }
   * </code>
   * </div>
   */
  Vector.fromAngle = function fromAngle(angle, length) {
    if (typeof length === 'undefined') {
      length = 1;
    }
    return new Vector(length * Math.cos(angle), length * Math.sin(angle), 0);
  };

  /**
   * Make a new 3D vector from a pair of ISO spherical angles
   *
   * @method fromAngles
   * @static
   * @param {Number}     theta    the polar angle, in radians (zero is up)
   * @param {Number}     phi      the azimuthal angle, in radians
   *                               (zero is out of the screen)
   * @param {Number}     [length] the length of the new vector (defaults to 1)
   * @return {Vector}          the new Vector object
   * @example
   * <div modernizr='webgl'>
   * <code>
   * function setup() {
   *   createCanvas(100, 100, WEBGL);
   *   fill(255);
   *   noStroke();
   * }
   * function draw() {
   *   background(255);
   *
   *   var t = millis() / 1000;
   *
   *   // add three point lights
   *   pointLight(color('#f00'), Vector.fromAngles(t * 1.0, t * 1.3, 100));
   *   pointLight(color('#0f0'), Vector.fromAngles(t * 1.1, t * 1.2, 100));
   *   pointLight(color('#00f'), Vector.fromAngles(t * 1.2, t * 1.1, 100));
   *
   *   sphere(35);
   * }
   * </code>
   * </div>
   */
  Vector.fromAngles = function(theta, phi, length) {
    if (typeof length === 'undefined') {
      length = 1;
    }
    var cosPhi = Math.cos(phi);
    var sinPhi = Math.sin(phi);
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);

    return new Vector(
      length * sinTheta * sinPhi,
      -length * cosTheta,
      length * sinTheta * cosPhi
    );
  };

  /**
   * Make a new 2D unit vector from a random angle
   *
   * @method random2D
   * @static
   * @return {Vector} the new Vector object
   * @example
   * <div class="norender">
   * <code>
   * var v = Vector.random2D();
   * // May make v's attributes something like:
   * // [0.61554617, -0.51195765, 0.0] or
   * // [-0.4695841, -0.14366731, 0.0] or
   * // [0.6091097, -0.22805278, 0.0]
   * print(v);
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * function setup() {
   *   frameRate(1);
   * }
   *
   * function draw() {
   *   background(240);
   *
   *   var v0 = createVector(50, 50);
   *   var v1 = Vector.random2D();
   *   drawArrow(v0, v1.mult(50), 'black');
   * }
   *
   * // draw an arrow for a vector at a given base position
   * function drawArrow(base, vec, myColor) {
   *   push();
   *   stroke(myColor);
   *   strokeWeight(3);
   *   fill(myColor);
   *   translate(base.x, base.y);
   *   line(0, 0, vec.x, vec.y);
   *   rotate(vec.heading());
   *   var arrowSize = 7;
   *   translate(vec.mag() - arrowSize, 0);
   *   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   *   pop();
   * }
   * </code>
   * </div>
   */
  Vector.random2D = function random2D() {
    return this.fromAngle(Math.random() * constants.TWO_PI);
  };

  /**
   * Make a new random 3D unit vector.
   *
   * @method random3D
   * @static
   * @return {Vector} the new Vector object
   * @example
   * <div class="norender">
   * <code>
   * var v = Vector.random3D();
   * // May make v's attributes something like:
   * // [0.61554617, -0.51195765, 0.599168] or
   * // [-0.4695841, -0.14366731, -0.8711202] or
   * // [0.6091097, -0.22805278, -0.7595902]
   * print(v);
   * </code>
   * </div>
   */
  Vector.random3D = function random3D() {
    var angle = Math.random() * constants.TWO_PI;
    var vz = Math.random() * 2 - 1;
    var vzBase = Math.sqrt(1 - vz * vz);
    var vx = vzBase * Math.cos(angle);
    var vy = vzBase * Math.sin(angle);
    return new Vector(vx, vy, vz);
  };

  // Adds two vectors together and returns a new one.
  /**
   * @method add
   * @static
   * @param  {Vector} v1 a Vector to add
   * @param  {Vector} v2 a Vector to add
   * @param  {Vector} target the vector to receive the result
   */
  /**
   * @method add
   * @static
   * @param  {Vector} v1
   * @param  {Vector} v2
   * @return {Vector} the resulting Vector
   *
   */

  Vector.add = function add(v1, v2, target) {
    if (!target) {
      target = v1.copy();
    } else {
      target.set(v1);
    }
    target.add(v2);
    return target;
  };

  /*
   * Subtracts one Vector from another and returns a new one.  The second
   * vector (v2) is subtracted from the first (v1), resulting in v1-v2.
   */
  /**
   * @method sub
   * @static
   * @param  {Vector} v1 a Vector to subtract from
   * @param  {Vector} v2 a Vector to subtract
   * @param  {Vector} target if undefined a new vector will be created
   */
  /**
   * @method sub
   * @static
   * @param  {Vector} v1
   * @param  {Vector} v2
   * @return {Vector} the resulting Vector
   */

  Vector.sub = function sub(v1, v2, target) {
    if (!target) {
      target = v1.copy();
    } else {
      target.set(v1);
    }
    target.sub(v2);
    return target;
  };

  /**
   * Multiplies a vector by a scalar and returns a new vector.
   */
  /**
   * @method mult
   * @static
   * @param  {Vector} v the vector to multiply
   * @param  {Number}  n
   * @param  {Vector} target if undefined a new vector will be created
   */
  /**
   * @method mult
   * @static
   * @param  {Vector} v
   * @param  {Number}  n
   * @return {Vector}  the resulting new Vector
   */
  Vector.mult = function mult(v, n, target) {
    if (!target) {
      target = v.copy();
    } else {
      target.set(v);
    }
    target.mult(n);
    return target;
  };

  /**
   * Divides a vector by a scalar and returns a new vector.
   */
  /**
   * @method div
   * @static
   * @param  {Vector} v the vector to divide
   * @param  {Number}  n
   * @param  {Vector} target if undefined a new vector will be created
   */
  /**
   * @method div
   * @static
   * @param  {Vector} v
   * @param  {Number}  n
   * @return {Vector} the resulting new Vector
   */
  Vector.div = function div(v, n, target) {
    if (!target) {
      target = v.copy();
    } else {
      target.set(v);
    }
    target.div(n);
    return target;
  };

  /**
   * Calculates the dot product of two vectors.
   */
  /**
   * @method dot
   * @static
   * @param  {Vector} v1 the first Vector
   * @param  {Vector} v2 the second Vector
   * @return {Number}     the dot product
   */
  Vector.dot = function dot(v1, v2) {
    return v1.dot(v2);
  };

  /**
   * Calculates the cross product of two vectors.
   */
  /**
   * @method cross
   * @static
   * @param  {Vector} v1 the first Vector
   * @param  {Vector} v2 the second Vector
   * @return {Number}     the cross product
   */
  Vector.cross = function cross(v1, v2) {
    return v1.cross(v2);
  };

  /**
   * Calculates the Euclidean distance between two points (considering a
   * point as a vector object).
   */
  /**
   * @method dist
   * @static
   * @param  {Vector} v1 the first Vector
   * @param  {Vector} v2 the second Vector
   * @return {Number}     the distance
   */
  Vector.dist = function dist(v1, v2) {
    return v1.dist(v2);
  };

  /**
   * Linear interpolate a vector to another vector and return the result as a
   * new vector.
   */
  /**
   * @method lerp
   * @static
   * @param {Vector} v1
   * @param {Vector} v2
   * @param {Number} amt
   * @param {Vector} target if undefined a new vector will be created
   */
  /**
   * @method lerp
   * @static
   * @param {Vector} v1
   * @param {Vector} v2
   * @param {Number} amt
   * @return {Number}      the lerped value
   */
  Vector.lerp = function lerp(v1, v2, amt, target) {
    if (!target) {
      target = v1.copy();
    } else {
      target.set(v1);
    }
    target.lerp(v2, amt);
    return target;
  };

  /**
   * @method mag
   * @param {Vector} vecT the vector to return the magnitude of
   * @return {Number}        the magnitude of vecT
   * @static
   */
  Vector.mag = function mag(vecT) {
    var x = vecT.x,
      y = vecT.y,
      z = vecT.z;
    var magSq = x * x + y * y + z * z;
    return Math.sqrt(magSq);
  };
