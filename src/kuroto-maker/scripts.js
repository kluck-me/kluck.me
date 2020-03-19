const fill_circle = function(ctx, x, y, size) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
};

const fill_spiral_circle = function(ctx, x0, y0, stv, ssize) {
  const tv = parseFloat(stv);
  const a = 6 / Math.PI;
  const t = Math.PI * tv;
  const r = a * t;
  fill_circle(ctx, x0 + r * Math.cos(t), y0 + r * Math.sin(t), parseFloat(ssize));
};

const inital_data = {
  left_eye_pos: '1.07',
  left_eye_size: '6',
  right_eye_pos: '1.07',
  right_eye_size: '6',
};

const img = new Image();
img.src = require('./kuroto.jpg');
img.onload = function() {
  window.vm = new Vue({
    el: '#vue',
    data: Object.assign({}, inital_data),
    methods: {
      update() {
        const { canvas } = this.$refs;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'black';
        fill_spiral_circle(ctx, 85, 172, this.left_eye_pos, this.left_eye_size);
        fill_spiral_circle(ctx, 179, 178, this.right_eye_pos, this.right_eye_size);

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
};
