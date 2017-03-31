$canvas = $('canvas')
$textarea = $('textarea')
instance = null

$('#btnRun').click ->
  instance?.exit()
  instance = new Processing($canvas[0], $textarea.val())
  $('#btnPlayText').hide()
  $('#btnPauseText').show()
  $('#btnPlay').prop('disabled', false)
  false

$('#btnPlay').click ->
  if $('#btnPlayText').is(':visible')
    $('#btnPlayText').hide()
    $('#btnPauseText').show()
    instance.loop()
  else
    $('#btnPlayText').show()
    $('#btnPauseText').hide()
    instance.noLoop()
  false

if location.search
  $.get location.search.replace(/^\?/, ''), (source) ->
    $textarea.val(source)
    return
