var fileIO = require("sdk/io/file");

exports.list = function(dir) {
	
	var files = fileIO.list(dir),
		audio = [];

	for (i = 0; i < files.length; i++) {
	  let item = fileIO.join(dir, files[i]);
	  if (fileIO.isFile(item)) {
		if (item.endsWith('.mp3') ||
				item.endsWith('.MP3') ||
				item.endsWith('.wav') ||
				item.endsWith('.WAV') ||
				item.endsWith('.ogg') ||
				item.endsWith('.OGG')){
		  audio[audio.length] = files[i];
		}
	  }
	}
	
	return audio;
};