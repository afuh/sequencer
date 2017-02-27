let soundSource, reverbBuffer;

let getData = function() {
  let data = request.response;

    context.decodeAudioData(data, (buffer) => {
      reverbBuffer = buffer;
      soundSource = context.createBufferSource();
      soundSource.buffer = reverbBuffer;

      reverb.buffer = reverbBuffer;

    }, function(e) {
      console.log("Error with decoding audio data" + e);
    });
};

let request = new XMLHttpRequest();

request.open("GET", "impulses/Large Long Echo Hall.wav", true);
request.responseType = "arraybuffer";
request.addEventListener("load", getData);

request.send();
