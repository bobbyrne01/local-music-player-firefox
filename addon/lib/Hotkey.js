var {
	Hotkey
} = require("sdk/hotkeys"),
	Panel = require("./Panel"),
	Preference = require("./Preference"),
	hotkeyPlay,
	hotkeyStop,
	hotkeyNext,
	hotkeyPrev,
	hotkeyRandom,
	hotkeyRepeatAll;

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
	
	hotkeyRandom = Hotkey({
		combo: Preference.get("hotkeyRandom"),
		onPress: function () {
			Panel.get().port.emit('random', '');
		}
	});
	
	hotkeyRepeatAll = Hotkey({
		combo: Preference.get("hotkeyRepeatAll"),
		onPress: function () {
			Panel.get().port.emit('repeatAll', '');
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

exports.reinitRandom = function () {

	var status = true;

	try {
		hotkeyRandom.destroy();
		hotkeyRandom = Hotkey({
			combo: Preference.get("hotkeyRandom"),
			onPress: function () {
				Panel.get().port.emit('random', '');
			}
		});
	} catch (err) {
		status = false;
	}

	return status;
};

exports.reinitRepeatAll = function () {

	var status = true;

	try {
		hotkeyRepeatAll.destroy();
		hotkeyRepeatAll = Hotkey({
			combo: Preference.get("hotkeyRepeatAll"),
			onPress: function () {
				Panel.get().port.emit('repeatAll', '');
			}
		});
	} catch (err) {
		status = false;
	}

	return status;
};