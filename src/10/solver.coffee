pp = (args...) ->
  self.postMessage(type: 'debug', value: args)
  return

time = (fn) ->
  t = Date.now()
  fn()
  Date.now() - t

class Node
  constructor: (@type, @value, @left, @right) ->
  clone: -> new Node(@type, @value, @left, @right)
  minus: ->
    switch @type
      when 'minus'
        @left.clone() # -(-x) -> x
      else
        new Node('minus', -@value, @clone())
  add: (other) -> new Node('add', @value+other.value, @clone(), other.clone())
  sub: (other) -> new Node('add', @value-other.value, @clone(), other.minus())
  mul: (other) -> new Node('mul', @value*other.value, @clone(), other.clone())
  div: (other) -> new Node('div', @value/other.value, @clone(), other.clone())
  toString: (parentOp = '') ->
    switch @type
      when 'number'
        return @value.toString()
      when 'minus'
        result = "-#{@left.toString('@')}"
      when 'add'
        rightResult = @right.toString('+')
        rightResult = "+#{rightResult}" unless rightResult[0] == '-'
        result = "#{@left.toString('+')}#{rightResult}"
        return "(#{result})" unless parentOp == '' || parentOp == '+'
      when 'mul', 'div'
        resultOp = { mul: '*', div: '/' }[@type]
        result = "#{@left.toString(resultOp)}#{resultOp}#{@right.toString(resultOp)}"
      else
        new Error("not support: #{@type}")
    return "(#{result})" if parentOp == '@'
    result

generateUnary = (x, fn) ->
  fn(x)
  fn(x.minus())
  return

generateBinary = (as, bs, fn) ->
  generateExpr as, (a) ->
    generateExpr bs, (b) ->
      fn(a.add(b))
      fn(a.sub(b))
      fn(a.mul(b))
      fn(a.div(b))
      return
    return
  return

generateExpr = (xs, fn) ->
  switch xs.length
    when 0
      throw new Error
    when 1
      generateUnary(xs[0], fn)
    else
      for i in [1...xs.length] by 1
        generateBinary xs[0...i], xs[i..xs.length], (x) ->
          generateUnary(x, fn)
          return
  return

self.addEventListener 'message', (e) ->
  pp time ->
    generateExpr e.data.numbers.map((n) -> new Node('number', n)), (x) ->
      self.postMessage(type: 'result', value: x.toString()) if e.data.answer == x.value
      return
    return
  self.postMessage(type: 'finish')
  return
, false
