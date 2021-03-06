var Panel = require("sdk/panel"),
	Data = require("./Data"),
	Button = require("./ToggleButton"),
	Notification = require("./Notification"),
	Chrome = require("./Chrome"),
	FileIO = require("./FileIO"),
	System = require("./System"),
	Tabs = require("./Tabs"),
	SimpleStorage = require("./SimpleStorage"),
	Preference = require("./Preference"),
	Localisation = require("./Localisation"),
	Hotkey = require("./Hotkey"),
	Toolbar = require("./Toolbar"),
	panel,
	separator,
	files;

exports.init = function () {

	if (System.getPlatform().indexOf('win') >= 0) {
		separator = '\\';
	} else {
		separator = '/';
	}

	if (typeof SimpleStorage.getDirectories() === 'undefined') {
		SimpleStorage.setDirectories([]);
	}

	// get list of songs when firefox starts
	files = FileIO.list(SimpleStorage.getDirectories());

	panel = Panel.Panel({
		width: 650,
		height: 500,
		contentURL: Data.get("html/PanelView.html"),
		contentScriptFile: [
			Data.get("js/Panel_Logic.js"),
			Data.get("js/Panel_ListenForMessages.js")
		],
		position: Button.get(),
		onShow: function () {
			populateUI();
		},
		onHide: function () {
			Button.get().state('window', {
				checked: false
			});
		}
	});

	panel.port.on("selectDir", function () {
		Chrome.selectDir();
		files = FileIO.list(SimpleStorage.getDirectories());
	});

	panel.port.on("dirsToRemove", function (dirsToRemove) {

		var currentDirs = SimpleStorage.getDirectories();

		for (var i = 0; i < dirsToRemove.length; i++) {

			for (var j = 0; j < currentDirs.length; j++) {

				if (dirsToRemove[i] === currentDirs[j]) {
					currentDirs.splice(j, 1);
				}
			}
		}

		SimpleStorage.setDirectories(currentDirs);
		files = FileIO.list(SimpleStorage.getDirectories());

		populateUI();
	});

	panel.port.on("play", function (filename) {
		Notification.sendMsg('Playing: ' + filename);

		var payload = JSON.stringify({
			operation: 'play',
			value: filename
		});
		Toolbar.getFrame().postMessage(payload, Toolbar.getFrame().url);
		Toolbar.setPlaying(true);
	});

	panel.port.on("updateProgressBar", function (value) {
		var payload = JSON.stringify({
			operation: 'updateProgressBar',
			value: value
		});
		Toolbar.getFrame().postMessage(payload, Toolbar.getFrame().url);
	});

	panel.port.on("pause", function () {
		Toolbar.setPlaying(false);
	});

	panel.port.on("resume", function () {
		Toolbar.setPlaying(true);
	});

	panel.port.on("stop", function () {
		var payload = JSON.stringify({
			operation: 'stop'
		});
		Toolbar.getFrame().postMessage(payload, Toolbar.getFrame().url);
		Toolbar.setPlaying(false);
	});

	panel.port.on("repeat1", function (value) {
		Toolbar.setRepeat1(value);
	});

	panel.port.on("repeatAll", function (value) {
		Toolbar.setRepeatAll(value);
	});

	panel.port.on("random", function (value) {
		Toolbar.setRandom(value);
	});

	panel.port.on("socialMedia", function (url) {
		Tabs.open(url);
	});

	panel.port.on("notificationSetting", function (value) {
		Preference.set('notification', value);
	});

	panel.port.on("recursiveSetting", function (value) {
		Preference.set('recursive', value);
	});

	panel.port.on("updateHotkeyPlay", function (value) {
		Preference.set('hotkeyPlay', value);
		panel.port.emit("hotkeyPlayStatus", Hotkey.reinitPlay());
	});

	panel.port.on("updateHotkeyStop", function (value) {
		Preference.set('hotkeyStop', value);
		panel.port.emit("hotkeyStopStatus", Hotkey.reinitStop());
	});

	panel.port.on("updateHotkeyNext", function (value) {
		Preference.set('hotkeyNext', value);
		panel.port.emit("hotkeyNextStatus", Hotkey.reinitNext());
	});

	panel.port.on("updateHotkeyPrev", function (value) {
		Preference.set('hotkeyPrev', value);
		panel.port.emit("hotkeyPrevStatus", Hotkey.reinitPrev());
	});

	panel.port.on("updateHotkeyRandom", function (value) {
		Preference.set('hotkeyRandom', value);
		panel.port.emit("hotkeyRandomStatus", Hotkey.reinitRandom());
	});

	panel.port.on("updateHotkeyRepeatAll", function (value) {
		Preference.set('hotkeyRepeatAll', value);
		panel.port.emit("hotkeyRepeatAllStatus", Hotkey.reinitRepeatAll());
	});

	panel.port.on("updateHotkeyRepeat1", function (value) {
		Preference.set('hotkeyRepeat1', value);
		panel.port.emit("hotkeyRepeat1Status", Hotkey.reinitRepeat1());
	});
};

exports.get = function () {
	return panel;
};

function populateUI() {
	var uiData = JSON.stringify({
		dirs: (SimpleStorage.getDirectories()),
		separator: separator,
		files: files,
		notification: (Preference.get("notification") === undefined ? true : Preference.get("notification")),
		recursive: (Preference.get("recursive") === undefined ? true : Preference.get("recursive")),
		noDirsString: Localisation.getString("noDirectoriesAdded_title"),
		filterByString: Localisation.getString("filterBy_title"),
		hotkeyPlay: Preference.get("hotkeyPlay"),
		hotkeyStop: Preference.get("hotkeyStop"),
		hotkeyNext: Preference.get("hotkeyNext"),
		hotkeyPrev: Preference.get("hotkeyPrev"),
		hotkeyRandom: Preference.get("hotkeyRandom"),
		hotkeyRepeatAll: Preference.get("hotkeyRepeatAll"),
		hotkeyRepeat1: Preference.get("hotkeyRepeat1")
	});

	panel.port.emit("uiData", uiData);
}
