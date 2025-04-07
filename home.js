/**
 * IDEV Project 'WEBStudy' - Minesweeper
 * Copyright (c) 2021 김민우, 김예린, 이종현
 * All Rights Reserved
 *
 * home.js
 * home button onclick event script
 */

function generate() {
  var xt = document.getElementById("xsize").value;
  var yt = document.getElementById("ysize").value;
  var df = document.getElementById("difficulty").value;
  var em = document.getElementById("mode").checked;
  var d = 0;
  switch (df) {
    case "easy":
      d = 0;
      break;
    case "normal":
      d = 1;
      break;
    case "hard":
      d = 2;
      break;
    case "hell":
      d = 3;
      break;
    default:
      alert("invalid difficulty");
      return;
  }
  var x = parseInt(xt);
  var y = parseInt(yt);
  var e = 0;
  if (em) {
    e = 1;
  }
  setUrlParams(
    {
      x: x,
      y: y,
      d: d,
      e: e,
    },
    "game.html",
  );
}
