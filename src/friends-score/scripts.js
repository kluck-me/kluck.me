/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const crc32 = require('./crc32.js');

const hashed_scoring_users = (function() {
  const code = require('./code.js');
  const h = {};
  code.split('x').forEach(function(hashes, score) {
    score = (score + 1) / 2.0;
    for (let hash of hashes.match(/.{8}/g) || []) {
      h[hash] = score;
    }
  });
  return h;
})();

window.vm = new Vue({
  el: '#vue',
  data: {
    input: '',
  },
  computed: {
    score() {
      const name = this.input.trim().replace(/^@/, '');
      const hash = `00000000${crc32(name.toLowerCase()).toString(16)}`.slice(-8);
      return hashed_scoring_users[hash] || 0;
    },
  },
  methods: {
    star(v) {
      if (v >= 1) {
        return 'fa-star';
      } else if (1 > v && v >= 0.5) {
        return 'fa-star-half-o';
      } else {
        return 'fa-star-o';
      }
    },
  },
  mounted() {
    if (location.hostname === 'localhost') {
      this.input = 'kluck_me';
    }
  },
});
