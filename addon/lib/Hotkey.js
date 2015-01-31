var {
	Hotkey
} = require("sdk/hotkeys"),
	Panel = require("./Panel"),
	Preference = require("./Preference"),
	hotkeyPlay,
	hotkeyStop,
	hotkeyNext,
	hotkeyPrev;

exports.init = function () {

	hotkeyPlay = Hotkey({
		combo: Preference.get("hotkeyPlay"),
		onPress: function () {
			Panel.get().port.emit('playTrack', '');
		}
	});

	hotkeyStop = Hotkey({
		combo: Preference.get("hotkeyStop"),
		onPress: function () {
			Panel.get().port.emit('stopTrack', '');
		}
	});

	hotkeyNext = Hotkey({
		combo: Preference.get("hotkeyNext"),
		onPress: function () {
			Panel.get().port.emit('nextTrack', '');
		}
	});

	hotkeyPrev = Hotkey({
		combo: Preference.get("hotkeyPrev"),
		onPress: function () {
			Panel.get().port.emit('prevTrack', '');
		}
	});
};

exports.reinitPlay = function () {

	var status = true;

	try {
		hotkeyPlay.destroy();
		hotkeyPlay = Hotkey({
			combo: Preference.get("hotkeyPlay"),
			onPress: function () {
				Panel.get().port.emit('playTrack', '');
			}
		});
	} catch (err) {
		status = false;
	}

	return status;
};

exports.reinitStop = function () {

	var status = true;

	try {
		hotkeyStop.destroy();
		hotkeyStop = Hotkey({
			combo: Preference.get("hotkeyStop"),
			onPress: function () {
				Panel.get().port.emit('stopTrack', '');
			}
		});
	} catch (err) {
		status = false;
	}

	return status;
};

exports.reinitNext = function () {

	var status = true;

	try {
		hotkeyNext.destroy();
		hotkeyNext = Hotkey({
			combo: Preference.get("hotkeyNext"),
			onPress: function () {
				Panel.get().port.emit('nextTrack', '');
			}
		});
	} catch (err) {
		status = false;
	}

	return status;
};

exports.reinitPrev = function () {

	var status = true;

	try {
		hotkeyPrev.destroy();
		hotkeyPrev = Hotkey({
			combo: Preference.get("hotkeyPrev"),
			onPress: function () {
				Panel.get().port.emit('prevTrack', '');
			}
		});
	} catch (err) {
		status = false;
	}

	return status;
};
