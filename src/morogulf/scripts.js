const inital_data = {
  first_text: 'モロ湾',
  second_text: 'Moro Gulf',
};

window.vm = new Vue({
  el: '#vue',
  data: Object.assign({}, inital_data),
  methods: {
    update() {
      const { canvas } = this.$refs;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgb(170,191,218)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgb(105,122,148)';
      ctx.textAlign = 'center';

      ctx.font = '17px "M PLUS Rounded 1c"';
      ctx.fillText(this.first_text, canvas.width / 2 - 5, canvas.height / 2 + 8);

      ctx.font = 'italic 12px "M PLUS Rounded 1c"';
      ctx.fillText(this.second_text, canvas.width / 2 - 5, canvas.height / 2 + 23);

      this.$refs.download.href = canvas.toDataURL();
    },
    reset() {
      Object.assign(this, inital_data);
      this.update();
    },
  },
  mounted() {
    this.update();
  },
});
