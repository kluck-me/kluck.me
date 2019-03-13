instance = null

vue = new Vue(
  el: '#vue'
  data:
    input: ''
    running: false
    playing: false
  methods:
    run: ->
      instance?.exit()
      instance = new Processing(@$refs.canvas, @input)
      @running = true
      @playing = true
      return
    pause: ->
      @playing = false
      instance.noLoop()
      return
    play: ->
      @playing = true
      instance.loop()
      return
)

if location.search
  name = location.search.replace(/^\?/, '')
  $.get "https://api.github.com/repos/kluck-me/kluck.me/contents/src/viz/#{name}.pde", (data) ->
    source = window.atob(data.content)
    document.title += " : #{name}"
    vue.$data.input = source
    vue.run()
    return
