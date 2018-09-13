var DEVICE_SCALE = 1.2;

function setScreen() {

  if (window.location.hash) {

    var screen_name = window.location.hash.substr(1).toLowerCase();
    console.log('screen: ', screen_name);
    if (screen_name == "central") {
      //widescreen - 2112x608
      DEVICE_SCALE = 1.2;
      setCanvas(ctx, 2112, 608);
      setCanvas(ctx2, 2112, 608);

      my_sticky = 80;
    } else if (screen_name == "leidseplein") {
      // 1632x608
      DEVICE_SCALE = 1.;
      setCanvas(ctx, 1632, 608);
      setCanvas(ctx2, 1632, 608);

      my_sticky = 100;
    } else if (screen_name == "wtc") {
      // 768x384
      console.log("-- wtc");
      DEVICE_SCALE = 0.6;
      setCanvas(ctx, 768, 384);
      setCanvas(ctx2, 768, 384);

      my_sticky = 100;

    } else {
      location.hash = "#default";
      my_sticky = 50;
      //DEVICE_SCALE = 1.2;
      // normal

    }
  }
}

function setCanvas(_ctx, _w, _h) {
  //console.log(w);
  var c = document.getElementsByTagName('canvas');
  width = w = _w / DEVICE_SCALE;
  height = h = _h / DEVICE_SCALE;
  console.log("DEVICE_SCALE", DEVICE_SCALE);
  console.log("w", w);
  for (var i = 0; i < c.length; i++) {
    c[i].width = width;
    c[i].height = height;
  }
  _ctx.width = w;
  _ctx.height = h;
  _ctx.canvas.width = w;
  _ctx.canvas.height = h;
  console.log("resize: " + w + ":" + h);
  $('#canvas1').css({
    width: w + "px"
  });
  $('#canvas1').css({
    height: h + "px"
  });
  $('#canvas2').css({
    width: w + "px"
  });
  $('#canvas2').css({
    height: h + "px"
  });
}
