var Panel = require("sdk/panel"),
	Data = require("./Data"),
	Button = require("./ToggleButton"),
	Notification = require("./Notification"),
	Preference = require("./Preference"),
	Chrome = require("./Chrome"),
	FileIO = require("./FileIO"),
	System = require("./System"),
	panel,
	separator;

exports.init = function() {
	
	if (System.getPlatform().indexOf('win') >= 0){
	  separator = '\\';
	}else{
	  separator = '/';
	}
	
	panel = Panel.Panel({
		width: 450,
		height: 300,
		contentURL: Data.get("html/view.html"),
		contentScriptFile: Data.get("js/controller.js"),
		position: Button.get(),
		onShow: function() { 
        	populateUI();
        },
		onHide: function() {
			Button.get().state('window', {checked: false});
		}
	});
	
	panel.port.on("selectDir", function () {
		Chrome.selectDir();
		panel.show();
	});
	
	panel.port.on("play", function (filename) {
		Notification.sendMsg('Playing: ' + filename);
	});
};

exports.get = function() {
	return panel;
};

function populateUI() {
	
	var dir = (Preference.get("directory") === "" ? Chrome.getHomeDir().path : Preference.get("directory"));
	
	var uiData = JSON.stringify({
		dir: dir,
		separator: separator,
		files: FileIO.list(dir)});
	
	panel.port.emit("uiData", uiData);
}