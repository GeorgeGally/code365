
var oldColour = [];
var movement = [];
var sensitivity = 15;



////// EFFECTS

p.drawText = function (_options){
	if (_options.background === undefined) _options.background = "none";

	options = {
		fontSize: 	_options.fontSize 	|| 20,
		blockSize: 	_options.blockSize 	|| 12,
		background: _options.background,
		colourType: _options.colourType || "all"
	}

	//console.log(options);

  	this.font= options.fontSize + "px Courier";

    var col = [];
    var j = 0;

    var imgData = this.getImageData(0,0,w,h);
    console.log(imgData);
    for(var x = 0; x < w; x += options.blockSize) {

        for(var y = 0; y < h; y += options.blockSize) {

            var pos = (x + y * w);
            var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;

						if (options.colourType == "red") {
							col.push(rgb(r, 0, 0));
						} else if (options.colourType == "green") {
							col.push(rgb(0, r, 0));
						} else if (options.colourType == "blue") {
							col.push(rgb(0, 0, r));
						} else {
							col.push(rgb(r,g,b));
						}

        }

    }
		//console.log(options.background);

		if (options.background == "none") {
			this.background(250);
		} else {
			this.background(options.background);
		}


    var j = 0;
    for(var x = 0; x < w; x += options.blockSize) {

				for(var y = 0; y < h; y += options.blockSize) {

            this.fillStyle = col[j];
            this.fillText("*", x, y);
            j++;
        }
    }

}

p.pixelate = function (blocksize) {

  if (blocksize == undefined) blocksize = 20;
  blocksize = Math.round(blocksize);
  //console.log(this.width);
  var imgData = this.getImageData(0,0,w,h);

  this.clearRect(0,0,w,h);

    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);

    for(var x = 0; x < w; x += blocksize)
    {
        for(var y = 0; y < h; y += blocksize)
        {

          var pos = (x + y * w);
          var b = (sourceBuffer32[pos] >> 16) & 0xff;
          var g = (sourceBuffer32[pos] >> 8) & 0xff;
          var r = (sourceBuffer32[pos] >> 0) & 0xff;
          this.fillStyle = rgb(r,g,b);
          this.fillRect(x, y, blocksize, blocksize);

        }
    }

}


function pixelate(blocksize,blockshape, _ctx) {
  var ctx =  _ctx || ctx;
  if (blockshape == undefined) blockshape = 0;
  if (blocksize == undefined) blocksize = 20;
  var imgData=ctx.getImageData(0,0,w,h);

  ctx.clearRect(0,0,w,h);
  //console.log(blockshape)
  if (blockshape == 3) {
    ctx.background(0);
  }

    //var sourceBuffer8 = new Uint8Array(imgData.data.buffer);
    //var sourceBuffer8 = new Uint8ClampedArray(imgData.data.buffer);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    for(var x = 0; x < w; x += blocksize)
    {
        for(var y = 0; y < h; y += blocksize)
        {

          var pos = (x + y * w);
          var b = (sourceBuffer32[pos] >> 16) & 0xff;
          var g = (sourceBuffer32[pos] >> 8) & 0xff;
          var r = (sourceBuffer32[pos] >> 0) & 0xff;
          ctx.fillStyle = rgb(r,g,b);
          if (blockshape == 0) {
            ctx.fillRect(x, y, blocksize, blocksize);
          } else if (blockshape == 1) {
          	ctx.fillEllipse(x, y, blocksize, blocksize);
          } else if (blockshape == 2) {
          	var bb = brightness(r,g,b);
          	ctx.fillStyle = (bb < 40 ? rgb(0) : rgb(255));
            ctx.fillEllipse(x, y, blocksize-1, blocksize-1);
           } else if (blockshape == 3) {
            ctx.fillStyle = rgb(r,g,b);
            ctx.fillEllipse(x, y, blocksize-3, blocksize-3);
          } else if (blockshape == 4) {
           //ctx.fillStyle = rgb(0);
           ctx.fillStyle = rgb(r,g,b);
           var sz = blocksize - map(r, 0, 255, 0, blocksize);
           ctx.fillEllipse(x, y, sz, sz);
          } else {
          	var bb = brightness(r,g,b);
          	if (bb< 40) {
          		ctx.fillStyle = rgb(0);
          		ctx.fillEllipse(x, y, blocksize-1, blocksize-1);
          	} else {
          		ctx.fillStyle = rgb(255);
          		ctx.fillEllipse(x, y, blocksize-1, blocksize-1);
            	ctx.strokeEllipse(x, y, blocksize, blocksize);
          	}
          };

        }
    }

}

