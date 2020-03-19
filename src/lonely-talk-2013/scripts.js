/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const rgb2hsv = function(rgb) {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  const maxc = Math.max(Math.max(r, g), b);
  const minc = Math.min(Math.min(r, g), b);
  const c = maxc - minc;
  let h =
    c === 0
      ? 0
      : maxc === r
      ? (60 * (g - b)) / c + 0
      : maxc === g
      ? (60 * (b - r)) / c + 120
      : (60 * (r - g)) / c + 240;
  while (h < 0) {
    h += 360;
  }
  const s = maxc === 0 ? 0 : (c / maxc) * 255;
  const v = maxc;
  return [h, s, maxc];
};

const hsv2rgb = function(hsv) {
  let b, g, r;
  let h = hsv[0];
  let s = hsv[1];
  let v = hsv[2];
  while (h < 0) {
    h += 360;
  }
  h %= 360;
  if (s === 0) {
    v = Math.round(v);
    return [v, v, v];
  }
  s /= 255;
  const i = ((h / 60) | 0) % 6;
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return [Math.round(r), Math.round(g), Math.round(b)];
};

const genCanvas = function(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const w = (canvas.width = img.width);
  const h = (canvas.height = img.height);
  ctx.drawImage(img, 0, 0, w, h);
  const pimg = ctx.getImageData(0, 0, w, h);

  for (let i = 0, end = pimg.data.length; i < end; i += 4) {
    const rr = pimg.data[i + 0] - baseColor[0];
    const gg = pimg.data[i + 1] - baseColor[1];
    const bb = pimg.data[i + 2] - baseColor[2];
    const yy = (2 * rr + 4 * gg + bb) / 7;
    pimg.data[i + 0] = 255;
    pimg.data[i + 1] = 255;
    pimg.data[i + 2] = 255;
    pimg.data[i + 3] = yy;
  }

  ctx.putImageData(pimg, 0, 0);
  return canvas;
};

const bodyStyle = document.body.style;
var baseColor = [34, 34, 74];
const $window = $(window);
let tid = null;

const img = new Image();
img.src = require('./kluckfack.png');
img.onload = function() {
  bodyStyle.backgroundImage = `url(${genCanvas(img).toDataURL('image/png')})`;
  $window
    .scroll(function() {
      clearTimeout(tid);
      return (tid = setTimeout(function() {
        const hsv = rgb2hsv(baseColor);
        hsv[0] += ($window.scrollTop() / $(document).height()) * 360;
        bodyStyle.backgroundColor = `rgb(${hsv2rgb(hsv).join(',')})`;
      }, 0));
    })
    .scroll();
};
