rand = (min, max) -> Math.floor(Math.random() * (max + 1 - min)) + min

createTextImageData = (str, w, h) ->
  canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  ctx = canvas.getContext('2d')
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = 'black'
  ctx.font = "#{Math.min(h, w / str.length) * 0.75}px serif"
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(str, w / 2, h / 2, w)
  ctx.getImageData(0, 0, w, h)

updateCaptcha = (canvas, text, fgcolor, bgcolor) ->
  ctx = canvas.getContext('2d')
  w = canvas.width
  h = canvas.height
  dst = ctx.getImageData(0, 0, w, h)
  src = createTextImageData(text, w, h)

  # periods
  rand1 = rand(750000, 1200000) / 10000000
  rand2 = rand(750000, 1200000) / 10000000
  rand3 = rand(750000, 1200000) / 10000000
  rand4 = rand(750000, 1200000) / 10000000
  # phases
  rand5 = rand(0, 3141592) / 500000
  rand6 = rand(0, 3141592) / 500000
  rand7 = rand(0, 3141592) / 500000
  rand8 = rand(0, 3141592) / 500000
  # amplitudes
  rand9 = rand(330, 420) / 110
  rand0 = rand(330, 450) / 110

  index = (x, y) -> (x + y * w) * 4

  for x in [0...w] by 1
    for y in [0...h] by 1
      bgratio = 1
      rsx = x + (Math.sin(x * rand1 + rand5) + Math.sin(y * rand3 + rand6)) * rand9
      rsy = y + (Math.sin(x * rand2 + rand7) + Math.sin(y * rand4 + rand8)) * rand0
      sx = Math.floor(rsx)
      sy = Math.floor(rsy)

      if 0 <= rsx < w && 0 <= rsy < h
        color00 = src.data[index(sx, sy) + 2] ? 255
        color10 = src.data[index(sx + 1, sy) + 2] ? 255
        color01 = src.data[index(sx, sy + 1) + 2] ? 255
        color11 = src.data[index(sx + 1, sy + 1) + 2] ? 255
        frsx0 = rsx - sx
        frsy0 = rsy - sy
        frsx1 = 1 - frsx0
        frsy1 = 1 - frsy0
        color = Math.min(255, color00 * frsx1 * frsy1 + color10 * frsx0 * frsy1 + color01 * frsx1 * frsy0 + color11 * frsx0 * frsy0)
        bgratio = color / 255

      idx = index(x, y)
      dst.data[idx + offset] = (1 - bgratio) * fgcolor[offset] + bgratio * bgcolor[offset] for offset in [0..2]
      dst.data[idx + 3] = 255

  ctx.putImageData(dst, 0, 0)
  return

reload = ->
  text = $('#text').val()
  updateCaptcha(
    $('#captcha')[0], text
    [rand(0, 100), rand(0, 100), rand(0, 100)]
    [rand(200, 255), rand(200, 255), rand(200, 255)]
  )
  $('#length').text(text.length)
  return

$('#reload').click(reload)
$('#text').on('input', reload)

reload()
