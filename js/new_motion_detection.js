


//GET CHANGES FROM BACKGROUND
var sensitivity = 20;
var samplesize = 10;
var old = [];
var motion_array = [];
var hidden_ctx = createHiddenCanvas("canvas2");


function motionDetection(_samplesize, _flip){

	if (_samplesize == undefined) {
		_samplesize = samplesize;
	}

	motion_array = [];
	hidden_ctx.drawImage(video,0,0,w,h);
	sample = hidden_ctx.getImageData(0, 0, w, h);
	var buffer = new Uint32Array(sample.data.buffer);

	//ctx.drawImage(video, 0,0,w,h);
	//img = ctx.getImageData(0, 0, width, height);

	// var tl = new Vector(w,h);
	// var br = new Vector(0,0);

	for (var y = 0; y < h; y+=_samplesize) {

		for (var x = 0; x < w; x+=_samplesize) {

			var pos = (x + y * w) * 4;
			var r = buffer[pos] >> 0 & 0xff;
			var g = buffer[pos] >> 8 & 0xff;
			var b = buffer[pos] >> 16 & 0xff;

  			if (old.length > 0 && Math.abs(r-old[pos]) > sensitivity) {

					var c = new Vector(r,g,b);

					if (_flip == true) {
  					motion_array.push(new Vector(w-x,y,c));
					} else {
						motion_array.push(new Vector(x,y,c));
					}

  			}

  			old[pos] = r;
		}

	}

		return motion_array;
}

// function getPixelValue(buffer, x, y, w){
// 	var pos = x + y * w;
// 	var r = buffer[pos] >> 0 & 0xff;
// 	var g = buffer[pos] >> 8 & 0xff;
// 	var b = buffer[pos] >> 16 & 0xff;
// 	return {r: r, g: g, b: b}
// }
