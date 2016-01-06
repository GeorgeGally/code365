// exposes audioChannelVolume
var audioChannelVolume = [];
var body = document.querySelector('body');
var music = createAudioElement('player');
var playButton;
var trackImage, trackImageLink;
var artistInfo;
var trackInfo;
var timeline;
var playhead;
var duration;
var timelineWidth;

var audioCtxCheck = window.AudioContext || window.webkitAudioContext;
if (!audioCtxCheck) {
  document.getElementById('warning').style.display = 'block';
  document.getElementById('player').style.display = 'none';
}
else {

  var SoundCloudAudioSource = function(player) {
    var self = this;
    var analyser;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;

    var source = audioCtx.createMediaElementSource(player);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    var sampleAudioStream = function() {
      analyser.getByteFrequencyData(self.streamData);
      // Calculate an overall volume value
      var total = 0;
      for (var i = 0; i < 64; i++) { // Get the volume from the first 64 bins
        total += self.streamData[i];
      }
      self.volume = total;

      var totalLow = 0;
      for (var i = 0; i < 31; i++) { // Get the volume from the first 32 bins
        totalLow += self.streamData[i];
      }
      self.volumeLow = totalLow;

      var totalHi = 0;
      for (var i = 31; i < 64; i++) { // Get the volume from the second 32 bins
        totalHi += self.streamData[i];
      }
      self.volumeHi = totalHi;
    };

    setInterval(sampleAudioStream, 20);

    // Public properties and methods
    this.volume = 0;
    this.volumeLow = 0;
    this.volumeHi = 0;
    this.streamData = new Uint8Array(256);
    this.playStream = function(streamUrl) {
        // Get the input stream from the audio element
        player.addEventListener('ended', function(){
            self.directStream('coasting');
        });
        player.crossOrigin = 'anonymous';
        player.setAttribute('src', streamUrl);
        player.play();
    }
  };
  var Visualizer = function() {
    var audioSource;
      this.init = function(options) {
          audioSource = options.audioSource;
          var container = document.getElementById(options.containerId);        
      };
  };

  var SoundcloudLoader = function(player,uiUpdater) {
    var self = this;
    var client_id = "a02d202ac1397c777070cd10fbe015c5"; // to get an ID go to http://developers.soundcloud.com/
    this.sound = {};
    this.streamUrl = "";
    this.errorMessage = "";
    this.player = player;

    /**
     * Loads the JSON stream data object from the URL of the track (as given in the location bar of the browser when browsing Soundcloud),
     * and on success it calls the callback passed to it (for example, used to then send the stream_url to the audiosource object).
     * @param track_url
     * @param callback
     */
    this.loadStream = function(track_url, successCallback, errorCallback) {
        SC.initialize({
            client_id: client_id
        });
        SC.get('/resolve', { url: track_url }, function(sound) {
            if (sound.errors) {
                self.errorMessage = "";
                for (var i = 0; i < sound.errors.length; i++) {
                    self.errorMessage += sound.errors[i].error_message + '<br>';
                }
                self.errorMessage += 'Make sure the URL has the correct format: https://soundcloud.com/user/title-of-the-track';
                errorCallback();
            } else {

                if(sound.kind=="playlist"){
                    self.sound = sound;
                    self.streamPlaylistIndex = 0;
                    self.streamUrl = function(){
                        return sound.tracks[self.streamPlaylistIndex].stream_url + '?client_id=' + client_id;
                    }
                    successCallback();
                }else{
                    self.sound = sound;
                    self.streamUrl = function(){ return sound.stream_url + '?client_id=' + client_id; };
                    successCallback();
                }
            }
        });
    };


    this.directStream = function(direction){
        if(direction=='toggle'){
            if (this.player.paused) {
                this.player.play();
            } else {
                this.player.pause();
            }
        }
        else if(this.sound.kind=="playlist"){
            if(direction=='coasting') {
                this.streamPlaylistIndex++;
            }else if(direction=='forward') {
                if(this.streamPlaylistIndex>=this.sound.track_count-1) this.streamPlaylistIndex = 0;
                else this.streamPlaylistIndex++;
            }else{
                if(this.streamPlaylistIndex<=0) this.streamPlaylistIndex = this.sound.track_count-1;
                else this.streamPlaylistIndex--;
            }
            if(this.streamPlaylistIndex>=0 && this.streamPlaylistIndex<=this.sound.track_count-1) {
               this.player.setAttribute('src',this.streamUrl());
               this.player.play();
            }
        }
    }


  };


var player =  document.getElementById('player');
var loader = new SoundcloudLoader(player);

  var audioSource = new SoundCloudAudioSource(player);
  var form = document.getElementById('form');
  var loadAndUpdate = function(trackUrl) {
    loader.loadStream(trackUrl,
        function() {
            audioSource.playStream(loader.streamUrl());
            ui(loader);
        }, function(){});
  };


  // On load, check to see if there is a track token in the URL, and if so, load that automatically
  if (window.location.hash) {
    var trackUrl = 'https://soundcloud.com/' + window.location.hash.substr(1);
    loadAndUpdate(trackUrl);
  }
  else {
  var trackUrl = 'https://soundcloud.com/' + 'justin-van-der-volgen/alexander-robotnick-undicidisco-justin-van-der-volgen-edit?in=h-track/sets/alexande-robotnick-florian';
    loadAndUpdate(trackUrl);      
  }
} 

