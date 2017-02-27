const master = context.createGain();
const filter = context.createBiquadFilter();
const reverb = context.createConvolver();
const reverbGain = context.createGain();
const comp = context.createDynamicsCompressor();

filter.frequency.value = 10000;
//filter.Q.value = 7;

comp.threshold.value = -40;
comp.knee.value = 7;

reverbGain.gain.value = 0.5; // Wet gain
master.gain.value = 0.7; // Dry Gain

filter.connect(reverb).connect(reverbGain).connect(comp);
filter.connect(master).connect(comp).connect(context.destination);

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
    this.vol.gain.linearRampToValueAtTime(0, context.currentTime + 0.4); //Release
  };

  this.osc.connect(this.vol).connect(filter);
}

//minor penta
const f1 = new Voice(notes["F5"]);
const f2 = new Voice(notes["D#5"]);
const f3 = new Voice(notes["C5"]);
const f4 = new Voice(notes["A#4"]);
const f5 = new Voice(notes["G4"]);
const f6 = new Voice(notes["F4"]);
const f7 = new Voice(notes["D#4"]);
const f8 = new Voice(notes["C3"]);

/*
//Major penta
const f1 = new Voice(notes["E5"]);
const f2 = new Voice(notes["D5"]);
const f3 = new Voice(notes["C5"]);
const f4 = new Voice(notes["A4"]);
const f5 = new Voice(notes["G4"]);
const f6 = new Voice(notes["E4"]);
const f7 = new Voice(notes["D4"]);
const f8 = new Voice(notes["C3"]);
*/

//this.adsr = new Float32Array([0.0,0.0,0.0,0.0]);
