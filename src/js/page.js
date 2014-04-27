(function(window) {
	var $webview,
		$log,
		$result,
		logBuffer = [],
		resultBuffer = [],
		startedAt = 0,
		url,
		urls = [],
		controlsHeight = 0;	

	window.onresize = doLayout;

	window.onload = function() {
		$webview = document.querySelector('webview');
		controlsHeight = document.querySelector('#controls').offsetHeight;

		doLayout();
	
		$log = document.querySelector('#log');
		$result = document.querySelector('#result');
	
		document.querySelector('#start').onclick = function(e) {
			e.preventDefault();
			processUrls(document.querySelector('#url').value);
		};

		document.querySelector('#clear').onclick = function(e) {
			e.preventDefault();
			url = '';
			urls = [];
			startedAt = 0;
			$log.value = '';
			$result.value = '';
		};

		$webview.addEventListener('loadstop', function (event) {
			var elapsed = window.performance.now() - started;
			log('stopped');
			addResult(elapsed);
			popQueue();
		});

		$webview.addEventListener('loadstart', function (event) {
			url = event.url;
			log('started ' + url);
			started = window.performance.now();
		});

	};

	function createWebview() {
		return $webview;
	}

	function processUrls(text) {
		text = text.trim();
		if (text) {
			urls = text.split("\n");
			popQueue();
		} else {
			alert('Please provide list of URLs to benchmark');
		}
	}

	function popQueue() {
		if (urls.length) {
			url = urls.shift();
			$webview = createWebview();
			navigateTo($webview, url);
		}
	}

	function navigateTo($webview, toUrl) {
		url = toUrl;
		$webview.src = url;
	}

	function log(text) {
		var date = new Date(),
			ts = [
				date.getHours(),
				':',
				date.getMinutes(),
				':',
				date.getSeconds(),
				'.',
				date.getMilliseconds()
			].join('');
		
		logBuffer.push(ts + ': ' + text);
		$log.value = logBuffer.join("\n");
	}

	function addResult(elapsed) {
		resultBuffer.push(url + ': ' + elapsed + 'ms');
		$result.value = resultBuffer.join("\n");
	}

	function doLayout() {
		var controls = document.querySelector('#controls'),
			controlsHeight = controls.offsetHeight,
			windowWidth = document.documentElement.clientWidth,
			windowHeight = document.documentElement.clientHeight,
			webviewWidth = windowWidth,
			webviewHeight = windowHeight - controlsHeight;

		$webview.style.width = webviewWidth + 'px';
		$webview.style.height = webviewHeight + 'px';
	}
}(window));
