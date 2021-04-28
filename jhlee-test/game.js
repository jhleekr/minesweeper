// JavaScript Document
function init() {
	var params = getUrlParams();
	try {
		var x = parseInt(params['x']);
		var y = parseInt(params['y']);
	} catch (e) {
		document.write('Error');
		return;
	}
	document.writeln('<table>');
	for (let a = 0; a < x; a++) {
		document.writeln('<tr>');
		for (let b = 0; b < y; b++) {
			document.writeln('<td>');
			document.writeln('<input type="button" value=" " onclick="">');
			document.writeln('</td>');
		}
		document.writeln('</tr>');
	}
	document.writeln('</table>');
}
init();