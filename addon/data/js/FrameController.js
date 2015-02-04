window.addEventListener("message", function (event) {

	var payload = JSON.parse(event.data);

	if (payload.operation === 'play') {

		document.getElementById('frameCurrentTrack').textContent = payload.value;

	} else if (payload.operation === 'updateProgressBar') {

		document.getElementById('frameProgressBar').value = payload.value;
	} else {

		document.getElementById('frameCurrentTrack').textContent = '';
	}

}, false);

document.getElementById('frameProgressBar').addEventListener('click', function (e) {

	var x = e.pageX - this.offsetLeft,
		y = e.pageY - this.offsetTop,
		clickedValue = x * this.max / this.offsetWidth;

	var payload = JSON.stringify({
		operation: 'updateAudioBar',
		value: clickedValue
	});

	window.parent.postMessage(payload, "*");
});