p.posterize = function(blocksize, ammt) {
 if (ammt == undefined) ammt = 0;

 if (blocksize == undefined) blocksize = 20;

 ammt = Math.floor(ammt);
 blocksize = Math.floor(blocksize);

 var imgData=this.getImageData(0,0,w,h);

 this.clearRect(0,0,w,h);

 var sourceBuffer32 = new Uint32Array(imgData.data.buffer);

 for (var x = 0; x < w; x += blocksize) {

   for (var y = 0; y < h; y += blocksize) {

         var pos = (x + y * w);
         var b = (sourceBuffer32[pos] >> 16) & 0xff;
         var g = (sourceBuffer32[pos] >> 8) & 0xff;
         var r = (sourceBuffer32[pos] >> 0) & 0xff;
         r = sticky(r, ammt);
         g = sticky(g, ammt);
         b = sticky(b, ammt);
         this.fillStyle = rgb(r,g,b);
         this.fillRect(x, y, blocksize, blocksize);

       }
   }

}


function pixelShuffle(blockwidth, blockheight, freq, x1, y1, x2, y2) {

  if (x1 == undefined) {
    x1 = 0; y1 = 0; x2 = w; y2 = h;
  }
	if (freq == undefined) freq = 20;
	if (blockwidth == undefined) blockwidth = 20;
	if (blockheight == undefined) blockheight = blockwidth;
    var imgData=ctx.getImageData(x1,y1,x2,y2);
    //var sourceBuffer8 = new Uint8Array(imgData.data.buffer);
    //var sourceBuffer8 = new Uint8ClampedArray(imgData.data.buffer);
    //shuffle(sourceBuffer8, 1);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);

    for(var x = x1; x < x2; x += blockwidth) {

        for(var y = y1; y < y2; y += blockheight) {

          var pos = (x + y * x2);
          if (chance(freq)) {
            pos = (pos + randomInt(-100,100)*4) % (x2*y2*4);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;
            ctx.fillStyle = rgba(r,g,b, 0.9);
          ctx.fillRect(x, y, blockwidth, blockheight);
          }
        };

    }

}






function halftone(blocksize, reverse) {
  if (reverse == undefined) reverse = 1;
  if (reverse == true) reverse = -1;
  if (blocksize == undefined) blocksize = 20;
  var imgData=ctx.getImageData(0,0,w,h);

  ctx.clearRect(0,0,w,h);
  var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
  ctx.fillStyle = rgb(0,0,0);

  for(var x = 0; x < w; x += blocksize) {

        for(var y = 0; y < h; y += blocksize) {

        	var pos = (x + y * w);
        	var b = (sourceBuffer32[pos] >> 16) & 0xff;
			var g = (sourceBuffer32[pos] >> 8) & 0xff;
        	var r = (sourceBuffer32[pos] >> 0) & 0xff;
          	if (reverse == -1) {
          		var bb = 100 - brightness(r,g,b);
          	} else {
          		var bb = brightness(r,g,b);
          	}

          	ctx.fillEllipse(x, y, blocksize*bb/100, blocksize*bb/100);

          };

        }
    }




