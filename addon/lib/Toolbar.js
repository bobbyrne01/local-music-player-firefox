var {
	ActionButton
} = require('sdk/ui/button/action');
var {
	Toolbar
} = require("sdk/ui/toolbar");
//var { Frame } = require("sdk/ui/frame"),
var Data = require("./Data"),
	Localisation = require("./Localisation"),
	Panel = require("./Panel");

exports.init = function () {

	var previous = ActionButton({
		id: "localmusicplayer-prev",
		label: Localisation.getString("hotkeyPrev_title"),
		icon: Data.get("images/previous-24.png"),
		onClick: function (state) {
			Panel.get().port.emit("prevTrack", '');
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

	/*var play = ActionButton({
	  id: "play",
	  label: "play",
	  icon: "./icons/play.png"
	});

	var frame = new Frame({
	  url: "./frame-player.html"
	});*/

	var toolbar = Toolbar({
		title: Localisation.getString("addonName_title"),
		hidden: true,
		items: [previous, next]
	});
};
