/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
$.fn.autofit = function () {
  return this.each(function () {
    const $target = $(this);
    const targetWidth = $target.width();
    if (targetWidth < 1) {
      return;
    }

    let fontSize = parseInt($target.css('font-size'), 10);
    const $temp = $target.clone().css('display', 'none').insertBefore($target);
    let tempWidth = $temp.width();

    while (tempWidth < targetWidth) {
      fontSize *= targetWidth / tempWidth;
      $temp.css('font-size', fontSize + 'px');
      tempWidth = $temp.width();
    }

    while (tempWidth >= targetWidth) {
      fontSize -= Math.max(1, fontSize * (1 - targetWidth / tempWidth));
      $temp.css('font-size', fontSize + 'px');
      tempWidth = $temp.width();
    }

    $temp.remove();
    $target.css('font-size', fontSize + 'px');
  });
};
