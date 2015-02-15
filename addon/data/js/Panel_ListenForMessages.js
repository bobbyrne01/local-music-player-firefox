// populate panel with addon data when shown
self.port.on("uiData", function (uiData) {
	var parsed = JSON.parse(uiData);

	LocalMusicPlayer.separator = parsed.separator;

	// remove children
	while (document.getElementById("tracks").firstChild) {
		document.getElementById("tracks").removeChild(document.getElementById("tracks").firstChild);
	}

	// add selected directories to library view 
	if (parsed.dirs.length > 0) {

		// remove children first
		var element = document.getElementById('libraries');
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}

		document.getElementById('libraryRemove').disabled = false;

		// populate
		var table = document.createElement('table');
		table.id = 'directoriesTable';

		for (var i = 0; i < parsed.dirs.length; i++) {

			var row = table.insertRow(table.rows.length),
				cell0 = row.insertCell(0),
				cell1 = row.insertCell(1);

			var dirText = document.createTextNode(parsed.dirs[i]);
			cell0.appendChild(dirText);

			var checkbox = document.createElement("input");
			checkbox.setAttribute("type", "checkbox");

			cell1.appendChild(checkbox);
		}

		document.getElementById('libraries').appendChild(table);

	} else if (parsed.dirs.length === 0) {

		// remove children first
		var librariesElement = document.getElementById('libraries');
		while (librariesElement.firstChild) {
			librariesElement.removeChild(librariesElement.firstChild);
		}

		document.getElementById('libraryRemove').disabled = true;
		document.getElementById('libraries').appendChild(document.createTextNode(parsed.noDirsString));
	}

	// add music files to player view
	if (parsed.files !== undefined) {
		if (parsed.files.length > 0) {
			for (var j = 0; j < parsed.files.length; j++) {
				LocalMusicPlayer.populateRow(parsed.files[j], j);
			}
		}
	}

	document.getElementById('notificationPref').checked = parsed.notification;
	document.getElementById('recursivePref').checked = parsed.recursive;

	if (parsed.recursive) {
		self.port.emit("recursiveSetting", true);
	} else {
		self.port.emit("recursiveSetting", false);
	}

	document.getElementById('hotkeyPlayPref').value = parsed.hotkeyPlay;
	document.getElementById('hotkeyStopPref').value = parsed.hotkeyStop;
	document.getElementById('hotkeyNextPref').value = parsed.hotkeyNext;
	document.getElementById('hotkeyPrevPref').value = parsed.hotkeyPrev;
	document.getElementById('hotkeyRandomPref').value = parsed.hotkeyRandom;
	document.getElementById('hotkeyRepeatAllPref').value = parsed.hotkeyRepeatAll;

	document.getElementById('filterBy').placeholder = parsed.filterByString;
	LocalMusicPlayer.filterBy();
});

self.port.on('playTrack', function () {
	if (document.getElementById('player').paused) {
		LocalMusicPlayer.resume();
	} else {
		LocalMusicPlayer.play();
	}
});

self.port.on('updateAudioBar', function (value) {

	document.getElementById('player').currentTime = value * document.getElementById("player").duration;
});

self.port.on('pauseTrack', function () {
	LocalMusicPlayer.pause();
});

self.port.on('stopTrack', function () {
	LocalMusicPlayer.stop();
});

self.port.on('nextTrack', function () {
	LocalMusicPlayer.nextTrack();
});

self.port.on('prevTrack', function () {
	LocalMusicPlayer.prevTrack();
});

self.port.on('repeatAll', function () {
	LocalMusicPlayer.toggle('repeatAll');
});

self.port.on('random', function () {
	LocalMusicPlayer.toggle('random');
});

self.port.on('hotkeyPlayStatus', function (value) {
	if (value === true) {
		document.getElementById('hotkeyPlayPref').className = 'green';
	} else {
		document.getElementById('hotkeyPlayPref').className = 'red';
	}
});

self.port.on('hotkeyStopStatus', function (value) {
	if (value === true) {
		document.getElementById('hotkeyStopPref').className = 'green';
	} else {
		document.getElementById('hotkeyStopPref').className = 'red';
	}
});

self.port.on('hotkeyNextStatus', function (value) {
	if (value === true) {
		document.getElementById('hotkeyNextPref').className = 'green';
	} else {
		document.getElementById('hotkeyNextPref').className = 'red';
	}
});

self.port.on('hotkeyPrevStatus', function (value) {
	if (value === true) {
		document.getElementById('hotkeyPrevPref').className = 'green';
	} else {
		document.getElementById('hotkeyPrevPref').className = 'red';
	}
});

self.port.on('hotkeyRandomStatus', function (value) {
	if (value === true) {
		document.getElementById('hotkeyRandomPref').className = 'green';
	} else {
		document.getElementById('hotkeyRandomPref').className = 'red';
	}
});

self.port.on('hotkeyRepeatAllStatus', function (value) {
	if (value === true) {
		document.getElementById('hotkeyRepeatAllPref').className = 'green';
	} else {
		document.getElementById('hotkeyRepeatAllPref').className = 'red';
	}
});