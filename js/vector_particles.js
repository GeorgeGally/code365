var particleEngine = function(_num_particles, _grid){

	this.particles = [];
	this.spacing = 0;
	this.length = 0;
	this.pos = new Vector();
	this.last = [];

	this.setup = function() {

	for (var i = 0; i < _num_particles; i++) {

	  var m = map(i, 0, _num_particles, 0, 360);
	  var cc = hsl(m, 96, 60);

		if (_grid != undefined) {
			this.addParticle(grid[i].x, grid[i].y, cc, i);
		} else {
			this.addParticle(w/2, h/2, cc, i);
		}

	}

	}

	this.draw = function() {
		this.moveParticles();
	}


this.addParticle = function(_x, _y, _colour, _me){
	if (_x === undefined) {
		_x = w/2;
	}
	if (_y === undefined) {
		_y = h/2;
	}
	if (_colour === undefined) {
		_colour = "black";
	}
	if (_me === undefined) {
		_me = this.particles.length;
	}

	var particle = {
		position: new Vector(_x, _y),
		pos: new Vector(_x, _y),
		target: new Vector(_x, _y),
		old: new Vector(_x, _y),
		start: new Vector(_x, _y),
		location: new Vector(_x, _y),
		orig_position: new Vector(_x, _y),
		start: new Vector(_x, _y),
		speed: new Vector(posNeg()*random(0.2,2), posNeg()*random(0.2,2)),
		acceleration: new Vector(0,0),
		c: _colour,
		alpha: 1,
		me: _me,
		r: 0,
		sz: 5,
		size: 5,
		on: true,
		isSpring: false,
		spring: 0.03,
		friction: 0.98,
		angle: radians((2.2*_me)%360)
	}

	this.particles.push(particle);
	this.last = particle;
	this.length = this.particles.length;
	this.spacing = 360/this.particles.length;

}

this.removeParticle = function(_me){
	if (_me === undefined) {
		_me = 0;
	}
	//console.log(_me);
	this.particles.splice(_me, 1);
	this.length = this.particles.length;
	for (var i = 0; i < this.length; i++) {
		var p = this.particles[i];
		p.me = i;
	}
	this.spacing = 360/this.particles.length;

}

this.moveParticles = function(){

	for (var i = 0; i < this.particles.length; i++) {

		p = this.particles[i];
		p.old = p.position;
		if (p.isSpring) {
			update(p)
		} else {
			p.position = p.position.add(p.speed);
			if (p.position.x > w) p.position.x = 0;
			if (p.position.y > h) p.position.y = 0;
			if (p.position.x < 0) p.position.x = w;
			if (p.position.y < 0) p.position.y =h;
		}
	};

}


function update(b) {

 var dx = b.target.x - b.pos.x;
 var dy = b.target.y - b.pos.y;
 var ax = dx * b.spring;
 var ay = dy * b.spring;
 b.speed.x += ax;
 b.speed.y += ay;
 //We build in some friction here, otherwise the ball
 //will keep on moving to and fro for ever.
 b.speed.x *= b.friction;
 b.speed.y *= b.friction;
 b.pos.x +=  b.speed.x;
 b.pos.y +=  b.speed.y;
}

this.moveToTarget = function(){

	for (var i = 0; i < this.particles.length; i++) {

		p = this.particles[i];
		p.old = p.position;
		p.position.x = tween(p.position.x, p.target.x, p.speed.x);
		p.position.y = tween(p.position.y, p.target.y, p.speed.x);
		if (p.position.x > w) p.position.x = 0;
		if (p.position.y > h) p.position.y = 0;
		if (p.position.x < 0) p.position.x = w;
		if (p.position.y < 0) p.position.y =h;
		p.pos = p.position;
	};

}

this.setup();

}
