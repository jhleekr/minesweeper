// JavaScript Document
function setUrlParams(params) {
	var newURL = window.location.protocol + "//" + window.location.host + "/";
	var resstr = "";
	var i = 0;
	for(const param in params){
		var paramd = params[param];
		resstr += param+"="+paramd;
		if (i != Object.keys(params).length - 1) {
			resstr += "&";
		}
		i += 1;
	}
	window.location.href = newURL+"jhlee-test/game.html?"+resstr;
}
function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
}