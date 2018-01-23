

//GET CHANGES FROM BACKGROUND
var sensitivity = 50;
var samplesize = 20;
var old = [];
var motion_array = [];

var motion_ctx = createHiddenCanvas("canvas3");

function motionDetection(_samplesize){

	if (_samplesize == undefined) {
		_samplesize = samplesize;
	}
	motion_array = [];
	if(video) {
		motion_ctx.drawImage(video, 0, 0, w, h);
	sample = motion_ctx.getImageData(0,0,w,h);
	var buffer = new Uint32Array(sample.data.buffer);

	for (var y = 0; y < h; y+=_samplesize) {

		for (var x = 0; x < w; x+=_samplesize) {

			var pos = x + y * w;
			var r = buffer[pos] >> 0 & 0xff;
			var g = buffer[pos] >> 8 & 0xff;
			var b = buffer[pos] >> 16 & 0xff;

  			if (old[pos] > 0 && Math.abs(r-old[pos]) > sensitivity) {
  				var c = rgb(r, g, b);
					var p = new Vector(x, y);
  				motion_array.push({pos: p, x: x, y: y, c: c, r:r, g:g, b:b});
  			}

  			old[pos] = r;
		}
	}
	}

		return motion_array;
}
