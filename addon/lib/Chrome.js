var {
	Cc, Ci, Cu, components
} = require("chrome"),
	Notification = require("./Notification"),
	Panel = require("./Panel"),
	Window = require("./Window"),
	Button = require("./ToggleButton"),
	SimpleStorage = require("./SimpleStorage");

exports.getHomeDir = function () {
	return Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("Home", Ci.nsIFile);
};

exports.selectDir = function () {
	var nsIFilePicker = Ci.nsIFilePicker,
		fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);

	fp.init(Window.get(),
		"Browse",
		nsIFilePicker.modeGetFolder);
	fp.appendFilter("Supported Audio", "*.mp3; *.wav; *.ogg");

	var ret = fp.show();

	if (ret == nsIFilePicker.returnOK || ret == nsIFilePicker.returnReplace) {
		var dirs = SimpleStorage.getDirectories();
		dirs.push(fp.file.path);
		Panel.get().show(Button.get());
	}
};
