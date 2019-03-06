window.autofit = (target) ->
  $target = $(target)
  targetWidth = $target.width()
  return if targetWidth < 1

  fontSize = parseInt($target.css('font-size'), 10)
  $temp = $target.clone().css('display', 'none').insertBefore($target)
  tempWidth = $temp.width()

  while tempWidth < targetWidth
    fontSize *= (targetWidth / tempWidth)
    $temp.css('font-size', fontSize + 'px')
    tempWidth = $temp.width()

  while tempWidth >= targetWidth
    fontSize -= Math.max(1, fontSize * (1 - targetWidth / tempWidth))
    $temp.css('font-size', fontSize + 'px')
    tempWidth = $temp.width()

  $temp.remove()
  $target.css('font-size', fontSize + 'px')
  return
