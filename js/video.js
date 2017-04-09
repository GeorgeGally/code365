
var video;
var vid_ctx;
var showBgImg = false;
var showVideo = false;

document.addEventListener("DOMContentLoaded", function() {
  vid_ctx = createHiddenCanvas("hidden_canvas");
  video = document.createElement('video');
  document.body.appendChild(video);

  video.autoplay  = true;
  video.loop  = true;
  video.setAttribute("id", "videoOutput");
  video.setAttribute("style", "display:none;");
  video.width = 320;
  video.height = 240;


  // check if browser supports getUserMedia - yes we are looking at you Safari!
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

  if (navigator.getUserMedia) {

      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
        return;
      }

      // List cameras and microphones.

      navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        gotSources(devices);
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });

  }

//CHOOSE WHICH CAMERA TO USE

function setupCamera(cameras){

  //console.log(cameras)

  //var videoSource = cameras[cameras.length-1].id;
  var videoSource = cameras[0].id;

  var constraints = {
    // audio: {
    //   optional: [{
    //     sourceId: audioSource
    //   }]
    // },
    video: {
      optional: [{
        sourceId: videoSource
      }]
    }
  }

  navigator.getUserMedia(constraints, successCallback, errorCallback);

}

function successCallback(stream) {


      if (video.mozCaptureStream) {
          video.mozSrcObject = stream;
      } else {
        video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
      }
        video.play();
}

function errorCallback(error) {
  alert('Unable to get webcam stream.');
}


// hacky loop to make sure video is streaming

video.addEventListener('loadeddata', function() {
  var attempts = 50;
  function checkVideo() {

    if (attempts > 0) {

      if (video.videoWidth > 0 && video.videoHeight > 0) {

          video.available = true;

      } else {

        // Wait a bit and try again
        window.setTimeout(checkVideo, 100);

      }


    } else {

      // Give up after 10 attempts
      alert('Unable to play video stream. Is webcam working?');

    }

      attempts--;

  }

  checkVideo();

  }, false);


  function gotSources(devices) {

    var cameras = [];

    devices.forEach(function(device) {

        // console.log(device.kind + ": " + device.label + " id = " + device.deviceId);

        if (device.kind === 'videoinput') {
          //console.log(device.deviceId);
          cameras.push(device);
        }

    })

    setupCamera(cameras);

  };

})

function readVideo(_samplesize){
  var samplesize = _samplesize | 20;
  vid_ctx.drawImage(video, 0, 0, w, h);
  var imgData = vid_ctx.getImageData(0, 0, w, h);
  var data = []
    var sourceBuffer32 = new Uint32Array(imgData.data.buffer);

    for(var x = 0; x < w; x += samplesize) {

        for(var y = 0; y < h; y += samplesize){

          var pos = (x + y * w);
          var b = (sourceBuffer32[pos] >> 16) & 0xff;
          var g = (sourceBuffer32[pos] >> 8) & 0xff;
          var r = (sourceBuffer32[pos] >> 0) & 0xff;

          data.push({red: r, green: g, blue: b, brightness: brightness(r, g, b)});

        }
    }

    return data;
}
