table = require('./table.coffee')

$(window).resize ->
  $('#r').autofit()
  return

update = ->
  new_name = "七#{table[Math.floor(Math.random() * table.length)]}楓"
  document.title = new_name
  $('#r').text(new_name).show().autofit()
  return

auto_update = true

setInterval ->
  return unless auto_update
  update()
  return
, 100

delay = (ms, fn) -> setTimeout(fn, ms)
flash = (ms, count) ->
  if count
    delay ms, ->
      $('#r').toggle()
      flash(ms, count - 1)
      return
  return

$(window).click ->
  return if auto_update == null
  auto_update = !auto_update
  unless auto_update
    auto_update = null
    delay 500, ->
      update()
      delay 750, ->
        update()
        delay 1000, ->
          update()
          flash(100, 8)
          auto_update = false
          return
        return
      return
  false

update()
