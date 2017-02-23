//document.addEventListener('DOMContentLoaded', 'loaded', false);

// var fileref = document.createElement('script')
//         fileref.setAttribute("type","text/javascript")
//         fileref.setAttribute("src", "js/video.js")


function motionDetection(_samplesize){

	//GET CHANGES FROM BACKGROUND
	this.sensitivity = 20;
	this.motion_array = [];
	this.old = [];
	this.motion_array = [];

	this.hidden_ctx = createHiddenCanvas("canvas2");

	if (_samplesize == undefined) {
		this.samplesize = 10;
	} else {
		this.samplesize = _samplesize;
	}



	//ctx.drawImage(video, 0,0,w,h);
	//img = ctx.getImageData(0, 0, width, height);

	// var tl = new Vector(w,h);
	// var br = new Vector(0,0);
	this.detect = function(){

		hidden_ctx.drawImage(video, 0, 0, w, h);
		sample = hidden_ctx.getImageData(0, 0, w, h);
		var buffer = new Uint32Array(sample.data.buffer);
		var count = 0;
		for (var y = 0; y < h; y+= this.samplesize) {

			for (var x = 0; x < w; x+= this.samplesize) {

			var pos = x + y * w;
			var r = buffer[pos] >> 0 & 0xff;
			var g = buffer[pos] >> 8 & 0xff;
			var b = buffer[pos] >> 16 & 0xff;

  			//if (Math.abs(r-this.old[pos]) > this.sensitivity) {
  				var c = new Vector(r,g,b);
				// } else {
				// 	var c = 0;
				// }
  				this.motion_array.push(new Vector(w-x, y, c));

  			old[pos] = r;
				count++;
		}

	}

		// show movement bounding box

		//ctx.fillStyle = rgba(255,0,0,0.6);
		//ctx.fillRect(topLeft.x, topLeft.y, box_size.x, bottomRight.x-topLeft.y);

		// target_topLeft.x = tween(target_topLeft.x, tl.x,20);
		// target_topLeft.y = tween(target_topLeft.y, tl.y,20);
		// target_bottomRight.x = tween(target_bottomRight.x, br.x,20);
		// target_bottomRight.y = tween(target_bottomRight.y, br.y,20);

		//ctx.fillRect(target_topLeft.x, target_topLeft, target_bottomRight.x-target_topLeft.x, target_bottomRight.y-target_topLeft.y);
		return this.motion_array;
	}
}
