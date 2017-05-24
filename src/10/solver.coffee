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
      when 'add'
        @left.minus()[@type](@right.minus()) # -(a+b) -> (-a)+(-b)
      when 'mul', 'div'
        @left.minus()[@type](@right) # -(a*b) -> (-a)*b
      else
        return @clone() if @value == 0 # -0 -> 0
        new Node('minus', -@value, @clone())
  hasMinus: ->
    switch @type
      when 'minus'
        true
      when 'add'
        @left.hasMinus() && @right.hasMinus()
      when 'mul', 'div'
        @left.hasMinus() || @right.hasMinus()
      else
        false
  add: (other) -> new Node('add', @value+other.value, @clone(), other.clone())
  sub: (other) -> new Node('add', @value-other.value, @clone(), other.minus())
  mul: (other) ->
    method = if other.hasMinus() then 'minus' else 'clone' # a*(-b) -> (-a)*b
    new Node('mul', @value*other.value, this[method](), other[method]())
  div: (other) ->
    method = if other.hasMinus() then 'minus' else 'clone' # a/(-b) -> (-a)/b
    new Node('div', @value/other.value, this[method](), other[method]())
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
        return "(#{result})" if resultOp == '/' && parentOp == '/'
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
      fn(a.div(b)) if a.value != 0 && Math.abs(b.value) != 1 # 0*b == 0/b, a*1 == a/1
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
