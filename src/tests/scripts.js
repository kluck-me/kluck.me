/*
 * decaffeinate suggestions:
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
window.vm = new Vue({
  el: '#vue',
  data: {
    loading: false,
    contents: [],
  },
  methods: {
    load() {
      this.loading = true;
      $.getJSON('https://api.github.com/repos/kluck-me/kluck.me/contents/src/tests').then(
        (contents) => {
          const ext_reg = /\.pug$/;
          this.contents = (() => {
            const result = [];
            for (let content of contents) {
              if (ext_reg.test(content.name)) {
                const label = content.name.replace(ext_reg, '');
                result.push({
                  label,
                  href: `${label}.html`,
                });
              }
            }
            return result;
          })();
          this.loading = false;
        },
      );
    },
  },
  mounted() {
    this.load();
  },
});
