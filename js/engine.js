

var engine = new particleEngine(300, 200);
console.log(engine);

engine.showParticles = function(num, circ){

  circ = circ || false;
  var grid_w = grid_h = Math.round(Math.sqrt(num));
  //console.log(grid_w);

  var total = grid_w * grid_w;
  var remainder = num - total;

  if (total > 0) grid_h++;

  engine.length = num;
  engine.grid = new Grid(grid_w, grid_h);
  for (var i = 0; i < engine.particles.length; i++) {

    var p = engine.particles[i];
    //p.pos.x = w/2;
    //p.pos.y = h/2;
    if (i < num) {
      engine.showParticle(p, circ);
    } else {
      engine.hideParticle(p);
    }
  }
}


engine.showParticle= function(p, circ){
  var angle = radians(distributeAngles(p.me, engine.length));
  // p.target.x = random(w);
  // p.target.y = random(h);
  if (circ == true) {
    p.target.x = w/2 + Math.cos(angle)*200;
    p.target.y = h/2 + Math.sin(angle)*200;
  } else {
    p.target.x = engine.grid.pos[p.me].x;
    p.target.y = engine.grid.pos[p.me].y;
  }


  p.on = true;
}


engine.hideParticle= function(p){
  p.target.x = w/2;
  p.target.y = h/2;
  p.on = false;
}

engine.showParticles(20);
