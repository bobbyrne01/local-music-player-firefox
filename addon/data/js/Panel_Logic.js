var LocalMusicPlayer = {
	separator: null,
	currentSongRow: null,
	playStyle: 'one',

	initEventListeners: function () {

		document.getElementById("player").onplay = function () {
			if (LocalMusicPlayer.currentSongRow === null) {

				if (document.getElementById('tracks').rows[0]) {
					if (document.querySelectorAll('#tracks tr.showRow ~ tr').length > 0) {
						LocalMusicPlayer.currentSongRow = document.getElementById('tracks').rows.length - 1 - document.querySelectorAll('#tracks tr.showRow ~ tr').length;
						LocalMusicPlayer.play(
							document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML,
							document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML);

						LocalMusicPlayer.resetUnderline();
						document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].style.textDecoration = 'underline';
					}
				}
			} else {
				if (document.getElementById('tracks').rows[0]) {
					if (document.querySelectorAll('#tracks tr.showRow ~ tr').length > 0) {
						self.port.emit('resume', '');
					}
				}
			}
		};
		document.getElementById("player").onpause = function () {
			if (LocalMusicPlayer.currentSongRow !== null) {

				if (document.getElementById('tracks').rows[0]) {
					if (document.querySelectorAll('#tracks tr.showRow ~ tr').length > 0) {
						self.port.emit('pause', '');
					}
				}
			}
		};
		document.getElementById("player").ontimeupdate = function () {
			self.port.emit(
				'updateProgressBar',
				document.getElementById("player").currentTime /
				document.getElementById("player").duration);
		};
		document.getElementById('stopTrack').addEventListener('click', LocalMusicPlayer.stop);
		document.getElementById('prevTrack').addEventListener('click', LocalMusicPlayer.prevTrack);
		document.getElementById('nextTrack').addEventListener('click', LocalMusicPlayer.nextTrack);
		document.getElementById('repeatAll').addEventListener('click', function () {
			LocalMusicPlayer.toggle(this.id);
		});
		document.getElementById('random').addEventListener('click', function () {
			LocalMusicPlayer.toggle(this.id);
		});
		document.getElementById('libraryShow').addEventListener('click', function () {
			LocalMusicPlayer.toggleView(this);
		});
		document.getElementById('tumblrTrack').addEventListener('click', LocalMusicPlayer.tumblrTrack);
		document.getElementById('tweetTrack').addEventListener('click', LocalMusicPlayer.tweetTrack);
		document.getElementById('libraryAdd').addEventListener('click', LocalMusicPlayer.selectDir);
		document.getElementById('libraryRemove').addEventListener('click', LocalMusicPlayer.removeDirs);
		document.getElementById('libraryBack').addEventListener('click', function () {
			LocalMusicPlayer.toggleView(this);
		});
		document.getElementById('settingsShow').addEventListener('click', function () {
			LocalMusicPlayer.toggleView(this);
		});
		document.getElementById('settingsBack').addEventListener('click', function () {
			LocalMusicPlayer.toggleView(this);
		});
		document.getElementById('notificationPref').addEventListener("change", function (event) {
			if (document.getElementById('notificationPref').checked) {
				self.port.emit("notificationSetting", true);
			} else {
				self.port.emit("notificationSetting", false);
			}
		}, false);
		document.getElementById('recursivePref').addEventListener("change", function (event) {
			if (document.getElementById('recursivePref').checked) {
				self.port.emit("recursiveSetting", true);
			} else {
				self.port.emit("recursiveSetting", false);
			}
		}, false);
		document.getElementById('filterBy').onkeyup = function (event) {
			LocalMusicPlayer.filterBy();
		};
		document.getElementById('hotkeyPlayPref').onkeyup = function (event) {
			self.port.emit("updateHotkeyPlay", this.value);
		};
		document.getElementById('hotkeyStopPref').onkeyup = function (event) {
			self.port.emit("updateHotkeyStop", this.value);
		};
		document.getElementById('hotkeyNextPref').onkeyup = function (event) {
			self.port.emit("updateHotkeyNext", this.value);
		};
		document.getElementById('hotkeyPrevPref').onkeyup = function (event) {
			self.port.emit("updateHotkeyPrev", this.value);
		};
	},
	selectDir: function () {
		self.port.emit("selectDir", '');
	},
	play: function (dir, filename) {

		if (document.getElementById('tracks').rows[0]) {
			document.getElementById('player').src = 'file://' + dir + LocalMusicPlayer.separator + filename;
			document.getElementById('player').play();

			document.getElementById('currentTrack').textContent = filename;

			if (document.getElementById('notificationPref').checked) {
				self.port.emit("play", filename); // for notification
			}
		}
	},
	resume: function () {
		document.getElementById('player').play();
	},
	pause: function () {
		document.getElementById('player').pause();
		self.port.emit("pause", '');
	},
	stop: function () {
		if (LocalMusicPlayer.currentSongRow !== null) {
			document.getElementById('currentTrack').textContent = '';
			LocalMusicPlayer.currentSongRow = null;
			document.getElementById('player').src = '';
			LocalMusicPlayer.resetUnderline();

			self.port.emit('stop', '');
		}
	},
	prevTrack: function () {
		if (document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow - 1]) {
			LocalMusicPlayer.currentSongRow--;
			LocalMusicPlayer.play(
				document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML,
				document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML);

			LocalMusicPlayer.resetUnderline();
			document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].style.textDecoration = 'underline';
		}
	},
	nextTrack: function () {

		if (LocalMusicPlayer.playStyle === 'random') {
			LocalMusicPlayer.random();

		} else {

			if (LocalMusicPlayer.currentSongRow !== null) {

				if (document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow + 1]) {
					LocalMusicPlayer.currentSongRow++;
					LocalMusicPlayer.play(
						document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML,
						document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML);

					LocalMusicPlayer.resetUnderline();
					document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].style.textDecoration = 'underline';

				} else {

					if (document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow] !== undefined) {

						LocalMusicPlayer.currentSongRow = 0;
						LocalMusicPlayer.play(
							document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML,
							document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML);

						LocalMusicPlayer.resetUnderline();
						document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].style.textDecoration = 'underline';
					}
				}
			}
		}
	},
	random: function () {

		if (LocalMusicPlayer.currentSongRow !== null) {

			var randomTrackNum = Math.floor((Math.random() * document.getElementById('tracks').rows.length));

			while (randomTrackNum == LocalMusicPlayer.currentSongRow) {

				randomTrackNum = Math.floor((Math.random() * document.getElementById('tracks').rows.length));
			}

			if (document.getElementById('tracks').rows[randomTrackNum]) {
				LocalMusicPlayer.currentSongRow = randomTrackNum;
				LocalMusicPlayer.play(
					document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML,
					document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML);

				LocalMusicPlayer.resetUnderline();
				document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].style.textDecoration = 'underline';
			}
		}
	},
	toggle: function (id) {

		if (id === 'repeatAll') {

			if (id === LocalMusicPlayer.playStyle) {
				document.getElementById('repeatAll').style.backgroundColor = '';
				document.getElementById('random').style.backgroundColor = '';
				LocalMusicPlayer.playStyle = 'one';
				document.getElementById('player').removeEventListener('ended', LocalMusicPlayer.songEnded);

				self.port.emit('repeatAll', false);
			} else {
				document.getElementById('repeatAll').style.backgroundColor = '#B2B2B2';
				document.getElementById('random').style.backgroundColor = '';
				LocalMusicPlayer.playStyle = 'repeatAll';
				document.getElementById('player').addEventListener('ended', LocalMusicPlayer.songEnded);

				self.port.emit('repeatAll', true);
			}

		} else if (id === 'random') {

			if (id === LocalMusicPlayer.playStyle) {
				document.getElementById('repeatAll').style.backgroundColor = '';
				document.getElementById('random').style.backgroundColor = '';
				LocalMusicPlayer.playStyle = 'one';
				document.getElementById('player').removeEventListener('ended', LocalMusicPlayer.songEnded);

				self.port.emit('random', false);
			} else {
				document.getElementById('repeatAll').style.backgroundColor = '';
				document.getElementById('random').style.backgroundColor = '#B2B2B2';
				LocalMusicPlayer.playStyle = 'random';
				document.getElementById('player').addEventListener('ended', LocalMusicPlayer.songEnded);

				self.port.emit('random', true);
			}
		}
	},
	songEnded: function () {

		if (LocalMusicPlayer.playStyle === 'repeatAll') {
			LocalMusicPlayer.nextTrack();
		} else if (LocalMusicPlayer.playStyle === 'random') {
			LocalMusicPlayer.random();
		}
	},
	tumblrTrack: function () {
		if (LocalMusicPlayer.currentSongRow !== null) {
			var url = 'http://www.tumblr.com/share/link?url=https://addons.mozilla.org/firefox/addon/local-music-player&name=' +
				encodeURIComponent('Listening to "' + document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML + '"') +
				'&description=' +
				encodeURIComponent('Using a Firefox addon called "Local Music Player", check it out.');

			self.port.emit("socialMedia", url);
		}
	},
	tweetTrack: function () {
		if (LocalMusicPlayer.currentSongRow !== null) {
			var url = 'https://twitter.com/intent/tweet?hashtags=LocalMusicPlayer&text=' +
				encodeURIComponent('Listening to "' + document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML + '"');

			self.port.emit("socialMedia", url);
		}
	},
	populateRow: function (song, iteration) {
		var table = document.getElementById("tracks"),
			row = table.insertRow(table.rows.length),
			cell0 = row.insertCell(0),
			cell1 = row.insertCell(1),
			cell2 = row.insertCell(2);

		var dirText = document.createTextNode(song.dir);
		cell0.appendChild(dirText);
		cell0.className = 'hide';

		var filenameText = document.createTextNode(song.filename);
		cell1.appendChild(filenameText);

		var img = document.createElement('img');
		img.src = "../images/play-24.png";

		img.addEventListener('click', function (event) {

			LocalMusicPlayer.currentSongRow = iteration;
			LocalMusicPlayer.play(song.dir, song.filename);

			LocalMusicPlayer.resetUnderline();
			document.getElementById('tracks').rows[iteration].style.textDecoration = 'underline';

		}, false);

		cell2.appendChild(img);
	},
	resetUnderline: function () {

		for (var j = 0; j < document.getElementById('tracks').rows.length; j++) {

			document.getElementById('tracks').rows[j].style.textDecoration = '';
		}
	},
	toggleView: function (obj) {
		if (obj.id === 'libraryShow') {

			document.getElementById('playerView').className = 'hide';
			document.getElementById('libraryView').className = 'inline';

		} else if (obj.id === 'libraryBack') {

			document.getElementById('libraryView').className = 'hide';
			document.getElementById('playerView').className = 'inline';

		} else if (obj.id === 'settingsShow') {

			document.getElementById('playerView').className = 'hide';
			document.getElementById('settingsView').className = 'inline';

		} else if (obj.id === 'settingsBack') {

			document.getElementById('settingsView').className = 'hide';
			document.getElementById('playerView').className = 'inline';
		}
	},
	removeDirs: function () {

		var dirsToRemove = [];

		for (var j = 0; j < document.getElementById('directoriesTable').rows.length; j++) {

			if (document.getElementById('directoriesTable').rows[j].cells[1].firstChild.checked) {

				dirsToRemove.push(document.getElementById('directoriesTable').rows[j].cells[0].innerHTML);
			}
		}

		if (dirsToRemove.length > 0) {
			self.port.emit("dirsToRemove", dirsToRemove);
		}
	},
	filterBy: function () {

		for (var o = 0; o < document.getElementById('tracks').rows.length; o++) {
			document.getElementById('tracks').rows[o].className = 'showRow';
		}

		for (var l = 0; l < document.getElementById('tracks').rows.length; l++) {
			if (document.getElementById('tracks').rows[l].cells[1].textContent.toLowerCase().indexOf(document.getElementById('filterBy').value.toLowerCase()) < 0) {

				document.getElementById('tracks').rows[l].className = 'hide';
			}
		}
	}
};

LocalMusicPlayer.initEventListeners();
