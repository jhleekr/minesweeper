// JavaScript Document
function setUrlParams(params) {
	window.location.href = 'http://www.abc.com/';
}
function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
}