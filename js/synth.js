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
var f0 = new Voice(notes["C6"]);
var f1 = new Voice(notes["G5"]);
var f2 = new Voice(notes["F5"]);
var f3 = new Voice(notes["D#5"]);
var f4 = new Voice(notes["C5"]);
var f5 = new Voice(notes["A#4"]);
var f6 = new Voice(notes["G4"]);
var f7 = new Voice(notes["F4"]);
var f8 = new Voice(notes["D#4"]);
var f9 = new Voice(notes["C3"]);

/*
//Major penta
var f1 = new Voice(notes["E5"]);
var f2 = new Voice(notes["D5"]);
var f3 = new Voice(notes["C5"]);
var f4 = new Voice(notes["A4"]);
var f5 = new Voice(notes["G4"]);
var f6 = new Voice(notes["E4"]);
var f7 = new Voice(notes["D4"]);
var f8 = new Voice(notes["C3"]);
*/

//this.adsr = new Float32Array([0.0,0.0,0.0,0.0]);
