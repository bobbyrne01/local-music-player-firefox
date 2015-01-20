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
		width: 550,
		height: 400,
		contentURL: Data.get("html/view.html"),
		contentScriptFile: [Data.get("js/controller.js")],
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
		filterByString: Localisation.getString("filterBy_title")
	});

	panel.port.emit("uiData", uiData);
}
