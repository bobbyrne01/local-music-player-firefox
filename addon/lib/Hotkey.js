var {
	Hotkey
} = require("sdk/hotkeys"),
	Panel = require("./Panel");

exports.init = function () {

	Hotkey({
		combo: "accel-shift-p",
		onPress: function () {
			Panel.get().port.emit('playTrack', '');
		}
	});

	Hotkey({
		combo: "accel-shift-s",
		onPress: function () {
			Panel.get().port.emit('stopTrack', '');
		}
	});

	Hotkey({
		combo: "accel-shift-right",
		onPress: function () {
			Panel.get().port.emit('nextTrack', '');
		}
	});

	Hotkey({
		combo: "accel-shift-left",
		onPress: function () {
			Panel.get().port.emit('previousTrack', '');
		}
	});
};
