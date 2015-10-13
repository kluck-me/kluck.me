fetcher = ->
  $target = $(this)
  fontSize = parseInt($target.css('font-size'), 10)
  $temp = $('<div/>').css(
    display: 'none'
    'font-family': $target.css('font-family')
    'font-size': fontSize
  ).text($target.text()).appendTo('body')

  targetWidth = $target.width()
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
  limit = new Date(2014, 10, 14, 17, 30)
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
    $('#t').html('<a href="https://twitter.com/search?q=%23%E9%80%83%E3%81%92%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E9%80%80%E7%A4%BE&src=typd">逃げるように退職</a>まで<br><big>あと' + rest.join('') + '</big>')
  else
    $('#t').text('祝無職').css('font-weight', 'bold')
  return

$(window).load ->
  tid = null
  $(window).resize ->
    clearTimeout(tid)
    tid = setTimeout (-> $('div').each(fetcher)), 0
    return
  render = ->
    update()
    $('#t').each(fetcher)
    return
  setInterval render, 500
  render()
  return
