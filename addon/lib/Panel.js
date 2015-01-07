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
		width: 450,
		height: 300,
		contentURL: Data.get("html/view.html"),
		contentScriptFile: Data.get("js/controller.js"),
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

		Array.prototype.diff = function (a) {
			return this.filter(function (i) {
				return a.indexOf(i) < 0;
			});
		};

		SimpleStorage.setDirectories(SimpleStorage.getDirectories().diff(dirsToRemove));
		files = FileIO.list(SimpleStorage.getDirectories());

		populateUI();
	});

	panel.port.on("play", function (filename) {
		Notification.sendMsg('Playing: ' + filename);
	});

	panel.port.on("tweetTrack", function (url) {
		Tabs.open(url);
	});

	panel.port.on("notificationSetting", function (value) {
		Preference.set('notification', value);
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
		notification: (Preference.get("notification") === undefined ? true : Preference.get("notification"))
	});

	panel.port.emit("uiData", uiData);
}
