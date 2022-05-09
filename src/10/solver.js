/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const pp = function (...args) {
  self.postMessage({ type: 'debug', value: args });
};

const time = function (fn) {
  const t = Date.now();
  fn();
  return Date.now() - t;
};

class Node {
  static nuddyBoth(a, b) {
    while (a.value === b.value && a.type === b.type && a.type !== 'number' && !a.right) {
      a = a.left;
      b = b.left;
    }
    return [a, b];
  }

  constructor(type, value, left, right) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
  clone() {
    return new Node(this.type, this.value, this.left, this.right);
  }
  nuddy() {
    let node = this;
    while (node.type !== 'number' && !node.right) {
      node = node.left;
    }
    return node;
  }
  minus() {
    switch (this.type) {
      case 'minus':
        return this.left.clone(); // -(-x) -> x
      case 'add':
        return this.left.minus()[this.type](this.right.minus()); // -(a+b) -> (-a)+(-b)
      case 'mul':
      case 'div':
        return this.left.minus()[this.type](this.right); // -(a*b) -> (-a)*b
      default:
        // -((-a)^(2b+1)) -> a^(2b+1)
        if (this.type === 'pow' && this.left.value < 0 && this.right.value % 2 === 1) {
          return this.left.minus().pow(this.right);
        }
        // -0 -> 0
        if (this.value === 0) {
          return this.clone();
        }
        return new Node('minus', -this.value, this.clone());
    }
  }
  hasMinus() {
    switch (this.type) {
      case 'minus':
        return true;
      case 'add':
        return this.left.hasMinus() && this.right.hasMinus();
      case 'mul':
      case 'div':
        return this.left.hasMinus() || this.right.hasMinus();
      default:
        return false;
    }
  }
  sqrtable() {
    return this.value > 0 && this.value !== 1 && isFinite(this.value);
  } // /1 == 1, Not support: /-1, /inf
  sqrt() {
    return new Node('sqrt', Math.sqrt(this.value), this.clone());
  }
  factable() {
    return (
      (this.value === 0 || this.value > 2) &&
      isFinite(this.value) &&
      Math.round(this.value) === this.value
    );
  } // 1! == 1, 2! == 2, Not support: inf!, 1.5!
  fact() {
    let v = 1;
    for (let i = 1, end = this.value; i <= end; i++) {
      if (!isFinite(v)) {
        break;
      }
      v *= i;
    }
    return new Node('fact', v, this.clone());
  }
  calcable(other) {
    return isFinite(this.value) === isFinite(other.value);
  }
  add(other) {
    if (this.type === 'minus' && this.value === -other.value) {
      return this.minus().sub(other);
    } // -a+a -> a-a
    if (other.type === 'minus') {
      return this.sub(other.minus());
    } // a+(-b) -> a-b
    return new Node('add', this.value + other.value, this.clone(), other.clone());
  }
  sub(other) {
    let that;
    [that, other] = Array.from(Node.nuddyBoth(this, other)); // f(a)-f(a) -> a-a
    return new Node('add', that.value - other.value, that.clone(), other.minus());
  }
  mul(other) {
    let that = this;
    if (that.value === 0) {
      other = other.nuddy();
    } // 0*f(b) -> 0*b
    if (other.value === 0) {
      that = that.nuddy();
    } // f(a)*0 -> a*0
    const method = other.hasMinus() ? 'minus' : 'clone'; // a*(-b) -> (-a)*b
    return new Node('mul', this.value * other.value, that[method](), other[method]());
  }
  div(other) {
    let that;
    [that, other] = Array.from(Node.nuddyBoth(this, other)); // f(a)/f(a) -> a/a
    const method = other.hasMinus() ? 'minus' : 'clone'; // a/(-b) -> (-a)/b
    return new Node('div', that.value / other.value, that[method](), other[method]());
  }
  powable(other) {
    return this.value === 0 || Math.abs(Math.pow(this.value, other.value)) > 1e-10;
  } // Not support: a^-inf
  pow(other) {
    let that = this;
    if (Math.abs(that.value) === 1) {
      other = other.nuddy();
    } // 1^f(b) -> 1^b
    if (other.value === 0) {
      that = that.nuddy();
    } // f(a)^0 -> a^0
    const method = that.value < 0 && other.value % 2 === 0 ? 'minus' : 'clone'; // (-a)^(2b) -> a^(2b)
    return new Node('pow', Math.pow(that.value, other.value), that[method](), other.clone());
  }
  toString(parentOp = '') {
    let result;
    switch (this.type) {
      case 'number':
        return this.value.toString();
      case 'minus':
        result = `-${this.left.toString('-')}`;
        break;
      case 'sqrt':
        result = `\u221a${this.left.toString('@')}`;
        break;
      case 'fact':
        result = `${this.left.toString('@')}!`;
        break;
      case 'add':
        var rightResult = this.right.toString('+');
        if (rightResult[0] !== '-') {
          rightResult = `+${rightResult}`;
        }
        result = `${this.left.toString('+')}${rightResult}`;
        if (parentOp !== '' && parentOp !== '+') {
          return `(${result})`;
        }
        break;
      case 'mul':
      case 'div':
        var resultOp = { mul: '*', div: '/' }[this.type];
        var stringOp = resultOp; // if parentOp == '/' then parentOp else resultOp
        result = `${this.left.toString(stringOp)}${resultOp}${this.right.toString(stringOp)}`;
        if (resultOp === '/' && parentOp === '/') {
          return `(${result})`;
        }
        break;
      case 'pow':
        result = `${this.left.toString('@')}^${this.right.toString('@')}`;
        break;
      default:
        new Error(`not support: ${this.type}`);
    }
    if (parentOp === '@') {
      return `(${result})`;
    }
    return result;
  }
}

