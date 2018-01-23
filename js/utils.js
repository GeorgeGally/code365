




// date utils

function getDayOfWeek(_date){
var d = new Date(_date);
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

return weekday[d.getDay()];
}

function getTime(dt){
  var date = new Date(dt);
  var hour = date.getHours();
  var min = date.getMinutes();
  if (hour < 10) hour = "0" + hour;
	if (min < 10) min = "0" + min;
  return hour + min;
}



function getDate(dt, clock){

  var clock = clock || false;
	var date = new Date(dt);
	var day = date.getDate();
  var day_name = getDay(date);
	var monthIndex = date.getMonth();
	var month = monthNames[monthIndex];
	var hour = date.getHours();
	var min = date.getMinutes();
	if (hour > 23) hour -= 24;
	if (hour < 10) hour = "0" + hour;
	if (min < 10) min = "0" + min;
  if (clock) {
    if (hour > 12) {
      hour -= 12;
      return day_name + " " + day + " " + month + ", " + hour + ":" + min + "pm";
    } else {
      return day_name + " " + day + " " + month + ", " + hour + ":" + min + "am";
    }

  } else {
    return day + " " + month + ", " + hour + ":" + min
  }

}

function getDay(d){
  var weekday = [];
  weekday[0] =  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[d.getDay()];
}


function isDay(dt){

	var date = new Date(dt)
	var day = date.getDate();

	var hour = date.getHours();
  // console.log(dt);
  // console.log(hour);
  return (hour >= 5 && hour < 19);

}

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];



// text utilities

function addZero(d){
  if (d < 10) {
    return "0" + d;
  } else {
    return d;
  }
}


///// ARRAY


function shuffle(a, ammt) {
 if (ammt = undefined) ammt = a.length;
    var j, x, i;
    for (i = ammt; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}




//// CLASS HELPERS

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}



/////// 3D



function xyz(px, py, pz, pitch, roll, yaw) {

    var cosa = Math.cos(yaw);
    var sina = Math.sin(yaw);

    var cosb = Math.cos(pitch);
    var sinb = Math.sin(pitch);

    var cosc = Math.cos(roll);
    var sinc = Math.sin(roll);

    var Axx = cosa*cosb;
    var Axy = cosa*sinb*sinc - sina*cosc;
    var Axz = cosa*sinb*cosc + sina*sinc;

    var Ayx = sina*cosb;
    var Ayy = sina*sinb*sinc + cosa*cosc;
    var Ayz = sina*sinb*cosc - cosa*sinc;

    var Azx = -sinb;
    var Azy = cosb*sinc;
    var Azz = cosb*cosc;

    x = Axx*px + Axy*py + Axz*pz;
    y = Ayx*px + Ayy*py + Ayz*pz;
    z = Azx*px + Azy*py + Azz*pz;

    return {x:x, y:y, z:z};
}



///////////////// IMAGE UTILITIES

function ScaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {

    var result = { width: 0, height: 0, fScaleToTargetWidth: true };

    if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
        return result;
    }

    // scale to the target width
    var scaleX1 = targetwidth;
    var scaleY1 = (srcheight * targetwidth) / srcwidth;

    // scale to the target height
    var scaleX2 = (srcwidth * targetheight) / srcheight;
    var scaleY2 = targetheight;

    // now figure out which one we should use
    var fScaleOnWidth = (scaleX2 > targetwidth);
    if (fScaleOnWidth) {
        fScaleOnWidth = fLetterBox;
    }
    else {
       fScaleOnWidth = !fLetterBox;
    }

    if (fScaleOnWidth) {
        result.width = Math.floor(scaleX1);
        result.height = Math.floor(scaleY1);
        result.fScaleToTargetWidth = true;
    }
    else {
        result.width = Math.floor(scaleX2);
        result.height = Math.floor(scaleY2);
        result.fScaleToTargetWidth = false;
    }
    result.targetleft = Math.floor((targetwidth - result.width) / 2);
    result.targettop = Math.floor((targetheight - result.height) / 2);

    return result;
}