function triangulate(grid_w, grid_h, alpha) {

	grid_h = grid_h || grid_w;

	alpha = alpha || 0.8;


	var ww = Math.ceil(w/grid_w);
	var	hh = Math.ceil(h/grid_h);
    var imgData=ctx.getImageData(0,0,w,h);
    ctx.clearRect(0,0,w,h);
    //var sourceBuffer8 = new Uint8Array(imgData.data.buffer);
    //var sourceBuffer8 = new Uint8ClampedArray(imgData.data.buffer);

    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    var i =0;
    for(var x = 0; x < w; x += grid_w)
    {
        for(var y = 0; y < h; y += grid_h)
        {

          var pos = (x + y * w);
          var b = (sourceBuffer32[pos] >> 16) & 0xff;
          var g = (sourceBuffer32[pos] >> 8) & 0xff;
          var r = (sourceBuffer32[pos] >> 0) & 0xff;
          ctx.fillStyle = rgba(r,g,b, alpha);

  if (i%2) {
	 ctx.fillTriangle(x, y - grid_h, x, y + grid_h, x - grid_w, y );
	} else {
		ctx.fillTriangle(x - grid_w, y - grid_h, x, y, x - grid_w , y + grid_h);
	}

	i++;
  }
}

}



function triangulateBrightness(grid_w, grid_h, alpha) {

  var grid_w = grid_w || 10;

	if (grid_h == undefined) {
		grid_h = grid_w;
	}

	if (alpha == undefined) {
		alpha = 0.8;
	}

	var ww = Math.ceil(w/grid_w);
	var	hh = Math.ceil(h/grid_h);
    var imgData=ctx.getImageData(0,0,w,h);
    ctx.clearRect(0,0,w,h);
    //var sourceBuffer8 = new Uint8Array(imgData.data.buffer);
    //var sourceBuffer8 = new Uint8ClampedArray(imgData.data.buffer);

    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    var i =0;
    for(var x = 0; x < w; x += grid_w)
    {
        for(var y = 0; y < h; y += grid_h)
        {

          var pos = (x + y * w);
          var b = (sourceBuffer32[pos] >> 16) & 0xff;
          var g = (sourceBuffer32[pos] >> 8) & 0xff;
          var r = (sourceBuffer32[pos] >> 0) & 0xff;
          // ctx.fillStyle = rgba(r,g,b, alpha);
          ctx.fillStyle = rgba(0, alpha);
          var sz = map(brightness(r,g,b), 0, 100, 0, ww);
          //console.log(sz);
          sz/=2;
  if (i%2) {
	   ctx.fillTriangle(x, y - sz, x, y + sz, x - sz, y );
	} else {
		 ctx.fillTriangle(x - sz, y - sz, x, y, x - sz , y + sz);
	}

	i++;
  }
}

}





// MIRROR THE CANVAS

function mirror(_side){

  var side = _side || 1;
  var input = ctx.getImageData(0, 0, w, h);
  var output = ctx.createImageData(w, h);
  var inputData = input.data;
  var outputData = output.data
   // loop
   if (side ==1) {
   for (var y = 0; y < h; y += 1) {
       for (var x = 0; x < w/2; x += 1) {
         // RGB
         var i = Math.round(y*w + x)*4;
         var flip = Math.round(y*w + (w/2 - x))*4;
         for (var c = 0; c < 4; c += 1) {
            outputData[i+c] = inputData[flip+c];
         }
       }
   }
   ctx.putImageData(output, w/2, 0);
 } else if (side ==2) {
   for (var y = 0; y < h/2; y += 1) {
     for (var x = 1; x < w; x += 1) {
       var i = Math.round(y*w + x)*4;
       var flip = Math.round((h/2-y)*w + x)*4;
       for (var c = 0; c < 4; c += 1) {
         outputData[i+c] = inputData[flip+c];
       }
     }
   }
   ctx.putImageData(output, 0, h/2);
  } else {
    for (var y = h/2; y < h; y += 1) {
      for (var x = 1; x < w; x += 1) {
        var i = (y*w + x)*4;
        var flip = ((h/2-y)*w + x)*4;
        for (var c = 0; c < 4; c += 1) {
          outputData[i+c] = inputData[flip+c];
        }
      }
    }
    ctx.putImageData(output, 0, h/2);
  }
}


// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}


p.mirror = function(_side){

  var input = ctx.getImageData(0, 0, w, h);
  var output = ctx.createImageData(w, h);
  output.data.set(input.data);

  //ctx.background(255,0,0);
  ctx.fillStyle = "black";
  ctx.save();
  ctx.translate(-w/2, 0)
  //ctx.scale(-1, 1);



  //ctx.drawImage(destCtx, 0, 0, w, h);
  //ctx.fillEllipse(-w, h/2, 100)
  //ctx.fillEllipse(w/2, h/2, 100)
  this.putImageData(output, -w/2, 0, w/2, 0, w/2, h);
  ctx.restore();

  //
  //ctx.background(255,0,0)
//   ctx.fillStyle = "black";
//   ctx.save();
//   // ctx.translate(-w/2, 0); // these operations aren't commutative
//   ctx.scale(-1,0);           // these values could be wrong
// //this.putImageData(input, w, h);
//   //ctx.drawImage(destCtx, -w/2, 0, w/2, h);
//   //console.log(;
//   ctx.fillEllipse(2 * 1067, h/2, 300, 100)
// //drawHalfShape(context,width,height,arrowWidth,arrowHeight,edgeCurveWidth,color);
//   ctx.restore();
  // var side = _side || 1;
  // var input = ctx.getImageData(0, 0, w, h);
  // var output = ctx.createImageData(w, h);
  // var inputData = input.data;
  // var outputData = output.data
  //  // loop
  //  if (side ==1) {
  //  for (var y = 1; y < h-1; y++) {
  //      for (var x = w/2; x < w; x++) {
  //        // RGB
  //        var i = (y * w + x)*4;
  //        var flip = (y * w - (w + x))*4;
  //        for (var c = 0; c < 4; c ++) {
  //           outputData[i+c] = inputData[flip+c];
  //        }
  //      }
  //  }
  //  this.putImageData(output, w/2, 0);
  //
  // } else {
  //   for (var y = 0; y < h/2; y += 1) {
  //     for (var x = 1; x < w; x += 1) {
  //       var i = (y * w + x) * 4;
  //       //var flip = ((h/2-y)*w + x)*4;
  //       for (var c = 0; c < 4; c += 1) {
  //         outputData[i+c] = inputData[i+c];
  //       }
  //     }
  //   }
  //   this.putImageData(output, 0, h/2);
  // }
}

// p.mirror = function(){
//
//   var input = ctx.getImageData(0, 0, w/2, h);
//   var output = ctx.createImageData(w/2, h);
//   var inputData = input.data;
//   var outputData = output.data
//    // loop
//    for (var y = 0; y < h; y++) {
//        for (var x = 0; x < w; x++) {
//          // RGB
//          var i = Math.round(y * w + x) * 4;
//          var flip = Math.round(y * w + (w-x)) * 4;
//          for (var c = 0; c < 4; c ++) {
//             outputData[i+c] = inputData[flip+c];
//          }
//        }
//    }
//    ctx.putImageData(output, w/2, 0);
//
// }


// p.mirror = function(_side){
//   var side = _side || 2;
//   var input = ctx.getImageData(0, 0, w, h);
//   var output = ctx.createImageData(w, h);
//   var inputData = input.data;
//   var outputData = output.data
//    // loop
//    if (side ==1) {
//      for (var y = 1; y < h-1; y += 1) {
//          for (var x = 0; x < w/2; x += 1) {
//            // RGB
//            var i = (y*w + x)*4;
//            var flip = (y*w + (w/2 - x))*4;
//            for (var c = 0; c < 4; c += 1) {
//               outputData[i+c] = inputData[flip+c];
//            }
//          }
//         ctx.putImageData(output, w/2, 0);
//      }
//  } else {
//        for (var x = 1; x < w; x += 1) {
//          for (var y = 0; y < h/2; y += 1) {
//          // RGB
//          var i = (y*w + x)*4;
//          var flip = ((h-y)*w + x)*4;
//          for (var c = 0; c < 4; c += 1) {
//             outputData[i+c] = inputData[flip+c];
//          }
//        }
//    }
//    ctx.putImageData(output, 0, h/2);
//  }
//
// }







