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
      if ($(".f0" + loc).hasClass("square-active")) {
        f0.play();
      }
      if ($(".f1" + loc).hasClass("square-active")) {
        f1.play();
      }
      if ($(".f2" + loc).hasClass("square-active")) {
        f2.play();
      }
      if ($(".f3" + loc).hasClass("square-active")) {
        f3.play();
      }
      if ($(".f4" + loc).hasClass("square-active")) {
        f4.play();
      }
      if ($(".f5" + loc).hasClass("square-active")) {
        f5.play();
      }
      if ($(".f6" + loc).hasClass("square-active")) {
        f6.play();
      }
      if ($(".f7" + loc).hasClass("square-active")) {
        f7.play();
      }
      if ($(".f8" + loc).hasClass("square-active")) {
        f8.play();
      }
      if ($(".f9" + loc).hasClass("square-active")) {
        f9.play();
      }
    }

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
