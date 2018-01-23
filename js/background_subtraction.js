

//GET CHANGES FROM BACKGROUND
var presenceSum = 0;
var scan_resolution = 30;
var camera_sensitivity = 8;
var motion_array = [];
var background_data;
var left = right = top = bottom = new Vector();
var target_topLeft = target_bottomRight = new Vector();
var showPixels = false;
var ctx2 = createHiddenCanvas("hidden_canvas");

function motionDetection(_scan_resolution){

	if(background_data) {
		if (_scan_resolution == undefined) _scan_resolution = scan_resolution;
		
		motion_array = [];

		ctx2.drawImage(video, 0,0,w,h);
		img = ctx2.getImageData(0, 0, width, height);

  	if(!showBgImg && !showVideo) {
  		//ctx.background(0);
  	} else if (showBgImg) {
  		ctx.putImageData(background_data, 0, 0);
  	}

	var tl = new Vector(w,h);
	var br = new Vector(0,0);

	var sourceBuffer32 = new Uint32Array(img.data.buffer);
	var pixels = new Uint32Array(w*h/scan_resolution);

   	for(var x = 0; x < w; x += scan_resolution) {

        for(var y = 0; y < h; y += scan_resolution){

          var pos = (x + y * w);

          var b = (sourceBuffer32[pos] >> 16) & 0xff;
          var g = (sourceBuffer32[pos] >> 8) & 0xff;
          var r = (sourceBuffer32[pos] >> 0) & 0xff;

          var old_b = (sourceBuffer32[pos] >> 16) & 0xff;
          var old_g = (sourceBuffer32[pos] >> 8) & 0xff;
          var old_r = (sourceBuffer32[pos] >> 0) & 0xff;

        	var diffR = Math.abs(r - old_r);
					var diffG = Math.abs(b - old_g);
					var diffB = Math.abs(b - old_b);

					presenceSum = diffR + diffG + diffB;
					//console.log(presenceSum)

			if (presenceSum > camera_sensitivity) {

				motion_array.push(new Vector(x,y));
				// constrain to projection area for spped
				if (showPixels) {
          	//ctx.fillStyle = rgb(r,g,b);
          	ctx.fillStyle = "#00356f";
          	ctx.fillRect(x, y, scan_resolution, scan_resolution);
        }

				if (x < tl[0]) tl[0] = x;
				if (y < tl[1]) tl[1] = y;

				if (x > br[0]) br[0] = x;
				if (y > br[1]) br[1] = y;

			}
		}
		}

		// show movement bounding box

		//ctx.fillStyle = rgba(255,0,0,0.6);
		//ctx.fillRect(topLeft.x, topLeft.y, box_size.x, bottomRight.x-topLeft.y);

		target_topLeft.x = tween(target_topLeft.x, tl.x,20);
		target_topLeft.y = tween(target_topLeft.y, tl.y,20);
		target_bottomRight.x = tween(target_bottomRight.x, br.x,20);
		target_bottomRight.y = tween(target_bottomRight.y, br.y,20);

		//ctx.fillRect(target_topLeft.x, target_topLeft, target_bottomRight.x-target_topLeft.x, target_bottomRight.y-target_topLeft.y);
		//return motion_array;
	}

}



document.addEventListener("keydown", function(){

	var keyCode = event.keyCode;
	if (keyCode == 32) {

  		ctx.drawImage(video, 0,0,w,h);
  		console.log('** Background Saved **');
  		background_data = ctx.getImageData(0, 0, width, height);
  		ctx.background(0);
  	}

});
