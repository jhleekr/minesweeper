/**
 * IDEV Project 'WEBStudy' - Minesweeper
 * Copyright (c) 2021 김민우, 김예린, 이종현
 * All Rights Reserved
 *
 * game.js
 * visualising minesweeper data
 */

function reset() {
    setUrlParams({}, 'home.html');
}
var f = false;
var shift = false;

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
var d = 0;
var e = 0;

window.onkeyup = function (e) {
    if (e.keyCode == 16) {
        shift = false;
    }
};
window.onkeydown = function (e) {
    if (e.keyCode == 16) {
        shift = true;
    }
};

function init() {
    var params = getUrlParams();
    try {
        x = parseInt(params['x']);
        y = parseInt(params['y']);
        d = parseInt(params['d']);
        e = parseInt(params['e']);
    } catch (e) {
        alert('Error: ' + e);
        x = 10;
        y = 10;
        d = 0;
        e = 0;
    }
    if (!(x > 3)) {
        alert('Error: Invalid X');
        x = 10;
        y = 10;
        d = 0;
        e = 0;
    }
    if (!(y > 3)) {
        alert('Error: Invalid Y');
        x = 10;
        y = 10;
        d = 0;
        e = 0;
    }
    if (!(0 <= d) || !(d <= 3)) {
        alert('Error: Invalid Difficulty');
        x = 10;
        y = 10;
        d = 0;
        e = 0;
    }
    if (!(0 <= e) || !(e <= 1)) {
        alert('Error: Invalid Mode');
        x = 10;
        y = 10;
        d = 0;
        e = 0;
    }
    document.writeln('<table id="mstable">');
    for (let a = 0; a < x; a++) {
        document.writeln('<tr>');
        for (let b = 0; b < y; b++) {
            document.writeln('<td>');
            document.writeln(
                '<input id="x' +
                    (a + 1) +
                    'y' +
                    (b + 1) +
                    '" class="unknown_mine" type="button" value=" " onclick="ms.onclick_handler(this)">'
            );
            document.writeln('</td>');
        }
        document.writeln('</tr>');
    }
    document.writeln('</table>');
    document.writeln('<div class="control">');
    document.writeln('<div class="controlbtn">');
    document.writeln(
        '<input id="reset" class="button_general" type="button" value="RESET" onclick="reset()">'
    );
    document.writeln(
        '<input id="flag" class="button_general" type="button" value="FLAG" onclick="onflag_handler()">'
    );
    document.writeln('</div>');
    var ds = '';
    switch (d) {
        case 0:
            ds = 'easy';
            break;
        case 1:
            ds = 'normal';
            break;
        case 2:
            ds = 'hard';
            break;
        case 3:
            ds = 'hell';
            break;
        default:
            ds = 'error';
            break;
    }
    document.writeln('<p id="dif">' + ds + '</p>');
    document.writeln('<p id="scoreboard"></p>');
    document.writeln('<p id="time"></p>');
    document.writeln('</div>');
    document.writeln('<div id="popup" class="layer">');
    document.writeln('<div id="result" class="result"></div>');
    document.writeln('<div class="dimmed"></div>');
    document.writeln('</div>');
    document.getElementById('popup').style.visibility = 'hidden';
}
init();
var time = 0;
var min = '';
var sec = '';

function timerinit() {
    var x = setInterval(function () {
        min = parseInt(time / 60);
        sec = time % 60;
        document.getElementById('time').innerText = min + 'm ' + sec + 's';
        time++;
    }, 1000);
    return x;
}
for (let a = 0; a < x; a++) {
    for (let b = 0; b < y; b++) {
        document
            .getElementById('x' + (a + 1) + 'y' + (b + 1))
            .addEventListener('auxclick', function () {
                ms.onrclick_handler(this);
            });
    }
}
var over = 0;

function genres() {
    var jbBtn = document.createElement('input');
    var a = document.createAttribute('type');
    a.value = 'button';
    jbBtn.setAttributeNode(a);
    var b = document.createAttribute('onclick');
    b.value = 'location.reload()';
    jbBtn.setAttributeNode(b);
    var c = document.createAttribute('value');
    c.value = 'RESTART';
    jbBtn.setAttributeNode(c);
    var d = document.createAttribute('id');
    d.value = 'restart';
    jbBtn.setAttributeNode(d);
    var e = document.createAttribute('class');
    e.value = 'button_general';
    jbBtn.setAttributeNode(e);
    document.getElementById('result').appendChild(jbBtn);
}

