$('html').addClass('js')

addOpener = (text, $elem, fn) ->
  $('<a>')
    .attr('href', 'javascript:void 0')
    .text(text)
    .click ->
      $(this).fadeOut ->
        $(this).remove()
        return
      $elem.slideDown(fn)
      return
    .appendTo($elem.prev('p'))
  return

$ ->
  addOpener 'もっと読む', $('.wrap>.hide')
  addOpener 'さらに読む', $('.wrap>.hide>.hide'), ->
    $('span.hide').show()
    $('body').addClass('allopen')
    return
  return