function createAudioElement(audio_name){
  var music = document.createElement('audio');
  music.setAttribute("id", audio_name);
  body.appendChild(music);
  music.width = window.innerWidth;
  music.height = window.innerHeight;
  createPlayerUI();
  return music;
}






 


var audioChannelVolume = [];
var audioRender = function () { 
if (audioCtxCheck) {
  for (var i = audioSource.streamData.length - 1; i >= 0; i--) {
    audioChannelVolume[i] = audioSource.streamData[i];
  }
}

requestAnimationFrame(audioRender); 
}

audioRender();


// player UI

var ui = function(loader) {
    
    // update the track and artist into in the controlPanel
    var artistLink = document.createElement('a');
    artistLink.setAttribute('href', loader.sound.user.permalink_url);
    artistLink.innerHTML = loader.sound.user.username;
        var trackLink = document.createElement('a');
        trackLink.setAttribute('href', loader.sound.permalink_url);

        if(loader.sound.kind=="playlist"){
            trackLink.innerHTML = "<p>" + loader.sound.tracks[loader.streamPlaylistIndex].title + "</p>" + "<p>"+loader.sound.title+"</p>";
        }else{
            trackLink.innerHTML = loader.sound.title;
        }

        var image = loader.sound.artwork_url ? loader.sound.artwork_url : loader.sound.user.avatar_url; // if no track artwork exists, use the user's avatar.
        trackImage.setAttribute('src', image);
        trackImageLink.setAttribute('href', loader.sound.permalink_url);
        artistInfo.innerHTML = '';
        artistInfo.appendChild(artistLink);

        trackInfo.innerHTML = '';
        trackInfo.appendChild(trackLink);

        // display the track info panel
        //trackInfoPanel.className = '';

        // add a hash to the URL so it can be shared or saved
        var trackToken = loader.sound.permalink_url.substr(22);
        window.location = '#' + trackToken;
        //loadPlayer();
    };



function createPlayerUI() {
  
  var audioplayer = document.createElement('div'); 
  audioplayer.setAttribute("id", "audioplayer");
  audioplayer.setAttribute("class", "wrapper");

  trackImageLink = document.createElement('a');
  trackImageLink.setAttribute("id", "trackImageLink");
  audioplayer.appendChild(trackImageLink);

  trackImage = document.createElement('img');
  trackImage.setAttribute("id", "trackImage");
  trackImageLink.appendChild(trackImage);

  trackInfo = document.createElement('div');
  trackInfo.setAttribute("id", "trackInfo");
  audioplayer.appendChild(trackInfo);

  artistInfo = document.createElement('div');
  artistInfo.setAttribute("id", "artistInfo");
  audioplayer.appendChild(artistInfo);
  
  playButton = document.createElement('div');
  playButton.setAttribute("id", "playButton");
  playButton.setAttribute("class", "pause");
  audioplayer.appendChild(playButton);
  timeline = document.createElement('div');
  timeline.setAttribute("id", "timeline");
  audioplayer.appendChild(timeline);
  playhead = document.createElement('div');
  playhead.setAttribute("id", "playhead");
  timeline.appendChild(playhead);

  soundcloud = document.createElement('img');
  soundcloud.setAttribute("id", "soundcloudLogo");
  soundcloud.setAttribute("src", "http://developers.soundcloud.com/assets/logo_black.png");
  audioplayer.appendChild(soundcloud);

  body.appendChild(audioplayer);
  playButton.addEventListener("click", playAudio);
  timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
}
 
function playAudio() {
  if (music.paused) {
    console.log("play");
    music.play();
    playButton.className = "";
    playButton.className = "pause";
  } else { 
    console.log("pause");
    music.pause();
    playButton.className = "";
    playButton.className = "play";
  }
}


function timeUpdate() {
  var playPercent = 100 * (music.currentTime / duration);
  playhead.style.marginLeft = playPercent + "%";
}
 
// Gets audio file duration
music.addEventListener("canplaythrough", function () {
  duration = music.duration;
  music.addEventListener("timeupdate", timeUpdate, false);
}, false);


//Makes timeline clickable
timeline.addEventListener("click", function (event) {
  moveplayhead(event);
  music.currentTime = duration * clickPercent(event);
}, false);
 
// returns click as decimal (.77) of the total timelineWidth
function clickPercent(e) {
  return (e.pageX - timeline.offsetLeft) / timelineWidth;
}
 
function moveplayhead(e) {
    var newMargLeft = e.pageX - timeline.offsetLeft;
    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
    }
}
