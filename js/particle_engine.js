var particleEngine = function(_gw, _gh, _grid_w, _grid_h, _startx, _starty){

	var gw = _gw || 1;
	var gh = _gh || 1;
	this.start = {x: _startx || 0 , y: _starty || 0};
	this.width = _grid_w || w;
  this.height = _grid_h || h;

	this.bounce = false;
	this.edges = true;
	this.particles = [];
	this.spacing = 0;
	this.border = true;
	this.speed = new Vector(random(0.2,2), random(0.2,2));
	this.length = 0;
	this.tween_speed = 10;
	this.pos = new Vector();
	this.last = [];

	var num_particles = gw * gh;
	this.grid = new Grid(gw, gh,  this.width, this.height, this.start.x, this.start.y);
	//console.log(this.grid);

	this.setup = function() {

	for (var i = 0; i < num_particles; i++) {

	  var m = map(i, 0, num_particles, 0, 360);
	  var cc = rgb(0);
		this.add(this.grid.x[i], this.grid.y[i], cc, i);

	}

	}

	this.draw = function() {
		this.update();
		this.drawParticles();
	}


	this.get = function(i){
		return this.particles[i];
	}

	this.add = function(_x, _y, _colour, _me){
		//console.log(this.grid.grid);

		_x = _x || w/2;
		_y = _y || h/2;
		_colour = _colour || "black";
		_me = _me || this.particles.length;

		var angle = radians(distributeAngles(_me, this.particles.length));

		if (this.grid.grid[_me]) {
			row = this.grid.grid[_me].row
			col = this.grid.grid[_me].col
		} else {
			row = 1;
			col = 1;
		}
		var particle = {
			pos: new Vector(_x, _y),
			start: new Vector(_x, _y),
			target: new Vector(_x, _y),
			old: new Vector(_x, _y),
			end: new Vector(_x, _y),
			row: row,
			col: col,
			speed: new Vector(random(0.2,2), random(0.2,2)),
			acceleration: new Vector(0,0),
			c: _colour,
			alpha: 1,
			tween_speed: this.tween_speed,
			tween: true,
			me: _me,
			//parent: null,
			r: 0,
			sz: 5,
			orig_sz: 5,
			target_sz: 5,
			target_size: 5,
			size: 4,
			dir: new Vector(posNeg(),posNeg()),
			on: true,
			isSpring: false,
			spring: 0.03,
			friction: 0.98,
			angle: angle,
			engine: []
	}

		this.particles.push(particle);
		this.last = particle;
		this.length = this.particles.length;
		this.spacing = 360/this.particles.length;

		return particle;
}

this.delete = function(_me){
	if (_me === undefined) {
		_me = 0;
	}
	// var pos = this.particles.indexOf(p)
	// if (p === undefined) {
	// 	pos = 0;
	// }
	//console.log(pos);
	//this.particles.splice(pos, 1);
	//console.log(_me);
	this.particles.splice(_me, 1);
	this.length = this.particles.length;
	for (var i = 0; i < this.length; i++) {
		var p = this.particles[i];
		p.me = i;
	}
	this.spacing = 360/this.particles.length;

}

this.drawParticles = function(){

	for (var i = 0; i < this.length; i++) {

		p = this.particles[i];
		ctx.fillEllipse(p.pos.x, p.pos.y, p.sz, p.sz);

	}

}


this.update = function(){

	for (var i = 0; i < this.length; i++) {

		p = this.particles[i];

		if (p.isSpring) {
			updateSpring(p)
		}	else {
			this.move(p);
			if(this.border) this.offCanvasTest(p);
		};
	}
}


this.move = function(p){

		p.old = p.pos;
		if (p.tween == false) {
			p.pos.x += (p.speed.x)*p.dir.x;
			p.pos.y += (p.speed.y)*p.dir.y;

		} else {
			p.target.x += (p.speed.x)*p.dir.x;
			p.target.y += (p.speed.y)*p.dir.y;
			p.sz = tween(p.sz, p.target_sz, p.tween_speed);
			p.pos.x = tween(p.pos.x, p.target.x, p.tween_speed);
			p.pos.y = tween(p.pos.y, p.target.y, p.tween_speed);
		}

		//if (p.me == 2) console.log(p.speed.x);

}



this.offCanvasTest = function(p){
	if (this.bounce) {
				if (bounce(p.x, 0, w)) p.speed.x *=-1;
				if (bounce(p.y, 0, h)) p.speed.y *=-1;
	} else {
				if (p.pos.x > w) p.pos.x = p.target.x = 0;
				if (p.pos.y > h) p.pos.y = p.target.y = 0;
				if (p.pos.x < 0) p.pos.x = p.target.x = w;
				if (p.pos.y < 0) p.pos.y = p.target.y =h;
	}
}


function updateSpring(b) {

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


this.getEnd = function(b){
	parent = b.parent;
	angle = b.angle;
	while(parent) {
		angle += parent.angle;
	//if(b.parent != undefined) { b.angle += parent.angle; }
		//if(b.parent != undefined)
		parent = parent.parent;
	}
	var x = b.pos.x + Math.cos(angle) * b.size;
	var y = b.pos.y + Math.sin(angle) * b.size;
	b.end = new Vector(x,y)
	return b.end;
}


this.respace = function(){
	for (var i = 0; i < this.particles.length; i++) {
		var p = this.particles[i];
		p.target.x = this.grid[i].x;
		p.target.y = this.grid[i].y;
	}
}


this.setup();

}
