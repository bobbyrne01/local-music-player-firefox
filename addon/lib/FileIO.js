var fileIO = require("sdk/io/file"),
	Preference = require("./Preference");

function compare(a, b) {
	if (a.filename < b.filename)
		return -1;
	if (a.filename > b.filename)
		return 1;
	return 0;
}

exports.list = function (dirs) {

	var audio = [],
		dirsTemp = [];

	for (var w = 0; w < dirs.length; w++) {
		dirsTemp.push(dirs[w]);
	}

	if (Preference.get("recursive")) {
		for (var k = 0; k < dirsTemp.length; k++) {

			try {
				var filesTemp = fileIO.list(dirsTemp[k]);

				for (var p = 0; p < filesTemp.length; p++) {

					let item = fileIO.join(dirsTemp[k], filesTemp[p]);

					if (!(fileIO.isFile(item))) {
						dirsTemp.push(item);
					}
				}
			} catch (err) {
				// file cannot be handled by sdk e.g has 'prw' permissions
			}
		}
	}

	for (var j = 0; j < dirsTemp.length; j++) {

		try {

			var files = fileIO.list(dirsTemp[j]),
				tempArrayForSorting = [];

			for (i = 0; i < files.length; i++) {
				let item = fileIO.join(dirsTemp[j], files[i]);

				if (fileIO.isFile(item)) {
					if (item.endsWith('.mp3') || item.endsWith('.MP3') || item.endsWith('.wav') || item.endsWith('.WAV') || item.endsWith('.ogg') || item.endsWith('.OGG')) {

						tempArrayForSorting.push({
							dir: dirsTemp[j],
							filename: files[i]
						});
					}
				}
			}

			// sort each directory separately, so songs in same folder appear in order
			if (tempArrayForSorting.length > 0) {

				tempArrayForSorting.sort(compare);

				for (var q = 0; q < tempArrayForSorting.length; q++) {

					audio.push({
						dir: tempArrayForSorting[q].dir,
						filename: tempArrayForSorting[q].filename
					});
				}
			}

		} catch (err) {
			// file cannot be handled by sdk e.g has 'prw' permissions
		}
	}

	return audio;
};
