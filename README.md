local-music-player-firefox
==========================

[![Build Status](https://travis-ci.org/bobbyrne01/local-music-player-firefox.svg?branch=master)](https://travis-ci.org/bobbyrne01/local-music-player-firefox)
[![devDependency Status](https://david-dm.org/bobbyrne01/local-music-player-firefox/dev-status.svg)](https://david-dm.org/bobbyrne01/local-music-player-firefox#info=devDependencies)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

Firefox addon allowing user to listen to music stored on their local system.

### Features

* Add and remove music directories to library (stored across sessions)
* Optional, recursive directory scan
* Play, pause, previous, stop, next buttons
* Seek/skip
* Play single song (default)
* Repeat all sequentially
* Randomize
* Displays currently playing song
* Volume adjustment controls
* Mute/unmute button
* Optional, notification on song start
* Filter songs using search textfield
* Share current song via Twitter, Tumblr
* Default hotkeys provided (+user configurable)

### Audio support

Addon uses `HTML5` `<audio>` element, which includes support for:

* `.mp3`
* `.mp4` \*
* `.wav`
* `.ogg`

\* "Firefox supports the format in some cases, but only when a third-party decoder is available, and the device hardware can handle the profile used to encode the MP4." [reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats#MP4_H.264_%28AAC_or_MP3%29)

More info [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats) on audio support within Firefox.

### Default hotkeys

* `accel-shift-p` .. Play track
* `accel-shift-s` .. Stop track
* `accel-shift-right` .. Next track
* `accel-shift-left` .. Previous track

### Locale support

* bg
* cs-CZ
* de-DE
* en-GB
* en-US
* es-ES
* fr-FR
* it-IT
* ja-JP
* ko-KR
* pl-PL
* pt-PT
* ru-RU
* sv-SE
* uk-UA
* zh-CN

### Image attributions

* App icon, https://www.iconfinder.com/icons/175749/music_record_icon
* Control icons, http://icons4android.com
