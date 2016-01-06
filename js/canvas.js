var w = width = window.innerWidth;
var h = height = window.innerHeight;

function createCanvas(canvas_name){
	var canvas = document.createElement('canvas');
	var body = document.querySelector('body');
	canvas.setAttribute("id", canvas_name);
	body.appendChild(canvas);
	var ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	return ctx;
}