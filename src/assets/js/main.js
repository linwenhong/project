window.onload = function() {
	var _winwidth = document.body.clientWidth;
	document.getElementsByTagName("html")[0].setAttribute('style', 'font-size:' + _winwidth / 160 * 7 + "px");

	window.onresize = function() {
		var _winwidth = document.body.clientWidth;
		document.getElementsByTagName("html")[0].setAttribute('style', 'font-size:' + _winwidth / 160 * 7 + "px")
	}
}