//scoped functions
var LocalMusicPlayer = {

    separator: null,
    currentSongRow: null,
    playStyle: 'one',
    
    selectDir: function () {
        self.port.emit("selectDir", '');
    },

    play: function (dir, filename) {

        document.getElementById('player').src = 'file://' + dir + LocalMusicPlayer.separator + filename;
        document.getElementById('player').play();

        self.port.emit("play", filename);
    },
    pause: function () {
        document.getElementById('player').pause();
    },
    stop: function () {
        document.getElementById('player').src = '';
    },
    previousTrack: function () {
    	
    	if (document.getElementById('resultFiles').rows[LocalMusicPlayer.currentSongRow - 1]){
        	LocalMusicPlayer.currentSongRow--;
        	LocalMusicPlayer.play(
        			document.getElementById("directory").value,
        			document.getElementById('resultFiles').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML);
        }    	
    },
    nextTrack: function () {
    	
    	if (LocalMusicPlayer.playStyle === 'random'){
    		LocalMusicPlayer.random();
    	
    	}else{
    		
    		if (document.getElementById('resultFiles').rows[LocalMusicPlayer.currentSongRow + 1]){
            	LocalMusicPlayer.currentSongRow++;
            	LocalMusicPlayer.play(
            			document.getElementById("directory").value,
            			document.getElementById('resultFiles').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML);
            
        	} else {
        		
        		LocalMusicPlayer.currentSongRow = 0;
            	LocalMusicPlayer.play(
            			document.getElementById("directory").value,
            			document.getElementById('resultFiles').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML);
        	}
    	}
    },
    random: function () {
    	
    	var randomTrackNum = Math.floor((Math.random() * document.getElementById('resultFiles').rows.length)); 
    	
    	if (document.getElementById('resultFiles').rows[randomTrackNum]){
        	LocalMusicPlayer.currentSongRow = randomTrackNum;
        	LocalMusicPlayer.play(
        			document.getElementById("directory").value,
        			document.getElementById('resultFiles').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML);
        
    	}
    },
    toggle: function (obj) {
    	
    	if (obj.id === 'repeatAll'){
    		
    		if (obj.id === LocalMusicPlayer.playStyle){
    			document.getElementById('repeatAll').style.backgroundColor = '';
    			document.getElementById('random').style.backgroundColor = '';
    			LocalMusicPlayer.playStyle = 'one';
    			document.getElementById('player').removeEventListener('ended', LocalMusicPlayer.songEnded);
    		}else{
    			document.getElementById('repeatAll').style.backgroundColor = '#B2B2B2';
    			document.getElementById('random').style.backgroundColor = '';
    			LocalMusicPlayer.playStyle = 'repeatAll';
    			document.getElementById('player').addEventListener('ended', LocalMusicPlayer.songEnded);
    		}
    		
    	}else if (obj.id === 'random'){
    		
    		if (obj.id === LocalMusicPlayer.playStyle){
    			document.getElementById('repeatAll').style.backgroundColor = '';
    			document.getElementById('random').style.backgroundColor = '';
    			LocalMusicPlayer.playStyle = 'one';
    			document.getElementById('player').removeEventListener('ended', LocalMusicPlayer.songEnded);
    		}else{
    			document.getElementById('repeatAll').style.backgroundColor = '';
    			document.getElementById('random').style.backgroundColor = '#B2B2B2';
    			LocalMusicPlayer.playStyle = 'random';
    			document.getElementById('player').addEventListener('ended', LocalMusicPlayer.songEnded);
    		}
    	}
    },
    songEnded: function () {
    	
    	if (LocalMusicPlayer.playStyle === 'repeatAll'){
    		LocalMusicPlayer.nextTrack();
    	}else if (LocalMusicPlayer.playStyle === 'random'){
    		LocalMusicPlayer.random();
    	}
    }
};


// event listeners
document.getElementById('directory').addEventListener('click', LocalMusicPlayer.selectDir);
document.getElementById('stopTrack').addEventListener('click', LocalMusicPlayer.stop);
document.getElementById('previousTrack').addEventListener('click', LocalMusicPlayer.previousTrack);
document.getElementById('nextTrack').addEventListener('click', LocalMusicPlayer.nextTrack);
document.getElementById('repeatAll').addEventListener('click', function() { LocalMusicPlayer.toggle(this); });
document.getElementById('random').addEventListener('click', function() { LocalMusicPlayer.toggle(this); });


// populate panel with addon data when shown
self.port.on("uiData", function (uiData) {

    // remove children
    while (document.getElementById("resultFiles").firstChild) {
        document.getElementById("resultFiles").removeChild(document.getElementById("resultFiles").firstChild);
    }

    var parsed = JSON.parse(uiData);
    
    function populateRow(){
    	var table = document.getElementById("resultFiles");
        var row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        var newText = document.createTextNode(parsed.files[i]);
        cell1.appendChild(newText);

        var img = document.createElement('img');
        img.src = "../images/play-24.png";
        img.className = 'imageSpacing';

        var filename = parsed.files[i];
        row = i;
        img.addEventListener('click', function (event) {

        	LocalMusicPlayer.currentSongRow = row;
            LocalMusicPlayer.play(parsed.dir, filename);
            
        }, false);

        cell2.appendChild(img);
    }

    for (var i = 0; i < parsed.files.length; i++) {
    	populateRow();
    }

    document.getElementById("directory").value = parsed.dir;
    LocalMusicPlayer.separator = parsed.separator;
});