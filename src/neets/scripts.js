/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const update = (function() {
  const countdownFormat = (function() {
    const t = (k, n) => `{<big><big>%${k}</big>${n}</big>}`;
    return t('y', '年') + t('d', '日') + t('h', '時間') + t('m', '分') + t('s', '秒');
  })();

  return function() {
    if (window.deadline) {
      const sec = ((deadline - new Date()) / 1000) | 0;
      if (sec > 0) {
        $('#t').html(countdown(countdownFormat, sec));
        $('#c').show();
        $('#r').hide();
      } else {
        $('#c').hide();
        $('#r').show();
      }
    } else {
      $('#c').show();
      $('#r').hide();
    }
    $('.f').autofit();
  };
})();

$(window).on('load', function() {
  $(window).resize(function() {
    update();
  });
  setInterval(update, 500);
  update();
});
