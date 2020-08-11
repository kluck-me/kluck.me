/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let pp = function (...args) {
  self.postMessage({ type: 'debug', value: args });
};

const time = function (fn) {
  const t = Date.now();
  fn();
  return Date.now() - t;
};

class PriorityQueue {
  constructor() {
    this.data = [];
  }

  push(item) {
    this.data.push(item);
    this._up(this.data.length - 1);
  }

  pop() {
    if (!this.data.length) {
      return;
    }
    const top = this.data[0];
    if (this.data.length - 1 > 0) {
      this.data[0] = this.data[this.data.length - 1];
      this._down(0);
    }
    this.data.pop();
    return top;
  }

  _up(pos) {
    const item = this.data[pos];

    while (pos > 0) {
      const parent = (pos - 1) >> 1;
      const current = this.data[parent];
      if (item.compareTo(current) >= 0) {
        break;
      }
      this.data[pos] = current;
      pos = parent;
    }

    this.data[pos] = item;
  }

  _down(pos) {
    const item = this.data[pos];
    const halfLength = this.data.length >> 1;

    while (pos < halfLength) {
      let left = (pos << 1) + 1;
      const right = left + 1;
      let best = this.data[left];
      if (right < this.data.length && this.data[right].compareTo(best) < 0) {
        left = right;
        best = this.data[right];
      }
      if (best.compareTo(item) >= 0) {
        break;
      }
      this.data[pos] = best;
      pos = left;
    }

    this.data[pos] = item;
  }
}

class Puzzle {
  static initClass() {
    this.MOVES = [
      { x: 0, y: -1, path: 'u' },
      { x: 1, y: 0, path: 'r' },
      { x: 0, y: 1, path: 'd' },
      { x: -1, y: 0, path: 'l' },
    ];
  }

  static validateBoard(board) {
    if (!Array.isArray(board)) {
      throw new Error('board is broken');
    }
    const height = board.length;
    if (!height) {
      throw new Error('board is broken');
    }
    const width = board[0].length;
    if (!width) {
      throw new Error('board is broken');
    }
    if (!board.every((a) => a.length === width && a.every((v) => typeof v === 'number'))) {
      throw new Error('board should be two-dimensional array');
    }
  }

  clone() {
    const p = new Puzzle();
    for (let k in this) {
      const v = this[k];
      if (this.hasOwnProperty(k)) {
        p[k] = v && typeof v === 'object' ? v.concat() : v;
      }
    }
    return p;
  }

  setBoard(board) {
    Puzzle.validateBoard(board);
    this.height = board.length;
    this.width = board[0].length;
    this.panel = [];
    this.space = -1;
    this.path = '';
    let i = 0;
    for (let y = 0, end = this.height; y < end; y++) {
      for (let x = 0, end1 = this.width; x < end1; x++) {
        if (board[y][x] === 0) {
          this.panel[i] = this.height * this.width;
          this.space = i;
        } else {
          this.panel[i] = board[y][x];
        }
        i += 1;
      }
    }
    if (this.space === -1) {
      throw new Error('space not found');
    }
    if (
      !this.panel
        .concat()
        .sort((a, b) => a - b)
        .every((v, i) => v === i + 1)
    ) {
      throw new Error('panel is broken');
    }
    this.setCalculatedDistance();
  }

  calcManhattanDistance(i1, i2) {
    const x1 = i1 % this.width;
    const y1 = (i1 / this.width) | 0;
    const x2 = i2 % this.width;
    const y2 = (i2 / this.width) | 0;
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  setCalculatedDistance() {
    this.distance = 0;
    for (let i = 0, end = this.panel.length; i < end; i++) {
      if (i !== this.space) {
        this.distance += this.calcManhattanDistance(i, this.panel[i] - 1);
      }
    }
    this.estimate = this.distance;
    this.cost = 0;
  }

  moveSpace(x, y) {
    const i = x + y * this.width;
    this.distance += this.calcManhattanDistance(this.space, this.panel[i] - 1);
    this.distance -= this.calcManhattanDistance(i, this.panel[i] - 1);
    this.panel[this.space] = this.panel[i];
    this.panel[i] = this.height * this.width;
    this.space = i;
  }

  compareTo(other) {
    return this.estimate - other.estimate;
  }

  toString() {
    return this.panel.join(',');
  }
}
Puzzle.initClass();

const finder = function (board) {
  const done = {};
  const q = new PriorityQueue();
  let p = new Puzzle();
  p.setBoard(board);
  p.estimate = p.distance;
  q.push(p);

  while (q.data.length) {
    p = q.pop();
    if (p.distance === 0) {
      return p.path;
    }
    done[p] = true;

    const sx = p.space % p.width;
    const sy = (p.space / p.width) | 0;

    for (let move of Puzzle.MOVES) {
      const nx = sx + move.x;
      const ny = sy + move.y;
      if (nx < 0 || p.width <= nx || ny < 0 || p.height <= ny) {
        continue;
      }
      const p2 = p.clone();
      p2.moveSpace(nx, ny);
      if (done[p2]) {
        continue;
      }
      p2.cost += 1;
      p2.estimate = p2.distance + p2.cost;
      p2.path += move.path;
      q.push(p2);
    }
  }

  return null;
};

if (typeof self !== 'undefined') {
  self.addEventListener(
    'message',
    function (e) {
      pp(
        time(function () {
          try {
            self.postMessage({ type: 'result', value: finder(e.data.board) });
          } catch (error) {
            e = error;
            self.postMessage({ type: 'error', value: e.message });
          }
        })
      );
      self.postMessage({ type: 'finish' });
    },
    false
  );
} else {
  pp = console.log.bind(console);
  pp(
    time(function () {
      pp(
        finder([
          [1, 7, 2, 4],
          [6, 0, 14, 3],
          [13, 10, 11, 8],
          [5, 9, 15, 12],
        ])
      );
    })
  );
}
