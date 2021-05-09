const seqArr = [];
const ls = "localSeqArr";

const store = {
  add(x, y) {
    seqArr.push({ x, y });
  },
  remove(i) {
    seqArr.splice(i, 1);
  },
  toggle(x, y) {
    let i = seqArr.findIndex((seq) => seq.x === x && seq.y === y);
    if (i < 0) {
      this.add(x, y);
    } else {
      this.remove(i);
    }
  },

  reset() {
    seqArr.length = 0;
  },

  getSequence(name) {
    const seqArr = this.getStore();
    if (seqArr.length < 0) {
      return null;
    }
    return seqArr.find((seq) => seq.name === name);
  },

  getStore() {
    const seqArr = JSON.parse(localStorage.getItem(ls));
    return seqArr ? seqArr : [];
  },

  setStore(seqArr = []) {
    localStorage.setItem(ls, JSON.stringify(seqArr));
  },

  saveToStore(seqName = "sequence") {
    let storeSeq = this.getStore();
    let seqInfo = { name: `${seqName}_${storeSeq.length}`, seqArr };
    storeSeq.push(seqInfo);
    this.setStore(storeSeq);
  },

  deleteFromStore(seqName) {
    let storeSeq = this.getStore();
    let i = storeSeq.findIndex((l) => l.name === seqName);
    storeSeq.splice(i, 1);
    this.setStore(storeSeq);
  },
};
export default store;
