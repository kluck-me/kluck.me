location.reload() if process.env.NODE_ENV == 'development' && window.vm

inital_data =
  first_text: 'モロ湾'
  second_text: 'Moro Gulf'

window.vm = new Vue(
  el: '#vue'
  data: Object.assign({}, inital_data)
  methods:
    update: ->
      canvas = @$refs.canvas
      ctx = canvas.getContext('2d')

      ctx.fillStyle = 'rgb(170,191,218)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgb(105,122,148)'
      ctx.textAlign = 'center'

      ctx.font = '17px "M PLUS Rounded 1c"'
      ctx.fillText @first_text, canvas.width / 2 - 5, canvas.height / 2 + 8

      ctx.font = 'italic 12px "M PLUS Rounded 1c"'
      ctx.fillText @second_text, canvas.width / 2 - 5, canvas.height / 2 + 23

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
