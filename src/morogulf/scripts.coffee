render = ->
  $canvas = $('canvas')
  canvas = $canvas[0]
  ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgb(170,191,218)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'rgb(105,122,148)'
  ctx.textAlign = 'center'
  ctx.font = '17px "M PLUS Rounded 1c"'
  ctx.fillText $('#first-text').val(), canvas.width / 2 - 5, canvas.height / 2 + 8
  ctx.font = 'italic 12px "M PLUS Rounded 1c"'
  ctx.fillText $('#second-text').val(), canvas.width / 2 - 5, canvas.height / 2 + 23


$('button').click ->
  $('input').each ->
    $(this).val(this.defaultValue)
    return
  render()
  false

$('input').on('input', render)

render()