function strobe(_prob, _c){
	var prob = _prob || 100;
	var c = _c || 0;
	if (chance(prob)) {
   	ctx.background(c);
  }
}




 p.theshold = function(ammt) {
	 ammt = Math.round(ammt) || 150;
   //var context = this.engine.render.context,
        imgData = ctx.getImageData(0, 0, w, h),
        px = imgData.data,
        length = px.length;

    for (var i = 0; i < length; i += 4) {
			var b = (px[i] + px[i+1] + px[i+2])/3;
      if (b > ammt) {
        px[i] = px[i + 1] = px[i + 2] = 255;
      } else {
        px[i] = px[i + 1] = px[i + 2] = 0;
      }

			px[i + 3] = 255
    }

    ctx.putImageData(imgData, 0, 0);

}



function pixelate(blocksize, blockshape) {
  if (blocksize == undefined) var blocksize = 20;
    var imgData=ctx.getImageData(0,0,w,h);
    ctx.clearRect(0,0,w,h);
    //var sourceBuffer8 = new Uint8Array(imgData.data.buffer);
    //var sourceBuffer8 = new Uint8ClampedArray(imgData.data.buffer);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    for(var x = 0; x < w; x += blocksize)
    {
        for(var y = 0; y < h; y += blocksize)
        {
            //var pos = (x + y * w) * 4;
            var pos = (x + y * w);
            //ctx.fillStyle = rgb(sourceBuffer8[pos], sourceBuffer8[pos+1], sourceBuffer8[pos+2]);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;
            //ctx.fillStyle = rgb(sourceBuffer32[pos], sourceBuffer32[pos+1], sourceBuffer32[pos+2]);
            ctx.fillStyle = rgb(r,g,b);
            if (blockshape == undefined || blockshape == 0) {
              ctx.fillRect(x, y, blocksize, blocksize);
            } else {
              ctx.fillEllipse(x, y, blocksize, blocksize);
            };

        }
    }
}


function colourArray(blocksize, alpha) {

  if (blocksize == undefined) var blocksize = 20;
  if (alpha == undefined) var alpha = 0.5;
    var imgData=hidden_ctx.getImageData(0,0,w,h);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    var i = 0;
    for(var x = 0; x < w; x += blocksize)
    {
        for(var y = 0; y < h; y += blocksize)
        {

            var pos = (x + y * w);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;

            if(Math.abs(r - oldColour[i])>sensitivity) {
                movement[i] = rgba(r, g, b, alpha);
            } else {
                movement[i] = 0;
            }

            oldColour[i] = r;
            i++;

        }
    }
    return movement;
}


function lineFx(blocksize, blockshape, ww) {
  if (blocksize == undefined) var blocksize = 4;
    var imgData = ctx.getImageData(0,0,w,h);
    ctx.clearRect(0,0,w,h);
    //var sourceBuffer8 = new Uint8Array(imgData.data.buffer);
    //var sourceBuffer8 = new Uint8ClampedArray(imgData.data.buffer);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    for(var x = 0; x < w; x += blocksize)
    {
        for(var y = 0; y < h; y += blocksize)
        {
            //var pos = (x + y * w) * 4;
            var pos = (x + y * w);
            //ctx.fillStyle = rgb(sourceBuffer8[pos], sourceBuffer8[pos+1], sourceBuffer8[pos+2]);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;
            ctx.lineWidth = 1;
            ctx.strokeStyle = rgba(r,g,b, 0.8);
            if (blockshape == undefined || blockshape == 0) {
                if (ww == undefined || ww == 0) {
                    ww = random(145,295);
                }


             for (var i = 5 - 1; i >= 0; i--) {
                 drawline(x,y, ww);
             };

              //ctx.fillRect(x, y, blocksize, blocksize);
            } else {
                for (var i = 5 - 1; i >= 0; i--) {
                    ww = random(45,195);
                 drawCirc(x,y, ww, r,g,b);
             };

            }


        }
    }
}

