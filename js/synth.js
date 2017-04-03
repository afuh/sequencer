var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var master = context.createGain();
var filter = context.createBiquadFilter();
var reverb = context.createConvolver();
var reverbGain = context.createGain();
var comp = context.createDynamicsCompressor();

filter.frequency.value = 8000;

comp.threshold.value = -40;
comp.knee.value = 7;

reverbGain.gain.value = 0.5; // Wet gain
master.gain.value = 0.7; // Dry Gain

filter.connect(reverb);
reverb.connect(reverbGain);
reverbGain.connect(comp);

filter.connect(master);
master.connect(comp);
comp.connect(context.destination);

function Voice(freq) {
  this.osc = context.createOscillator();

  this.osc.type = "sine"; //sine, triangle, sawtooth, square
  this.osc.start(context.currentTime);
  this.osc.frequency.value = freq;

  this.vol = context.createGain();
  this.vol.gain.value = 0;

  this.play = function() {
    this.vol.gain.cancelScheduledValues(context.currentTime); //cancela el vol anterior
    this.vol.gain.setValueAtTime(this.vol.gain.value, context.currentTime); //establece el vol
    this.vol.gain.linearRampToValueAtTime(1.0, context.currentTime + 0.01); //Attack
    this.vol.gain.linearRampToValueAtTime(0, context.currentTime + 0.3); //Release
  };

  this.osc.connect(this.vol);
  this.vol.connect(filter);
}

//minor penta
var note = {
  "f0": new Voice(n["C6"]),
  "f1": new Voice(n["G5"]),
  "f2": new Voice(n["F5"]),
  "f3": new Voice(n["D#5"]),
  "f4": new Voice(n["C5"]),
  "f5": new Voice(n["A#4"]),
  "f6": new Voice(n["G4"]),
  "f7": new Voice(n["F4"]),
  "f8": new Voice(n["D#4"]),
  "f9": new Voice(n["C3"])
}

//this.adsr = new Float32Array([0.0,0.0,0.0,0.0]);
