fetcher = ->
  $target = $(this)
  targetWidth = $target.width()
  return if targetWidth < 1

  fontSize = parseInt($target.css('font-size'), 10)
  $temp = $('<div/>').css(
    display: 'none'
    'font-family': $target.css('font-family')
    'font-size': fontSize
  ).html($target.html()).appendTo('body')
  tempWidth = $temp.width()

  while tempWidth < targetWidth
    fontSize *= (targetWidth / tempWidth)
    $temp.css('font-size', fontSize + 'px')
    tempWidth = $temp.width()

  while tempWidth >= targetWidth
    fontSize--
    $temp.css('font-size', fontSize + 'px')
    tempWidth = $temp.width()

  $target.css('font-size', fontSize + 'px')
  $temp.remove()
  return

update = ->
  now = new Date
  sec = (limit - now) / 1000 | 0
  if sec > 0
    rest = []
    addRest = (s, i) ->
      if sec > i
        rest.push("<big><big>#{sec / i | 0}</big>#{s}</big>")
        sec %= i
      return
    addRest('日', 60 * 60 * 24)
    addRest('時間', 60 * 60)
    addRest('分', 60)
    addRest('秒', 1)
    $('#t').html(rest.join(''))
    $('#c').show()
    $('#r').hide()
  else
    $('#c').hide()
    $('#r').show()
  return

$(window).load ->
  tid = null
  $div = $('div.f')
  $(window).resize ->
    clearTimeout(tid)
    tid = setTimeout ->
      $div.each(fetcher)
      return
    , 50
    return
  render = ->
    update()
    $div.each(fetcher)
    return
  setInterval(render, 500)
  render()
  return
