var { ToggleButton } = require("sdk/ui/button/toggle"),
	Data = require("./Data"),
	Panel = require("./Panel"),
	button;

exports.init = function() {
	
	button = ToggleButton({
		id: "local-music-player-widget",
		label: 'Local Music Player',
		icon: Data.get("images/ico-64.png"),
		onChange: handleChange
	});
};

exports.get = function() {
	return button;
};

function handleChange(state) {
	if (state.checked) {
		Panel.get().show({
			position: button
		});
	}
}
