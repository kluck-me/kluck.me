/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Solver {
  constructor(getWorker) {
    this.getWorker = getWorker;
    this.worker = null; // for vue
  }
  stop() {
    if (this.worker != null) {
      this.worker.terminate();
    }
    this.worker = null;
  }
  run(arg, fn) {
    if (!this.worker) {
      this.worker = this.getWorker();
      this.worker.addEventListener('message', (e) => {
        switch (e.data.type) {
          case 'result':
            fn(null, e.data.value);
            break;
          case 'error':
            fn(e.data.value);
            break;
          case 'finish':
            this.stop();
            break;
          case 'debug':
            console.log(...Array.from(e.data.value || []));
            break;
        }
      });
      this.worker.postMessage(arg);
    }
  }
}

module.exports = Solver;
