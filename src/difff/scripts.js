/*
 * decaffeinate suggestions:
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const tolf = (s) => s.replace(/\r\n?/g, '\n');
const h = (s) => ('' + s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mark = (lines) =>
  lines
    .split('\n')
    .map((line) => `<mark class=\"alert-primary\">${h(line)}</mark>`)
    .join('\n');

window.vm = new Vue({
  el: '#vue',
  data: {
    inputs: [
      `\
下記の文章を比較してください。
   Betty Botter bought some butter, 
But, she said, this butter's bitter;
If I put it in my batter,
It will make my batter bitter,
But a bit of better butter
Will make my batter better.
So she bought a bit of butter
Better than her bitter butter,
And she put it in her batter,
And it made her batter better,
So 'twas better Betty Botter
Bought a bit of better butter.\
`,
      `\
下記の文章を，ﾋﾋ較してくだちい．
Betty Botter bought some butter,
but, she said, the butter's bitter;
If I put it in my batter,
That will make my batter bitter.
But a bit of better butter, 
That will make my batter better.
So she bought a bit of butter
Better than her bitter butter.
And she put it in her batter,
And it made her batter better.
So it was better Betty Botter
Bought a bit of better butter.\
`,
    ],
    row_htmls: [],
    stats: [],
    global_stat: null,
  },
  methods: {
    diff() {
      let input;
      const inputs = (() => {
        const result = [];
        for (input of this.inputs) {
          result.push(tolf(input));
        }
        return result;
      })();
      const stats = (() => {
        const result1 = [];
        for (input of inputs) {
          const char_count = input.replace(/\s+/g, '').length;
          const char_and_space_count = input.replace(/\n+/g, '').length;
          result1.push({
            char_count,
            space_count: char_and_space_count - char_count,
            line_count: input.length - char_and_space_count,
            word_count: input.split(/\s+/).filter((w) => w.length).length,
          });
        }
        return result1;
      })();
      const changes = Diff.diffChars(`${inputs[0]}\n`, `${inputs[1]}\n`);
      if (process.env.NODE_ENV === 'development') {
        pp(changes);
      }
      const change_names = ['removed', 'added'];
      const row_htmls = [];
      const out_htmls = ['', ''];
      const global_stat = {
        same_char_count: 0,
        total_char_count: 0,
        same_line_count: 0,
        total_line_count: 0,
      };
      let change_char_counts = [0, 0];
      for (let c of changes) {
        var i;
        const l = c.value.replace(/\s+/g, '').length;
        if (c.removed) {
          change_char_counts[0] += l;
        } else if (c.added) {
          change_char_counts[1] += l;
        } else {
          global_stat.same_char_count += l;
          global_stat.total_char_count += l + Math.max.apply(this, change_char_counts); // Math.max(...change_char_counts)
          change_char_counts = [0, 0];
        }
        for (i = 0; i < change_names.length; i++) {
          const change_name = change_names[i];
          if (!c[change_names[1 - i]]) {
            out_htmls[i] += c[change_name] ? mark(c.value) : h(c.value);
          }
        }
        while (true) {
          const col_matches = out_htmls.map((out_html) => /^.*\n/.exec(out_html));
          if (!col_matches[0] && !col_matches[1]) {
            break;
          }
          const col_htmls = ['', ''];
          for (i = 0; i < col_matches.length; i++) {
            const col_match = col_matches[i];
            if (col_match) {
              col_htmls[i] = col_match[0];
              out_htmls[i] = out_htmls[i].slice(col_match[0].length);
            }
          }
          if (col_htmls[0] === col_htmls[1]) {
            global_stat.same_line_count += 1;
          }
          global_stat.total_line_count += 1;
          row_htmls.push(col_htmls);
        }
      }
      global_stat.total_char_count += Math.max.apply(this, change_char_counts); // Math.max(...change_char_counts)
      this.stats = stats;
      this.global_stat = global_stat;
      this.row_htmls = row_htmls;
    },
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      this.diff();
    }
  },
});
