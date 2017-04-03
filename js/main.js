var columns = 16,
    init,
    bpm = 120,
    ms = 60000/bpm,
    eightN = ms/2;

$(document).ready(function(){
  stepInit();
  click();
});

// resets all
var resetAll = function() {
  $(".square").removeClass("square-active");
};

// Create and populate the matrix
var stepInit = function() {
  for (var i = columns; i > 0; i--) {
    $(".f0, .f1, .f2, .f3, .f4, .f5, .f6, .f7, .f8, .f9").prepend("<div class=\"square\">"  +  "</div>");
  }
};

//paint blocks
var click = function(){
  $(".square").mousedown(function(){
    $(this).toggleClass("square-active");
  });
  //bind
  $(document).mousedown(function(){
    $(".square").bind("mouseover", function(){
      $(this).toggleClass("square-active");
    });
  }).mouseup(function(){
    $(".square").unbind("mouseover");
  });
};

// Play // Stop
var controls = (function(){
  var contr = {};
  var curr = 1;

  contr.play = function(){ /// PLAY ///
    $("#play").hide();
    $("#stop").show();

    function col(n) {
      var loc =  " div:nth-child(" + columns + "n+" + n + ")";

      //column style
      $(".fila" + loc).addClass("colorOn")
            .delay(eightN)
            .queue(function(){
              $(this).removeClass("colorOn")
              .dequeue();
            });

    //Notes
    const fn = [".f0", ".f1", ".f2", ".f3", ".f4", ".f5", ".f6", ".f7", ".f8", ".f9"];

      const mapa = function(v) {
        return v.map(function(v, i) {
          if ($(v + loc).hasClass("square-active")) {
            note["f" + i].play()
          }
        });
      }
      mapa(fn);
    };

    init = setInterval(function(){
      if (curr >= 1 && curr <= columns -1) {
        col(curr);
        curr++;
      }
      else {
        col(columns);
        curr = 1;
      }
    }, eightN); /**** TEMPO ****/
  };

  contr.stop = function() { /// STOP ///
    $("#stop").hide();
    $("#play").show();

    clearInterval(init);
    };
    return contr;
})();
