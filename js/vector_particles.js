var particleEngine = function(num_particles){

this.particles = [];
this.pos = new Vector();

this.setup = function() {
	for (var i = 0; i < num_particles; i++) {

	  var m = map(i, 0, num_particles, 0, 360);
	  var cc = hsl(m, 96, 60);
		this.addParticle(w/2, h/2, cc, i);

	}
}

this.draw = function() {
	this.moveParticles();
}


this.addParticle = function(_x, _y, _colour, _me){

	var particle = {
		position: new Vector(_x, _y),
		pos: new Vector(_x, _y),
		old: new Vector(_x, _y),
		start: new Vector(_x, _y),
		location: new Vector(_x, _y),
		orig_position: new Vector(_x, _y),
		speed: new Vector(posNeg()*random(0.2,2), posNeg()*random(0.2,2)),
		c: _colour,
		me: _me,
		r: 0,
		sz: 5,

		angle: radians((2.2*_me)%360)
	}

	this.particles.push(particle);

}


this.moveParticles = function(){

	for (var i = 0; i < this.particles.length; i++) {

		p = this.particles[i];
		p.old = p.position;
		p.position = p.position.add(p.speed);
		if (p.position.x > w) p.position.x = 0;
		if (p.position.y > h) p.position.y = 0;
		if (p.position.x < 0) p.position.x = w;
		if (p.position.y < 0) p.position.y =h;

	};

}

this.setup();

}
