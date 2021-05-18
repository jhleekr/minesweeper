/**
 * IDEV Project 'WEBStudy' - Minesweeper
 * Copyright (c) 2021 김민우, 김예린, 이종현
 * All Rights Reserved
 *
 * home.js
 * home button onclick event script
 */

function generate() {
    var xt = document.getElementById('xsize').value;
    var yt = document.getElementById('ysize').value;
    var x = parseInt(xt);
    var y = parseInt(yt);
    setUrlParams({
        'x': x,
        'y': y
    }, "game.html");
}
