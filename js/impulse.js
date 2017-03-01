var soundSource, reverbBuffer;

var getData = function() {
  var data = request.response;

    context.decodeAudioData(data, function(buffer){
      reverbBuffer = buffer;
      soundSource = context.createBufferSource();
      soundSource.buffer = reverbBuffer;

      reverb.buffer = reverbBuffer;

    }, function(e) {
      console.log("Error with decoding audio data" + e);
    });
};

var request = new XMLHttpRequest();

request.open("GET", "impulses/Large Long Echo Hall.wav", true);
request.responseType = "arraybuffer";
request.addEventListener("load", getData);

request.send();
