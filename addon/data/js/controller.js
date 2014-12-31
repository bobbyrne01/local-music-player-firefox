window.addEventListener('click', function (event) {
    if (event.target.id.indexOf('directory') === 0) {
        LocalMusicPlayer.selectDir();
    }
}, false);

var LocalMusicPlayer = {

    separator: null,
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
    }
};


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
        img.addEventListener('click', function (event) {

            LocalMusicPlayer.play(parsed.dir, filename);
        }, false);

        cell2.appendChild(img);


        var imgStop = document.createElement('img');
        imgStop.src = "../images/stop-24.png";
        imgStop.className = 'imageSpacing';

        imgStop.addEventListener('click', function (event) {
            LocalMusicPlayer.stop();
        }, false);

        cell2.appendChild(imgStop);
    }

    for (var i = 0; i < parsed.files.length; i++) {
    	populateRow();
    }

    document.getElementById("directory").value = parsed.dir;
    LocalMusicPlayer.separator = parsed.separator;
});