window.addEventListener("message", function (event) {

	var payload = JSON.parse(event.data);

	if (payload.operation === 'play') {

		document.getElementById('frameCurrentTrack').textContent = payload.value;

	} else {
		document.getElementById('frameCurrentTrack').textContent = '';
	}

}, false);
