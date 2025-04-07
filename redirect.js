/**
 * IDEV Project 'WEBStudy' - Minesweeper
 * Copyright (c) 2021 김민우, 김예린, 이종현
 * All Rights Reserved
 *
 * redirect.js
 * functions for redirect with url parameters
 */

function setUrlParams(params, url) {
  var newURL = window.location.protocol + "//" + window.location.host + "/";
  if (Object.keys(params).length === 0) {
    window.location.href = newURL + url;
    return;
  }
  var resstr = "";
  var i = 0;
  for (const param in params) {
    var paramd = params[param];
    resstr += param + "=" + paramd;
    if (i != Object.keys(params).length - 1) {
      resstr += "&";
    }
    i += 1;
  }
  window.location.href = newURL + url + "?" + resstr;
}

function getUrlParams() {
  var params = {};
  window.location.search.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (str, key, value) {
      params[key] = value;
    },
  );
  return params;
}
