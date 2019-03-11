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
  name = location.search.replace(/^\?/, '')
  $.get "https://api.github.com/repos/kluck-me/kluck.me/contents/src/viz/#{name}.pde", (data) ->
    source = window.atob(data.content)
    document.title += " : #{name}"
    $textarea.val(source)
    setTimeout ->
      $('#btnRun').click()
      return
    , 500
    return
