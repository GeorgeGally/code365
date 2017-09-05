

function pixelGrid(grid_w, grid_h, pixel_sz){

	var buffer = new Uint32Array();
	this.grid_w = grid_w || 20;
	this.grid_h = grid_h || 20;
	this.samplesize = {x: Math.round(w / this.grid_w), y: Math.round(h / this.grid_h)};
	this.pixel_sz = pixel_sz || Math.round(this.samplesize.x * 0.5);



	this.shape = "circle";
	this.colour_array = [];


	this.getSample = function(_ctx, _ctx2){

		var ctx = _ctx || ctx;
		var ctx2 = _ctx2 || ctx;

	 	sample = ctx2.getImageData(0,0,w,h);

		buffer = new Uint32Array(sample.data.buffer);

	 for (var y = 0; y < h; y+= this.samplesize.y) {

		 for (var x = 0; x < w; x+= this.samplesize.x) {

			 var pos = x + y * w;

			 var r = buffer[pos] >> 0 & 0xff;
			 var g = buffer[pos] >> 8 & 0xff;
			 var b = buffer[pos] >> 16 & 0xff;

			// ctx.fillStyle = rgb(r*1.2, g*1.2, b*1.2);
			ctx.fillStyle = rgb(r, g, b);
			if (this.shape == "circle") {
				ctx.LfillEllipse(x, y, this.pixel_sz, this.pixel_sz, 4);
			} else {
				ctx.centreFillRect(x, y, this.pixel_sz, this.pixel_sz, this.pixel_sz);
			}

		 }
	 }

 }

 this.draw = function(_ctx, _ctx2){
	 var ctx = _ctx || ctx;
	 var ctx2 = _ctx2 || ctx;
	 ctx.background(10);
	 this.getSample(ctx, ctx2);
 }

return this;
}
