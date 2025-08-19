/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const load_image = (data) =>
  new Promise(function (resolve, reject) {
    const img = (data.img = new Image());
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      resolve(data);
    };
    img.onerror = function () {
      reject(data);
    };
    img.src = data.url;
  });

Promise.all(
  [
    {
      url: 'https://4.bp.blogspot.com/-Anllqq6pDXw/VRUSesbvyAI/AAAAAAAAsrc/CIHz6vLsuTU/s800/computer_jinkou_chinou.png',
      x: 180,
      y: 40,
      w: 90,
    },
    {
      url: 'https://4.bp.blogspot.com/-4xxTe_qeV1E/Vd7FkNUlwjI/AAAAAAAAxFc/8u9MNKtg7gg/s800/syachiku.png',
      x: 0,
      y: 0,
      w: 300,
    },
  ].map(load_image),
).then(function (dataset) {
  const ctx = $('canvas')[0].getContext('2d');
  for (let i = dataset.length - 1; i >= 0; i--) {
    const d = dataset[i];
    ctx.drawImage(d.img, d.x, d.y, d.w, (d.w / d.img.width) * d.img.height);
  }
});

$('button').click(function () {
  $('canvas')[0].toBlob(function (blob) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'canvas-download.png';
    link.click();
    URL.revokeObjectURL(link.url);
  });
  return false;
});
