var audio = {
  currentSongIndex: 0, // Keeps track of the current song index

  init: function() {
    var $that = this;
    $(function() {
      $that.components.media();
      $that.setupKeyboardControls();
    });
  },

  components: {
    media: function(target) {
      var media = $('audio.fc-media', target || 'body');
      if (media.length) {
        var $that = audio;

        media.mediaelementplayer({
          audioHeight: 40,
          features: ['playpause', 'current', 'duration', 'progress', 'volume', 'tracks', 'fullscreen'],
          alwaysShowControls: true,
          timeAndDurationSeparator: '<span></span>',
          iPadUseNativeControls: true,
          iPhoneUseNativeControls: true,
          AndroidUseNativeControls: true,
          success: function(mediaElement, originalNode) {
            mediaElement.addEventListener('ended', function() {
              $that.playNextSong(); // Call the method to play the next song
            });
          }
        });
      }
    }
  },

  setupKeyboardControls: function() {
    var $that = this;
    $(document).on('keydown', function(event) {
      if (event.keyCode === 32) { // Spa￼Use Up/Down Arrow keys to increase or decrease volume.ebar
        event.preventDefault();
        $that.togglePlayback();
      }
    });
  },

  togglePlayback: function() {
    var mediaElement = $('audio.fc-media')[0];
    if (mediaElement.paused) {
      mediaElement.play();
    } else {
      mediaElement.pause();
    }
  },

  playNextSong: function() {
    var mediaElements = $('audio.fc-media');
    this.currentSongIndex = (this.currentSongIndex + 1) % mediaElements.length; // Increment currentSongIndex or loop back to 0
    var nextMediaElement = mediaElements[this.currentSongIndex];
    nextMediaElement.play();
  }
};

audio.init();
