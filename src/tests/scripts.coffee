vue = new Vue(
  el: '#vue'
  data:
    loading: false
    contents: []
  methods:
    load: ->
      @loading = true
      $.getJSON('https://api.github.com/repos/kluck-me/kluck.me/contents/src/tests').then (contents) =>
        ext_reg = /\.pug$/
        @contents = for content in contents when ext_reg.test(content.name)
          label = content.name.replace(ext_reg, '')
          label: label
          href: "#{label}.html"
        @loading = false
        return
      return
  mounted: ->
    @load()
    return
)
