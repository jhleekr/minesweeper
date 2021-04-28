// JavaScript Document
function reset() {
	setUrlParams({},"home.html");
}
var x = 0;
var y = 0;
var t = 0;
function init() {
	var params = getUrlParams();
	try {
		x = params['x'] * 1;
		y = params['y'] * 1;
	} catch (e) {
		alert('Error: '+e);
		reset();
		return;
	}
	if (!(x > 0)) {
		alert('Error: Invalid X');
		reset();
		return;
	}
	if (!(y > 0)) {
		alert('Error: Invalid Y');
		reset();
		return;
	}
	document.writeln('<table>');
	for (let a = 0; a < x; a++) {
		document.writeln('<tr>');
		for (let b = 0; b < y; b++) {
			document.writeln('<td>');
			document.writeln('<input id="x'+(a+1)+'y'+(b+1)+'" class="unknown_mine" type="button" value=" " onclick="ms.onclick_handler(this)">');
			document.writeln('</td>');
		}
		document.writeln('</tr>');
	}
	document.writeln('</table>');
	document.writeln('<input id=reset" class="button_general" type="button" value="RESET" onclick="reset()">');
}
var ms = {
	'map': [],
	'onclick_handler': function (self) {
		var xs = parseInt(self.id.split('x')[1].split('y')[0]);
		var ys = parseInt(self.id.split('y')[1]);
		if (t === 0) {
			this.map = setMine(x, y, xs, ys);
		}
		t += 1;
	}
}
init();