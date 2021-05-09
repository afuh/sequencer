import $ from "jquery";
import press from "./run";
import store from "./store";

const columns = 16,
  bpm = 120,
  ms = 60000 / bpm,
  eightN = ms / 2;

const doc = $(document);
const parent = doc.find("#sequencer");
const matrix = parent.find("#matrix");
const reset = parent.find("#reset");
const play = parent.find("#play");
const stop = parent.find("#stop");
const save = parent.find("#save");
const load = parent.find("#store");
const row = [
  ".r0",
  ".r1",
  ".r2",
  ".r3",
  ".r4",
  ".r5",
  ".r6",
  ".r7",
  ".r8",
  ".r9",
];
let square;

export { row, columns, parent, play, stop, eightN };

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
    square = parent.find(".square");
    //get stored sequences
    seq.initStore();
  },
  bindEvent() {
    play.click(press.play);
    stop.click(press.stop);
    reset.click(seq.reset);
    save.click(seq.save);
    load.click(seq.load);
    square.mousedown(seq.paint);
    seq.paintDrag();
  },

  initStore() {
    load.children().remove()
    store.getStore().forEach((seq) => {
      load.prepend(`<p id="${seq.name}">${seq.name}
        <i data-option="load" class="fa fa-arrow-up"></i>  <i data-option="delete" class="fa fa-times"></i>
      </p>`);
    });
  },

  paint() {
    $(this).toggleClass("square-active");
    store.toggle($(this).parent().index(), $(this).index());
  },

  load(e) {
    square.removeClass("square-active");
    const el = e.target;
    const option = $(el).data().option;
    const seqName = $(el).parent()[0].id;
    if (option === "load") {
      let seq = store.getSequence(seqName);
      seq.seqArr.forEach(({ x, y }) => {
        let el = $(`.r${x}`).children()[y];
        $(el).toggleClass("square-active");
        store.toggle($(el).parent().index(), $(el).index());
      });
    }
    if (option === "delete") {
      store.deleteFromStore(seqName);
      seq.initStore()
    }
  },
  paintDrag() {
    doc
      .mousedown(() => {
        matrix.on("mouseover", ".square", function () {
          $(this).toggleClass("square-active");
          store.toggle($(this).parent().index(), $(this).index());
        });
      })
      .mouseup(() => {
        matrix.off("mouseover");
      });
  },
  reset() {
    square.removeClass("square-active");
    store.reset();
  },
  save() {
    store.saveToStore();
    seq.initStore();
  },
  fadeIn() {
    parent.fadeIn(600);
  },
};
