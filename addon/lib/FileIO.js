var fileIO = require("sdk/io/file");

exports.list = function (dirs) {

	var audio = [];

	for (var j = 0; j < dirs.length; j++) {

		var files = fileIO.list(dirs[j]);

		for (i = 0; i < files.length; i++) {
			let item = fileIO.join(dirs[j], files[i]);

			if (fileIO.isFile(item)) {
				if (item.endsWith('.mp3') || item.endsWith('.MP3') || item.endsWith('.wav') || item.endsWith('.WAV') || item.endsWith('.ogg') || item.endsWith('.OGG')) {

					audio.push({
						dir: dirs[j],
						filename: files[i]
					});
				}
			}
		}
	}

	return audio;
};
