var ss = require("sdk/simple-storage");

function getDirectories() {
	return ss.storage.directories;
}

exports.getDirectories = function () {
	return getDirectories();
};

function setDirectories(directories) {
	ss.storage.directories = directories;
}

exports.setDirectories = function (directories) {
	setDirectories(directories);
};
