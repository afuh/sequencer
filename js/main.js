const columns = 16,
    bpm = 120,
    ms = 60000/bpm,
    eightN = ms/2;

//Build sequencer
const seq = {
      init: function(config) {
          seq.el = {};
          seq.el.doc = $(document);
          seq.el.parent = seq.el.doc.find("#sequencer");
          seq.el.matrix = seq.el.parent.find("#matrix");
          seq.el.reset = seq.el.parent.find("#reset");
          seq.el.play = seq.el.parent.find("#play");
          seq.el.stop = seq.el.parent.find("#stop");
          seq.el.row = [".r0", ".r1", ".r2", ".r3", ".r4", ".r5", ".r6", ".r7", ".r8", ".r9"];
          seq.buildSequencer();
          seq.bindEvent();
      },
      buildSequencer: function() {
          //build rows
          for (let i = 9; i >= 0; i--) {
            seq.el.matrix.prepend("<div class='row r" + i + "'></div>");
          }
          //build columns
          seq.el.row.map((x) => {
            for (let i = columns; i > 0; i--) {
              $(x).prepend("<div class=\"square\"></div>");
            }
          });
          //add the class ".square" to seq.el after being created
          seq.el.square = seq.el.parent.find(".square");
      },
      bindEvent: function() {
          seq.el.square.mousedown(seq.paint);
          seq.el.reset.click(seq.reset);
          seq.paintDrag();
      },
      paint: function() {
          const item = $(this);
          item.toggleClass("square-active");
      },
      paintDrag: function() {
          seq.el.doc.mousedown(function(){
            seq.el.square.bind("mouseover", function(){
              $(this).toggleClass("square-active");
              });
            }).mouseup(function(){
              seq.el.square.unbind("mouseover");
            });
      },
      reset: function() {
          seq.el.square.removeClass("square-active");
      }
};

$(seq.init);

//Run the sequencer
const press = (function(){
      let count = 1;
      let init;
      const button = {};

      button.play = function() { /// PLAY ///
          seq.el.play.hide();
          seq.el.stop.show();

          const drawColumn = (n) => {
            const loc = " div:nth-child(" + columns + "n+" + n + ")";
            const col = seq.el.parent.find(".row" + loc);

            col.addClass("colorOn").delay(eightN).queue(function(){
              const item = $(this);
              item.removeClass("colorOn")
              .dequeue();
            });
            //When the orange column meet an orange square make sound
            const map = (col) => {
              col.map((col, i) => {
                if ($(col + loc).hasClass("square-active")) {
                  note["r" + i].play();
                }
              });
            };
            map(seq.el.row);
          };

          init = setInterval(function(){
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
          seq.el.stop.hide();
          seq.el.play.show();

          clearInterval(init);
          };
          return button;
})();
