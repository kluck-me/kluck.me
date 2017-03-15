update = do ->
  countdownFormat = do ->
    t = (k, n) -> "{<big><big>%#{k}</big>#{n}</big>}"
    t('y', '年') + t('d', '日') + t('h', '時間') + t('m', '分') + t('s', '秒')

  ->
    if window.deadline
      sec = (deadline - (new Date)) / 1000 | 0
      if sec > 0
        $('#t').html(countdown(countdownFormat, sec))
        $('#c').show()
        $('#r').hide()
      else
        $('#c').hide()
        $('#r').show()
    else
      $('#c').show()
      $('#r').hide()
    $('.f').each ->
      autofit(this)
      return
    return

$(window).on 'load', ->
  $(window).resize ->
    update()
    return
  setInterval(update, 500)
  update()
  return
