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
        
        document.getElementById('currentTrack').textContent = filename;

        self.port.emit("play", filename);
    },
    pause: function () {
        document.getElementById('player').pause();
    },
    stop: function () {
    	
    	if (LocalMusicPlayer.currentSongRow !== null){
    		document.getElementById('player').src = '';
    	}
    },
    previousTrack: function () {
    	
    	if (document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow - 1]){
        	LocalMusicPlayer.currentSongRow--;
        	LocalMusicPlayer.play(
        			document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML,
        			document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML);
        }    	
    },
    nextTrack: function () {
    	
    	if (LocalMusicPlayer.playStyle === 'random'){
    		LocalMusicPlayer.random();
    	
    	}else{
    		
    		if (document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow + 1]){
            	LocalMusicPlayer.currentSongRow++;
            	LocalMusicPlayer.play(
            			document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML,
            			document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML);
            
        	} else {
        		
        		if (document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow] !== undefined){
        			
        			LocalMusicPlayer.currentSongRow = 0;
                	LocalMusicPlayer.play(
                			document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML,
                			document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML);
        		}
        	}
    	}
    },
    random: function () {
    	
    	var randomTrackNum = Math.floor((Math.random() * document.getElementById('tracks').rows.length)); 
    	
    	if (document.getElementById('tracks').rows[randomTrackNum]){
        	LocalMusicPlayer.currentSongRow = randomTrackNum;
        	LocalMusicPlayer.play(
        			document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[0].innerHTML,
        			document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML);
        
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
    },
    tweetTrack: function () {
    	
    	var url = 'https://twitter.com/intent/tweet?hashtags=LocalMusicPlayer&text=' + 
    	  encodeURIComponent('Listening to "' + document.getElementById('tracks').rows[LocalMusicPlayer.currentSongRow].cells[1].innerHTML + '"');
    	self.port.emit("tweetTrack", url);
    },
    populateRow: function (song, iteration){
    	var table = document.getElementById("tracks"),
    		row = table.insertRow(table.rows.length),
    		cell0 = row.insertCell(0),
    		cell1 = row.insertCell(1),
    		cell2 = row.insertCell(2);
        
        var dirText = document.createTextNode(song.dir);
        cell0.appendChild(dirText);
        cell0.style.display = 'none';

        var filenameText = document.createTextNode(song.filename);
        cell1.appendChild(filenameText);

        var img = document.createElement('img');
        img.src = "../images/play-24.png";
        img.className = 'imageSpacing';

        img.addEventListener('click', function (event) {

        	LocalMusicPlayer.currentSongRow = iteration;
            LocalMusicPlayer.play(song.dir, song.filename);
            
        }, false);

        cell2.appendChild(img);
    },
    showLibraryView: function () {
    	document.getElementById('playerView').style.display = 'none';
    	document.getElementById('libraryView').style.display = 'inline';
    },
    showPlayerView: function () {
    	document.getElementById('libraryView').style.display = 'none';
    	document.getElementById('playerView').style.display = 'inline';
    }
};


// event listeners
document.getElementById('stopTrack').addEventListener('click', LocalMusicPlayer.stop);
document.getElementById('previousTrack').addEventListener('click', LocalMusicPlayer.previousTrack);
document.getElementById('nextTrack').addEventListener('click', LocalMusicPlayer.nextTrack);
document.getElementById('repeatAll').addEventListener('click', function() { LocalMusicPlayer.toggle(this); });
document.getElementById('random').addEventListener('click', function() { LocalMusicPlayer.toggle(this); });
document.getElementById('libraryShow').addEventListener('click', LocalMusicPlayer.showLibraryView);
document.getElementById('tweetTrack').addEventListener('click', LocalMusicPlayer.tweetTrack);
document.getElementById('libraryAdd').addEventListener('click', LocalMusicPlayer.selectDir);
document.getElementById('libraryBack').addEventListener('click', LocalMusicPlayer.showPlayerView);


// populate panel with addon data when shown
self.port.on("uiData", function (uiData) {
	var parsed = JSON.parse(uiData);
	
	LocalMusicPlayer.separator = parsed.separator;

    // remove children
    while (document.getElementById("tracks").firstChild) {
        document.getElementById("tracks").removeChild(document.getElementById("tracks").firstChild);
    }
    
    // add selected directories to library view 
    if (parsed.dirs.length > 0){
    	
    	// remove children first
    	var element = document.getElementById('libraries');
    	while(element.firstChild){
    		element.removeChild(element.firstChild);
    	}
    	
    	// populate
        for (var i = 0; i < parsed.dirs.length; i++){
        	
        	var dirText = document.createTextNode(parsed.dirs[i]);
        	document.getElementById('libraries').appendChild(dirText);
        	document.getElementById('libraries').appendChild(document.createElement("br"));
        }
    }
    
    // add music files to player view
    if (parsed.files !== undefined){
    	if (parsed.files.length > 0){
    	    for (var j = 0; j < parsed.files.length; j++) {
    	    	LocalMusicPlayer.populateRow(parsed.files[j], j);
    	    }
        }
    }
});