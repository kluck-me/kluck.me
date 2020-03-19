/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const rand = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

const createTextImageData = function(str, w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'black';
  ctx.font = `${Math.min(h, w / str.length) * 0.75}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(str, w / 2, h / 2, w);
  return ctx.getImageData(0, 0, w, h);
};

const updateCaptcha = function(canvas, text, fgcolor, bgcolor) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const dst = ctx.getImageData(0, 0, w, h);
  const src = createTextImageData(text, w, h);

  // periods
  const rand1 = rand(750000, 1200000) / 10000000;
  const rand2 = rand(750000, 1200000) / 10000000;
  const rand3 = rand(750000, 1200000) / 10000000;
  const rand4 = rand(750000, 1200000) / 10000000;
  // phases
  const rand5 = rand(0, 3141592) / 500000;
  const rand6 = rand(0, 3141592) / 500000;
  const rand7 = rand(0, 3141592) / 500000;
  const rand8 = rand(0, 3141592) / 500000;
  // amplitudes
  const rand9 = rand(330, 420) / 110;
  const rand0 = rand(330, 450) / 110;

  const index = (x, y) => (x + y * w) * 4;

  for (let x = 0, end = w; x < end; x++) {
    for (let y = 0, end1 = h; y < end1; y++) {
      let bgratio = 1;
      const rsx = x + (Math.sin(x * rand1 + rand5) + Math.sin(y * rand3 + rand6)) * rand9;
      const rsy = y + (Math.sin(x * rand2 + rand7) + Math.sin(y * rand4 + rand8)) * rand0;
      const sx = Math.floor(rsx);
      const sy = Math.floor(rsy);

      if (0 <= rsx && rsx < w && 0 <= rsy && rsy < h) {
        var left, left1, left2, left3;
        const color00 = (left = src.data[index(sx, sy) + 2]) != null ? left : 255;
        const color10 = (left1 = src.data[index(sx + 1, sy) + 2]) != null ? left1 : 255;
        const color01 = (left2 = src.data[index(sx, sy + 1) + 2]) != null ? left2 : 255;
        const color11 = (left3 = src.data[index(sx + 1, sy + 1) + 2]) != null ? left3 : 255;
        const frsx0 = rsx - sx;
        const frsy0 = rsy - sy;
        const frsx1 = 1 - frsx0;
        const frsy1 = 1 - frsy0;
        const color = Math.min(
          255,
          color00 * frsx1 * frsy1 +
            color10 * frsx0 * frsy1 +
            color01 * frsx1 * frsy0 +
            color11 * frsx0 * frsy0
        );
        bgratio = color / 255;
      }

      const idx = index(x, y);
      for (let offset = 0; offset <= 2; offset++) {
        dst.data[idx + offset] = (1 - bgratio) * fgcolor[offset] + bgratio * bgcolor[offset];
      }
      dst.data[idx + 3] = 255;
    }
  }

  ctx.putImageData(dst, 0, 0);
};

const reload = function() {
  const text = $('#text').val();
  updateCaptcha(
    $('#captcha')[0],
    text,
    [rand(0, 100), rand(0, 100), rand(0, 100)],
    [rand(200, 255), rand(200, 255), rand(200, 255)]
  );
  $('#length').text(text.length);
};

$('#reload').click(reload);
$('#text').on('input', reload);

reload();
