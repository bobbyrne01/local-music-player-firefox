window.addEventListener('click', function(event) {
  if (event.target.id.indexOf('directory') === 0){
    LocalMusicPlayer.selectDir();
  }
}, false);

var LocalMusicPlayer = {
		
  separator: null,
		
  selectDir: function() {
    self.port.emit("selectDir", '');
  },
  
  play: function(dir, filename) {

	document.getElementById('player').src = 'file://' + dir + LocalMusicPlayer.separator + filename;
	document.getElementById('player').play();
	
	self.port.emit("play", filename);
  },
  pause: function(){
	document.getElementById('player').pause();
  },
  stop: function(){
	document.getElementById('player').src = '';
  }
};

exportFunction(LocalMusicPlayer.play, unsafeWindow, {defineAs: "play"});
exportFunction(LocalMusicPlayer.pause, unsafeWindow, {defineAs: "pause"});
exportFunction(LocalMusicPlayer.stop, unsafeWindow, {defineAs: "stop"});




self.port.on("uiData", function (uiData) {
  var parsed = JSON.parse(uiData),
    content = '';
  
  for (var i = 0; i < parsed.files.length; i++) {
	  
	content += '<tr>';
	content += '<td>' + parsed.files[i] + '</td>';
	content += '<td><img onclick="window.play(\'' + parsed.dir + '\', \'' + parsed.files[i] + '\');" class="imageSpacing" src="../images/play-24.png"></img>';
	//content += '<img onclick="window.pause();" class="imageSpacing" src="../images/pause-24.png"></img>';
	content += '<img onclick="window.stop();" class="imageSpacing" src="../images/stop-24.png"></img></td></tr>';
  }
  
  document.getElementById('resultFiles').innerHTML = content;
  document.getElementById("directory").value = parsed.dir;
  LocalMusicPlayer.separator = parsed.separator;
});