function gameover() {
    var tb = document.createElement('p');
    var b = document.createAttribute('id');
    b.value = 'restxt';
    tb.setAttributeNode(b);
    tb.append('GAME OVER!');
    document.getElementById('result').appendChild(tb);
    genres();
    document.getElementById('popup').style.visibility = 'visible';
    over = 1;
}

function gamedone() {
    var tb = document.createElement('p');
    var b = document.createAttribute('id');
    b.value = 'restxt';
    tb.setAttributeNode(b);
    tb.append('CONGRATULATIONS!');
    document.getElementById('result').appendChild(tb);
    genres();
    document.getElementById('popup').style.visibility = 'visible';
    over = 1;
}
var ms = {
    map: [],
    flagmap: setMap(x, y),
    t: 0,
    rf: 0,
    setscore: function (sc) {
        var element = document.getElementById('scoreboard');
        element.innerText = 'Mines left: ' + sc;
    },
    refreshview: function () {
        var left = 0;
        var realleft = 0;
        var gm = 0;
        for (let ix = 0; ix < x; ix++) {
            for (let iy = 0; iy < y; iy++) {
                var tmpbtn = document.getElementById(
                    'x' + (ix + 1) + 'y' + (iy + 1)
                );
                var mapdata = this.map[ix][iy];
                var classstr = '';
                var valuestr = ' ';
                //Process with tmpbtn
                switch (mapdata) {
                    case -1: //mine, not opened
                        left += 1;
                        classstr = 'unknown_mine';
                        break;
                    case -2: //not mine, not opened
                        classstr = 'unknown_mine';
                        realleft = 1;
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
                        classstr = 'not_mine';
                        break;
                    case -3: //mine, opened
                        classstr = 'exploded_mine';
                        left += 1;
                        gm = 1;
                        break;
                }
                if (classstr === 'not_mine' && mapdata != 0) {
                    valuestr = mapdata + '';
                    classstr = classstr + '_' + mapdata;
                }
                if (
                    this.flagmap[ix][iy] === 1 &&
                    classstr === 'unknown_mine' &&
                    this.rf === 0
                ) {
                    classstr = 'flagged_mine';
                    left -= 1;
                }
                tmpbtn.setAttribute('class', classstr);
                tmpbtn.setAttribute('value', valuestr);
            }
        }
        if (this.rf === 0) {
            this.setscore(left);
        }
        if (realleft === 0 && this.rf === 0) {
            gamedone();
            clearInterval(this.timer);
            showMine(x, y, this.map);
            this.rf = 1;
            this.refreshview();
        }
        if (gm === 1 && this.rf === 0) {
            gameover();
            clearInterval(this.timer);
            showMine(x, y, this.map);
            this.rf = 1;
            this.refreshview();
        }
    },
    onclick_handler: function (self) {
        if (over === 1) {
            return;
        }
        if (shift) {
            this.onrclick_handler(self);
            return;
        }
        var xs = parseInt(self.id.split('x')[1].split('y')[0]);
        var ys = parseInt(self.id.split('y')[1]);
        if (this.t === 0) {
            this.map = setMine(x, y, xs - 1, ys - 1, d, e);
            this.timer = timerinit();
        } else {
            if (f) {
                flagMine(x, y, xs - 1, ys - 1, this.flagmap); //리턴값 의미 없으므로 수정함
            } else {
                if (
                    !(this.flagmap[xs - 1][ys - 1] === 1) ||
                    this.map[xs - 1][ys - 1] >= 0
                ) {
                    processMine(
                        x,
                        y,
                        xs - 1,
                        ys - 1,
                        this.map,
                        this.flagmap,
                        true
                    ); //마찬가지로 리턴값 없앰
                }
            }
        }
        this.refreshview();
        this.t = 1;
    },
    onrclick_handler: function (self) {
        if (over === 1) {
            return;
        }
        if (this.t != 1) {
            return;
        }
        var xs = parseInt(self.id.split('x')[1].split('y')[0]);
        var ys = parseInt(self.id.split('y')[1]);
        flagMine(x, y, xs - 1, ys - 1, this.flagmap); //리턴값 의미 없으므로 수정함
        this.refreshview();
    },
};
