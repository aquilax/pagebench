var webview;
var ta_log;
var loga = [];

onload = function() {
	webview = document.querySelector('webview');
	ta_log = document.querySelector('#log');
	document.querySelector('#url-form').onsubmit = function(e) {
		e.preventDefault();
		navigateTo(document.querySelector('#url').value);
	};

	webview.addEventListener('loadstop', function (event) {
		log('stopped');
	});

	webview.addEventListener('loadstart', function (event) {
		log('started');
	});

};

function navigateTo(url) {
	webview.src = url;
}

function log(text) {
	loga.push(new Date() + ' ' + text);
	ta_log.value = loga.join("\n");
}
