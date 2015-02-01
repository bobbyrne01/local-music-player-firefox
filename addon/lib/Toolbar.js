var {
	ActionButton
} = require('sdk/ui/button/action');
var {
	Toolbar
} = require("sdk/ui/toolbar");
var {
	Frame
} = require("sdk/ui/frame");
var Data = require("./Data"),
	Localisation = require("./Localisation"),
	Panel = require("./Panel"),
	frameObject;

exports.init = function () {

	var previous = ActionButton({
		id: "localmusicplayer-prev",
		label: Localisation.getString("hotkeyPrev_title"),
		icon: Data.get("images/previous-24.png"),
		onClick: function (state) {
			Panel.get().port.emit("prevTrack", '');
		}
	});

	var stop = ActionButton({
		id: "localmusicplayer-stop",
		label: Localisation.getString("hotkeyStop_title"),
		icon: Data.get("images/stop-24.png"),
		onClick: function (state) {
			Panel.get().port.emit("stopTrack", '');
		}
	});

	var next = ActionButton({
		id: "localmusicplayer-next",
		label: Localisation.getString("hotkeyNext_title"),
		icon: Data.get("images/next-24.png"),
		onClick: function (state) {
			Panel.get().port.emit("nextTrack", '');
		}
	});

	frameObject = new Frame({
		url: Data.get("html/FrameView.html")
	});

	var toolbar = Toolbar({
		title: Localisation.getString("addonName_title"),
		hidden: true,
		items: [previous, stop, next, frameObject]
	});
};

exports.getFrame = function () {
	return frameObject;
};
