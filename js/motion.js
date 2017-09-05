var old = [];
var threshold = 40;
var scalefactor = 30;

var ctx2;

function setup(){
video.width = w/scalefactor;
video.height = h/scalefactor;
vid_ctx = createHiddenCanvas("canvas2");
}

//var ctx2 = createHiddenCanvas('vid');
function motionDetection(){
  var motion = [];
  // draw the video and get its pixels
  vid_ctx.drawImage(video, 0, 0, video.width, video.height);
  var data = vid_ctx.getImageData(0, 0, video.width, video.height).data;
  // we can now loop over all the pixels of the video
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var pos = (x + y * video.width) * 4;
      var r = data[pos];
      var g = data[pos+1];
      var b = data[pos+2];
      if(old[pos] && Math.abs(old[pos].red - r) > threshold) {
        // push the x, y and rgb values into the motion array
        // but multiply the x and y values bck up by scalefactor
        // to get their actual screen position
        motion.push({x: scalefactor/2 + x * scalefactor, y: scalefactor/2 + y * scalefactor, r: r, g: g, b: b});
      }
      old[pos] = { red: r, green: g, blue: b};
}
  }

return motion;
}
