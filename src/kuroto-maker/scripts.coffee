location.reload() if process.env.NODE_ENV == 'development' && window.vm

fill_circle = (ctx, x, y, size) ->
  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2, false)
  ctx.closePath()
  ctx.fill()
  return

fill_spiral_circle = (ctx, x0, y0, stv, ssize) ->
  tv = parseFloat(stv)
  a = 6 / Math.PI
  t = Math.PI * tv
  r = a * t
  fill_circle(ctx, x0 + r * Math.cos(t), y0 + r * Math.sin(t), parseFloat(ssize))
  return

inital_data =
  left_eye_pos: '1.07'
  left_eye_size: '6'
  right_eye_pos: '1.07'
  right_eye_size: '6'

img = new Image
img.src = require('./kuroto.jpg')
img.onload = ->
  window.vm = new Vue(
    el: '#vue'
    data: Object.assign({}, inital_data)
    methods:
      update: ->
        canvas = @$refs.canvas
        ctx = canvas.getContext('2d')

        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        ctx.fillStyle = 'black'
        fill_spiral_circle(ctx, 85, 172, @left_eye_pos, @left_eye_size)
        fill_spiral_circle(ctx, 179, 178, @right_eye_pos, @right_eye_size)

        @$refs.download.href = canvas.toDataURL()
        return
      reset: ->
        Object.assign(this, inital_data)
        @update()
        return
    mounted: ->
      @update()
      return
  )
  return
