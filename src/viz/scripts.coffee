location.reload() if process.env.NODE_ENV == 'development' && window.vm

instance = null
default_title = document.title

window.vm = new Vue(
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
    load: (name) ->
      $.get("https://api.github.com/repos/kluck-me/kluck.me/contents/src/viz/#{name}.pde").then (data) =>
        source = window.atob(data.content)
        document.title = "#{default_title} : #{name}"
        @input = source
        @run()
        return
      return
  mounted: ->
    @load(location.search.replace(/^\?/, '')) if location.search
    return
)
