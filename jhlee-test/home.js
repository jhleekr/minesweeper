// JavaScript Document
function generate() {
	var xt = document.getElementById('xsize').value;
	var yt = document.getElementById('ysize').value;
	var x = parseInt(xt);
	var y = parseInt(yt);
	setUrlParams({'x':x,'y':y});
}