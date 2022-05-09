/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Solver = require('../common/solver.js');

const calc_exprs_score = function (expr) {
  let score = 0;
  const table = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 10, '√': 11, '!': 12 };
  for (let c of expr.replace(/[\d()]+/g, '')) {
    score += table[c] || 20;
  }
  return score * 100 + expr.length;
};

window.vm = new Vue({
  el: '#vue',
  data: {
    solver: new Solver(
      () => new Worker(new URL('./solver.js', import.meta.url), { type: 'module' })
    ),
    input: '',
    exprs: [],
  },
  computed: {
    output() {
      return this.exprs.join('\n');
    },
    numbers() {
      const m = this.input.match(/[+-]?\d+/g);
      if (m) {
        return m.filter((n) => n.length === 1).map((n) => parseInt(n, 10));
      } else {
        return [];
      }
    },
    runnable() {
      return this.numbers.length === 4;
    },
  },
  methods: {
    submit() {
      if (this.solver.worker) {
        this.solver.stop();
      } else if (this.runnable) {
        const cache = {};
        this.exprs = [];
        this.solver.run({ numbers: this.numbers, answer: 10 }, (err, expr) => {
          if (!cache[expr]) {
            cache[expr] = calc_exprs_score(expr);
            this.exprs.push(expr);
            this.exprs.sort((a, b) => cache[a] - cache[b]);
          }
        });
      }
    },
  },
  mounted() {
    if (location.hostname === 'localhost') {
      this.input = '5,0,2,6';
      this.submit();
    }
  },
});
