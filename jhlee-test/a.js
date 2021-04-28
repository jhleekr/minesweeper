// JavaScript Document
var a = {
	'change': function(opt) {
		if (opt === 0) {
			document.querySelector('body').style.backgroundColor = 'white';
			document.querySelector('body').style.color = 'black';
		}
		if (opt === 1) {
			document.querySelector('body').style.backgroundColor = 'black';
			document.querySelector('body').style.color = 'white';
		}
	},
	'generate': function(self) {
		var jbBtn = document.createElement( 'input' );
		var a = document.createAttribute('type');
		a.value = "button";
		jbBtn.setAttributeNode(a);
		var b = document.createAttribute('onclick');
		b.value = "a.generate()";
		jbBtn.setAttributeNode(b);
		var c = document.createAttribute('value');
		c.value = "this is button";
		jbBtn.setAttributeNode(c);
		document.body.appendChild( jbBtn );
		//document.write('<input type="button" value="generate" onclick="a.generate()">');
	}
}
var ms = {
	'generate': function() {
		var xt = document.getElementById('xsize').value;
		var yt = document.getElementById('ysize').value;
		console.log('xt is '+xt+', yt is '+yt)
		var x = parseInt(xt);
		var y = parseInt(yt);
		console.log('x is '+x+', y is '+y)
		document.writeln('<table>');
		for (let a = 0; a < x; a++) {
			document.writeln('<tr>');
			for (let b = 0; b < y; b++) {
				document.writeln('<td>');
				document.writeln('<input type="button" value=" " onclick="a.generate()">');
				document.writeln('</td>');
			}
			document.writeln('</tr>');
		}
		document.writeln('</table>');
	}
}