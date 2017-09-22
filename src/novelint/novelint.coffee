class Novelint
  @matcher: (reg, fn) ->
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
        r.push([index, index + length])
      r

  constructor: ->
    @lintsSet = {} # { string => [function -> [[number, number], ...], ... ], ... }

  add: (name, lint) ->
    (@lintsSet[name] ||= []).push(lint)
    return

  addLint: (name, reg, fn) ->
    @add(name, Novelint.matcher(reg, fn))
    return

  review: (text, options = {}) ->
    text = text.replace(/\r\n?/g, '\n')

    t = [] # [ [string, number, number], ... ]
    for name of @lintsSet when options[name] != false
      for lint in @lintsSet[name]
        for r in lint.call(this, text)
          t.push(['' + name].concat(r))

    r = [] # [ [name, start, start], [null, start, end], ...]
    g = {}
    for v in t
      k = v.join('\n')
      unless g[k]
        g[k] = true
        r.push(['' + v[0], v[1], v[1]], [null, v[1], v[2]])

    r.sort (a, b) ->
      a[2] - b[2] ||
      a[1] - b[1] ||
      (if a[0] == null then 1 else if b[0] == null then -1 else 0)

    indexes: r, length: r.length / 2
