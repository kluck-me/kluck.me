/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Solver = require('../common/solver.js');

const get_results = function (board, actions) {
  const moves = {
    u: { x: 0, y: -1 },
    r: { x: 1, y: 0 },
    d: { x: 0, y: 1 },
    l: { x: -1, y: 0 },
  };
  const results = [];

  const iterable = `${actions}_`.split('');
  for (let i = 0; i < iterable.length; i++) {
    const next_action = iterable[i];
    const prev_result = results[i - 1];
    if (prev_result) {
      board = JSON.parse(JSON.stringify(prev_result.board));
      const step = prev_result.next_step;
      board[step.y0][step.x0] = board[step.y1][step.x1];
      board[step.y1][step.x1] = 0;
    }

    let next_step = null;
    const move = moves[next_action];
    if (move) {
      var x, y;
      var end;
      let space = null;
      for (y = 0, end = board.length; y < end; y++) {
        if (!space) {
          var end1;

          for (x = 0, end1 = board[y].length; x < end1; x++) {
            if (!space) {
              if (!board[y][x]) {
                space = { x, y };
              }
            }
          }
        }
      }
      next_step = {
        x0: space.x,
        y0: space.y,
        x1: space.x + move.x,
        y1: space.y + move.y,
      };
    }

    results.push({ board, next_step });
  }

  return results;
};

window.vm = new Vue({
  el: '#vue',
  data: {
    solver: new Solver(
      () => new Worker(new URL('./solver.js', import.meta.url), { type: 'module' })
    ),
    input: `\
 1  7  2  4
 6  0 14  3
13 10 11  8
 5  9 15 12\
`,
    results: null,
    index: 0,
    error: null,
  },
  computed: {
    board() {
      return this.input
        .trim()
        .split('\n')
        .map((line) =>
          line
            .trim()
            .split(/\D+/)
            .map((v) => parseInt(v, 10))
        );
    },
    result() {
      return this.results && this.results[this.index];
    },
  },
  methods: {
    get_board_style(board) {
      return { width: `${board[0].length * 2}em`, height: `${board.length * 2}em` };
    },
    get_panel_style(x, y) {
      return { left: `${x * 2}em`, top: `${y * 2}em` };
    },
    submit() {
      if (this.solver.worker) {
        this.solver.stop();
      } else {
        this.error = null;
        this.actions = null;
        this.index = 0;
        this.solver.run({ board: this.board }, (err, actions) => {
          if (err) {
            this.results = null;
            this.error = err;
          } else {
            this.results = get_results(this.board, actions);
          }
        });
      }
    },
  },
  mounted() {
    if (location.hostname === 'localhost') {
      this.submit();
    }
  },
});
