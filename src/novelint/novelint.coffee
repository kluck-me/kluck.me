class Novelint
  @match: (msg, reg, fn) ->
    (text) ->
      r = []
      while m = reg.exec(text) when !fn || fn(m)
        index = m.index
        length = 0
        if m[2]
          index += m[1].length
          length = m[2].length
        else if m[1]
          length = m[1].length
        r.push([msg, index, index + length])
      r

  constructor: ->
    @checkers = {} # { string => [function -> [[string, number, number]], ...], ... }
    @results = [] # [ [string, number, number], ... ]
    @count = 0

  add: (name, checker) ->
    (@checkers[name] ||= []).push(checker)
    return

  addMatch: (name, msg, reg, fn) ->
    @add(name, Novelint.match(msg, reg, fn))
    return

  check: (text, options) ->
    @text = text.replace(/\r\n?/g, '\n')
    t = []
    for name of @checkers when options[name]
      for checker in @checkers[name]
        t = t.concat(checker.call(this, @text))
    r = []
    g = {}
    for v in t
      k = v.join('\n')
      unless g[k]
        r.push([''+v[0], v[1], v[1]], [null, v[1], v[2]])
        g[k] = true
    r.sort (a, b) ->
      a[2] - b[2] ||
      a[1] - b[1] ||
      (if a[0] == null then 1 else if b[0] == null then -1 else 0)
    @count = r.length / 2
    @results = r
    this

  html: ->
    t = []
    i = 0
    for r in @results
      unless i == r[2]
        t.push(@text.slice(i, r[2]))
        i = r[2]
      if r[0] == null
        t.push('</span>')
      else
        pair = r[0].split(':')
        t.push("<span class=\"bg-#{pair[0]}\" data-toggle=\"tooltip\" title=\"#{pair[1]||'エラー'}\">&shy;")
    t.push(@text.slice(i)) unless i == @text.length
    t.join('')
