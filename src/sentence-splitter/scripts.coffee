location.reload() if process.env.NODE_ENV == 'development' && window.vm

window.vm = new Vue(
  el: '#vue'
  data:
    text: ''
    limit_config: '10000'
    regex_config: '\\n|[。！？）｠」』］〛｝〕〙〉》】〗]+'
    blocks: []
  computed:
    input: -> @text.trim().replace(/\r\n?/, '\n')
    limit: -> +@limit_config
    regex: ->
      try
        new RegExp(@regex_config, 'g')
  methods:
    submit: ->
      @blocks = []
      return unless @input && @limit && @regex

      indexes = [0]
      indexes.push(m.index + 1) while m = @regex.exec(@input)
      parts = (@input.slice(index, indexes[i + 1]) for index, i in indexes)

      blocks = ['']
      target = 0
      count = 0
      for part in parts
        target = blocks.push('') - 1 if count + part.length > @limit
        blocks[target] += part
        count = blocks[target].length
      @blocks = blocks
      return
    copy: (evt) ->
      evt.target.text.focus()
      evt.target.text.select()
      document.execCommand('copy')
      return
  mounted: ->
    return
    if location.hostname == 'localhost'
      @text = "#{'a'.repeat(10)}.#{'a'.repeat(10)}.!#{'a'.repeat(40)}.#{'a'.repeat(10)}.!#{'a'.repeat(10)}"
      @limit_config = '30'
      @regex_config = '\\.(?!!)|!'
      @submit()
    return
)
