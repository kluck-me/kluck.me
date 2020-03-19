$('html').addClass('js');

const addOpener = function(text, $elem, fn) {
  $('<a>')
    .attr('href', 'javascript:void 0')
    .text(text)
    .click(function() {
      $(this).fadeOut(function() {
        $(this).remove();
      });
      $elem.slideDown(fn);
    })
    .appendTo($elem.prev('p'));
};

$(function() {
  addOpener('もっと読む', $('.wrap>.hide'));
  addOpener('さらに読む', $('.wrap>.hide>.hide'), function() {
    $('span.hide').show();
    $('body').addClass('allopen');
  });
});
