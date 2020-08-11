const pseudoColoring = (ctx) => {
  // TODO: Care Full color image
  const imData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const { data } = imData;
  for (let i = 0; i < data.length; i += 4) {
    const l = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    [l + 39, l + 14, l - 36].forEach((v, j) => {
      data[i + j] = Math.max(0, Math.min(v, 255));
    });
    if (l > 240 || l <= 10) {
      data[i] = l;
      data[i + 1] = l;
      data[i + 2] = l;
    } else if (l > 200) {
    } else if (l > 150) {
      data[i + 1] -= 50;
      data[i + 2] -= 50;
    } else if (l > 100) {
      data[i] -= 50;
      data[i + 2] -= 50;
    } else {
      data[i] -= 50;
      data[i + 1] -= 50;
      data[i + 2] += 100;
    }
  }
  ctx.putImageData(imData, 0, 0);
};

window.vm = new Vue({
  el: '#vue',
  data: {
    selectedPath: '',
    uploadedPath: '',
    uploadedName: '',
    examplePaths:
      location.hostname === 'localhost'
        ? [
            require('./ss124-178-179.png'),
            require('./te3-106-107.png'),
            require('./rd63-14-15.png'),
            require('./gs1-14-15.png'),
            require('./ne1-6-7.png'),
            require('./wy9-640-641.png'),
            require('./fh22-4-5.png'),
            require('./ao1-2-3.png'),
            require('./ya1-8-9.png'),
            require('./mm1-14-15.png'),
            require('./ts1-2-3.png'),
            require('./tk9-10-11.png'),
            require('./st63-2-3.png'),
            require('./tt75-4-5.png'),
            require('./rm17-34-35.png'),
          ]
        : [],
  },
  methods: {
    update() {
      const path = this.selectedPath || this.uploadedPath;
      if (!path) return;

      const { canvas } = this.$refs;
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        pseudoColoring(ctx);
      };
      img.src = path;
    },
    uploadImage(evt) {
      const file = evt.target.files[0];
      if (!file) return;
      this.uploadedName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedPath = reader.result;
        this.update();
      };
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    if (location.hostname === 'localhost') {
      this.selectedPath = this.examplePaths[0];
      this.update();
    }
  },
});
