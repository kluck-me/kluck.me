/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
window.countdown = (function () {
  const patterns = ['s', 'm', 'h', 'd', 'y'];
  const formatReg = /{(.*?)%([a-z])(.*?)}/g;
  return function (str, time) {
    const cache = {};
    const iterable = [60, 60, 24, 365, 0];
    for (let i = 0; i < iterable.length; i++) {
      const v = iterable[i];
      const k = patterns[i];
      if (v) {
        time -= cache[k] = time % v;
        time /= v;
      } else {
        cache[k] = time;
      }
    }
    return str.replace(formatReg, function (_, _1, _2, _3) {
      if (cache[_2]) {
        return `${_1}${cache[_2]}${_3}`;
      } else {
        return '';
      }
    });
  };
})();
