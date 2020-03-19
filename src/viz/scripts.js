/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let instance = null;
const default_title = document.title;

window.vm = new Vue({
  el: '#vue',
  data: {
    input: '',
    running: false,
    playing: false,
  },
  methods: {
    run() {
      if (instance != null) {
        instance.exit();
      }
      instance = new Processing(this.$refs.canvas, this.input);
      this.running = true;
      this.playing = true;
    },
    pause() {
      this.playing = false;
      instance.noLoop();
    },
    play() {
      this.playing = true;
      instance.loop();
    },
    load(name) {
      $.get(`https://api.github.com/repos/kluck-me/kluck.me/contents/src/viz/${name}.pde`).then(
        (data) => {
          const source = window.atob(data.content);
          document.title = `${default_title} : ${name}`;
          this.input = source;
          this.run();
        }
      );
    },
  },
  mounted() {
    if (location.search) {
      this.load(location.search.replace(/^\?/, ''));
    }
  },
});
