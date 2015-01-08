var fileIO = require("sdk/io/file");

function compare(a,b) {
	  if (a.filename < b.filename)
	     return -1;
	  if (a.filename > b.filename)
	    return 1;
	  return 0;
	}

exports.list = function (dirs) {

	var audio = [];

	for (var j = 0; j < dirs.length; j++) {

		var files = fileIO.list(dirs[j]),
			tempArrayForSorting = [];

		for (i = 0; i < files.length; i++) {
			let item = fileIO.join(dirs[j], files[i]);

			if (fileIO.isFile(item)) {
				if (item.endsWith('.mp3') || item.endsWith('.MP3') || item.endsWith('.wav') || item.endsWith('.WAV') || item.endsWith('.ogg') || item.endsWith('.OGG')) {

					tempArrayForSorting.push({
						dir: dirs[j],
						filename: files[i]
					});
				}
			}
		}
		
		// sort each directory separately, so songs in same folder appear in order
		if (tempArrayForSorting.length > 0){
			
			tempArrayForSorting.sort(compare);
			
			for (var k = 0; k < tempArrayForSorting.length; k++){
				
				audio.push({
					dir: tempArrayForSorting[k].dir,
					filename: tempArrayForSorting[k].filename
				});
			}
		}
	}

	return audio;
};
