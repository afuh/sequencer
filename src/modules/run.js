import $ from 'jquery'
import { row, columns, parent, play, stop, eightN } from './build'
import { note } from './synth'
import context from './context'

let playing = false

//Run the sequencer
const press = (function(){
  let count = 1;
  let init;
  const button = {};

  button.play = function() { /// PLAY ///
    context.resume()
    play.hide();
    stop.show();

    const drawColumn = (n) => {
      const loc = ` div:nth-child(${columns}n+${n})`
      const col = parent.find(`.row${loc}`);

      col.addClass("colorOn").delay(eightN).queue(function(){
        $(this).removeClass("colorOn").dequeue();
      });
      //When the orange column meet an orange square make sound
      const map = (col) => {
        col.map((col, i) => {
          if ($(col + loc).hasClass("square-active")) {
            note["r" + i].play();
          }
        });
      };
      map(row);
    };

    init = setInterval(() => {
      if (count >= 1 && count <= columns -1) {
        drawColumn(count);
        count++;
      }
      else {
        drawColumn(columns);
        count = 1;
      }
    }, eightN); /**** TEMPO ****/
  };

  button.stop = function() { /// STOP ///
    stop.hide();
    play.show();

    clearInterval(init);
    };
    return button;
})();


// Space bar stop/play
$(window).keydown(e => {
  if (e.keyCode === 32) {
    e.preventDefault()
    playing = !playing

    if (playing) stop.click()
    else play.click()
  }
})


export default press
