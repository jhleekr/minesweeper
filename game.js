// JavaScript Document
function reset() {
  setUrlParams({}, "home.html");
}
var f = false;

function onflag_handler() {
  if (f) {
    var flagbtn = document.getElementById('flag');
    flagbtn.setAttribute('value', 'FLAG');
    f = false;
  } else {
    var flagbtn = document.getElementById('flag');
    flagbtn.setAttribute('value', 'FIND');
    f = true;
  }
}
var x = 0;
var y = 0;

function init() {
  var params = getUrlParams();
  try {
    x = parseInt(params['x']);
    y = parseInt(params['y']);
  } catch (e) {
    alert('Error: ' + e);
    reset();
    return;
  }
  if (!(x > 2)) {
    alert('Error: Invalid X');
    reset();
    return;
  }
  if (!(y > 2)) {
    alert('Error: Invalid Y');
    reset();
    return;
  }
  document.writeln('<table>');
  for (let a = 0; a < x; a++) {
    document.writeln('<tr>');
    for (let b = 0; b < y; b++) {
      document.writeln('<td>');
      document.writeln('<input id="x' + (a + 1) + 'y' + (b + 1) + '" class="unknown_mine" type="button" value=" " onclick="ms.onclick_handler(this)">');
      document.writeln('</td>');
    }
    document.writeln('</tr>');
  }
  document.writeln('</table>');
  document.writeln('<input id="reset" class="button_general" type="button" value="RESET" onclick="reset()">');
  document.writeln('<input id="flag" class="button_general" type="button" value="FLAG" onclick="onflag_handler()">');
}
init();
function gameover() {
  document.writeln('game over!');
}
var ms = {
  'map': [],
  'flagmap': setMap(x, y),
  't': 0,
  'refreshview': function () {
    for (let ix = 0; ix < x; ix++) {
      for (let iy = 0; iy, y; iy++) {
        var tmpbtn = document.getElementById('x' + (ix + 1) + 'y' + (iy + 1));
        var mapdata = this.map[ix][iy];
        var classstr = "";
        //Process with tmpbtn
        switch (mapdata) {
          case -2: //not mine, not opened
          case -1: //mine, not opened
            classstr = "unknown_mine";
            break;
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8: //not mine, opened
            classstr = "not_mine";
            break;
          case -3: //mine, opened
            classstr = "exploded_mine"
            gameover();
            break;
        }
        if (this.flagmap[ix][iy] === 1 && classstr === "unknown_mine") {
          classstr = "flagged_mine";
        }
        tmpbtn.setAttribute('class', classstr);
      }
    }
  },
  'onclick_handler': function (self) {
    var xs = parseInt(self.id.split('x')[1].split('y')[0]);
    var ys = parseInt(self.id.split('y')[1]);
    if (this.t === 0) {
      this.map = setMine(x, y, xs, ys);
    } else {
		if (f) {
			flagMine(x, y, xs, ys, flagmap);	//리턴값 의미 없으므로 수정함
		} else {
      		processMine(x, y, xs, ys, map);		//마찬가지로 리턴값 없앰
		}
    }
    this.refreshview();
    this.t += 1;
  }
}

//제 함수와 호환성 맞추기 위해 수정했습니다.