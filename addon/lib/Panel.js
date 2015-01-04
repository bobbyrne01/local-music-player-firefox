var Panel = require("sdk/panel"),
	Data = require("./Data"),
	Button = require("./ToggleButton"),
	Notification = require("./Notification"),
	Preference = require("./Preference"),
	Chrome = require("./Chrome"),
	FileIO = require("./FileIO"),
	System = require("./System"),
	Tabs = require("./Tabs"),
	panel,
	separator,
	files;

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
		files = FileIO.list((Preference.get("directory") === "" ? Chrome.getHomeDir().path : Preference.get("directory")));
	});
	
	panel.port.on("play", function (filename) {
		Notification.sendMsg('Playing: ' + filename);
	});
	
	panel.port.on("tweetTrack", function (url) {
		Tabs.open(url);
	});
};

exports.get = function() {
	return panel;
};

function populateUI() {
	var uiData = JSON.stringify({
		dir: (Preference.get("directory") === "" ? Chrome.getHomeDir().path : Preference.get("directory")),
		separator: separator,
		files: files});
	
	panel.port.emit("uiData", uiData);
}