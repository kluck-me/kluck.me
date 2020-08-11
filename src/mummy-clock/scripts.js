/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
window.vm = new Vue({
  el: '#vue',
  data: {
    clocks: [],
  },
  methods: {
    update() {
      let middle;
      const now = moment();
      const jpt = now.clone().tz('Asia/Tokyo');
      const ust = now.clone().tz('America/Los_Angeles');
      this.clocks = [
        { time: jpt },
        { time: 6 <= (middle = jpt.hour()) && middle < 22 ? jpt : ust, tz: 'MLT' },
        { time: ust },
      ];
      this.clocks.forEach(function (clock) {
        if (!clock.tz) {
          clock.tz = clock.time.format('z');
        }
        if (!clock.tz_name) {
          clock.tz_name = {
            JST: '日本標準時',
            PST: '太平洋標準時',
            PDT: '太平洋夏時間',
            MLT: 'マミー生活時間',
          }[clock.tz];
        }
      });
    },
  },
  mounted() {
    setInterval(() => {
      return this.update();
    }, 500);
    this.update();
  },
});
