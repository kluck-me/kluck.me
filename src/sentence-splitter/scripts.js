/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
window.vm = new Vue({
  el: '#vue',
  data: {
    text: '',
    limit_config: '10000',
    regex_config: '\\n|[。！？）｠」』］〛｝〕〙〉》】〗]+',
    blocks: [],
  },
  computed: {
    input() {
      return this.text.trim().replace(/\r\n?/, '\n');
    },
    limit() {
      return +this.limit_config;
    },
    regex() {
      try {
        return new RegExp(this.regex_config, 'g');
      } catch (error) {}
    },
  },
  methods: {
    submit() {
      let m;
      this.blocks = [];
      if (!this.input || !this.limit || !this.regex) {
        return;
      }

      const indexes = [0];
      while ((m = this.regex.exec(this.input))) {
        indexes.push(m.index + 1);
      }
      const parts = indexes.map((index, i) => this.input.slice(index, indexes[i + 1]));

      const blocks = [''];
      let target = 0;
      let count = 0;
      for (let part of parts) {
        if (count + part.length > this.limit) {
          target = blocks.push('') - 1;
        }
        blocks[target] += part;
        count = blocks[target].length;
      }
      this.blocks = blocks;
    },
    copy(evt) {
      evt.target.text.focus();
      evt.target.text.select();
      document.execCommand('copy');
    },
  },
  mounted() {
    return;
    if (location.hostname === 'localhost') {
      this.text = `${'a'.repeat(10)}.${'a'.repeat(10)}.!${'a'.repeat(40)}.${'a'.repeat(
        10
      )}.!${'a'.repeat(10)}`;
      this.limit_config = '30';
      this.regex_config = '\\.(?!!)|!';
      this.submit();
    }
  },
});