const expandUnary = function (x, fn) {
  if (x.sqrtable()) {
    fn(x.sqrt());
  }
  if (x.factable()) {
    fn(x.fact());
  }
};

var generateUnary = function (level, x, fn) {
  fn(x);
  fn(x.minus());
  if (level > 0) {
    expandUnary(x, function (y) {
      generateUnary(level - 1, y, fn);
    });
  }
};

const generateBinary = function (level, as, bs, fn) {
  generateExpr(level, as, function (a) {
    generateExpr(level, bs, function (b) {
      if (!a.calcable(b)) {
        return;
      }
      fn(a.add(b));
      fn(a.sub(b));
      fn(a.mul(b));
      if (a.value !== 0 && Math.abs(b.value) !== 1) {
        fn(a.div(b));
      } // 0*x == 0/x, x*1 == x/1
      if (level > 0 && a.value !== 0 && b.value !== 1 && a.powable(b)) {
        fn(a.pow(b));
      } // 0*x == 0^x, x*1 == x^1
    });
  });
};

var generateExpr = function (level, xs, fn) {
  switch (xs.length) {
    case 0:
      throw new Error();
    case 1:
      generateUnary(level, xs[0], fn);
      break;
    default:
      for (let i = 1, end = xs.length; i < end; i++) {
        generateBinary(
          level,
          xs.slice(0, i),
          xs.slice(i, +xs.length + 1 || undefined),
          function (x) {
            generateUnary(level, x, fn);
          }
        );
      }
  }
};

const finder = function (answer, numbers, level, fn) {
  let found = false;
  generateExpr(
    level,
    numbers.map((n) => new Node('number', n)),
    function (x) {
      if (answer === x.value) {
        found = true;
        fn(x);
      }
    }
  );
  return found;
};

self.addEventListener(
  'message',
  function (e) {
    pp(
      time(function () {
        const fn = function (x) {
          self.postMessage({ type: 'result', value: x.toString() });
        };
        for (let i = 0; i <= 3; i++) {
          if (finder(e.data.answer, e.data.numbers, i, fn)) {
            break;
          }
        }
      })
    );
    self.postMessage({ type: 'finish' });
  },
  false
);
