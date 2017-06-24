import $ from 'jquery'
import press from './run'

const columns = 16,
    bpm = 120,
    ms = 60000/bpm,
    eightN = ms/2;

const doc = $(document)
const parent = doc.find("#sequencer")
const matrix = parent.find("#matrix")
const reset = parent.find("#reset")
const play = parent.find("#play")
const stop = parent.find("#stop")
const row = [".r0", ".r1", ".r2", ".r3", ".r4", ".r5", ".r6", ".r7", ".r8", ".r9"]
let square

export {row, columns, parent, play, stop, eightN }

export const seq = {
      init() {
          seq.buildSequencer();
          seq.bindEvent();
          seq.fadeIn();
      },
      buildSequencer() {
          //build rows
          for (let i = 9; i >= 0; i--) {
            matrix.prepend(`<div class='row r${i}'></div>`);
          }
          //build columns
          row.map((x) => {
            for (let i = columns; i > 0; i--) {
              $(x).prepend(`<div class="square"></div>`);
            }
          });
          square = parent.find(".square")
      },
      bindEvent() {
          play.click(press.play);
          stop.click(press.stop);
          reset.click(seq.reset);
          square.mousedown(seq.paint);
          seq.paintDrag();
      },
      paint() {
          $(this).toggleClass("square-active");
      },
      paintDrag() {
          doc.mousedown(() => {
            matrix.on("mouseover", ".square", function(){
              $(this).toggleClass("square-active");
            });
          }).mouseup(() => {
              matrix.off("mouseover");
            });
      },
      reset() {
          square.removeClass("square-active");
      },
      fadeIn(){
        parent.fadeIn(600);
      }
};
