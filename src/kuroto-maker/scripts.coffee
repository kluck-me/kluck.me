$form = $('.col-sm-4 form')
form = $form[0]
anchor = $('.col-sm-4 a')[0]

canvas = $('.col-sm-8 canvas')[0]
ctx = canvas.getContext('2d')

fill_circle = (x, y, size) ->
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2, false)
  ctx.closePath()
  ctx.fill()
  return

fill_spiral_circle = (x0, y0, stv, ssize) ->
  tv = parseFloat(stv)
  a = 6 / Math.PI
  t = Math.PI * tv
  r = a * t
  fill_circle(x0 + r * Math.cos(t), y0 + r * Math.sin(t), parseFloat(ssize))
  return

update_canvas = ->
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  # ctx.fillStyle = 'black'
  # fill_circle(77, 170, 6)
  # fill_circle(171, 175, 6)

  ctx.fillStyle = 'black'
  fill_spiral_circle(85, 172, form.left_eye_pos.value, form.left_eye_size.value)
  fill_spiral_circle(179, 178, form.right_eye_pos.value, form.right_eye_size.value)

  anchor.href = canvas.toDataURL()
  return

img = new Image
img.src = 'kuroto.jpg'
img.onload = ->
  update_canvas()
  $form.find('input[type="range"]').change(update_canvas)
  return

$form.find('button').click ->
  $form.find('input').each ->
    @value = @defaultValue
    update_canvas()
    return
  false