function drawCirc(x,y, ww, r,g,b){

    x += random(-8,8);
    y += random(-8,8);
    if ( r!=182 && g!=213 && b !=255) {
    	ctx.fillStyle = rgba(r,g,b, 0.4);
      ww = random(20, 50);
      ctx.fillEllipse(x, y, ww, ww);
		}
}



 function drawText (_options){
	if (_options.background === undefined) _options.background = "none";

	options = {
		fontSize: 	_options.fontSize 	|| 20,
		blockSize: 	_options.blockSize 	|| 12,
		background: _options.background,
		colourType: _options.colourType || "all"
	}

	//console.log(options);

  	this.font= options.fontSize + "px Courier";

    var col = [];
    var j = 0;

    var imgData= this.getImageData(0,0,w,h);

    for(var x = 0; x < w; x += options.blockSize) {

        for(var y = 0; y < h; y += options.blockSize) {

            var pos = (x + y * w);
            var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;
						// var brt = brightness(r, g, b, 100);

						if (options.colourType == "red") {
							var c = rgb(r, 0, 0);
						} else if (options.colourType == "green") {
							var c = rgb(0, r, 0);
						} else if (options.colourType == "blue") {
							var c = rgb(0, 0, r);
						} else {
							c = rgb(r,g,b);
						}
						col.push(c);
						//console.log(c);
        }

    }

		//console.log(col);

		if (options.background == "none") {
			ctx.background(250);
		} else {
			ctx.background(options.background);
		}


    var j = 0;
    for(var x = 0; x < w; x += options.blockSize) {

				for(var y = 0; y < h; y += options.blockSize) {

            this.fillStyle = col[j];
            this.fillText("*", x, y);
            j++;
        }
    }

}

function drawline(x,y, ww){
    var rr = random(360);
    x2 = x + random(-4,4);
    y2 = y + random(-4,4);
    ctx.translate(x2,y2);
    ctx.rotate(radians(rr));
    ctx.line(0-ww, 0-ww, 0+ww, 0+ww);
    ctx.rotate(radians(-rr));
    ctx.translate(-x2,-y2);
}

var motionArray = function(blocksize, blockshape) {
  if (blocksize == undefined) var blocksize = 20;
    var imgData=ctx.getImageData(0,0,w,h);
    ctx.clearRect(0,0,w,h);
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);
    var i = 0;
    for(var x = 0; x < w; x += blocksize)
    {
        for(var y = 0; y < h; y += blocksize)
        {
            var pos = (x + y * w);
            var b = (sourceBuffer32[pos] >> 16) & 0xff;
            var g = (sourceBuffer32[pos] >> 8) & 0xff;
            var r = (sourceBuffer32[pos] >> 0) & 0xff;

            if(Math.abs(r - oldColour[i])>sensitivity) {
                //movement[i]= 1;
                ctx.fillStyle = "red";
                ctx.fillEllipse(x,y, blocksize-2,blocksize-2);
            } else {
                movement[i] = 0;
            }

            oldColour[i] = r;
            i++;

        }
    }
}



function reverseUint32 (uint32) {
    var s32 = new Uint32Array(4);
    var s8 = new Uint8Array(s32.buffer);
    var t32 = new Uint32Array(4);
    var t8 = new Uint8Array(t32.buffer);
    reverseUint32 = function (x) {
        s32[0] = x;
        t8[0] = s8[3];
        t8[1] = s8[2];
        t8[2] = s8[1];
        t8[3] = s8[0];
        return t32[0];
    }
    return reverseUint32(uint32);
};
