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
  nuddy: ->
    node = this
    node = node.left while node.type != 'number' && !node.right
    node
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
  sqrtable: -> @value > 0 && @value != 1 && isFinite(@value) # /1 == 1, Not support: /-1, /inf
  sqrt: -> new Node('sqrt', Math.sqrt(@value), @clone())
  factable: -> (@value == 0 || @value > 2) && isFinite(@value) && Math.round(@value) == @value # 1! == 1, 2! == 2, Not support: inf!, 1.5!
  fact: ->
    v = 1
    for i in [1..@value] by 1
      break unless isFinite(v)
      v *= i
    new Node('fact', v, @clone())
  add: (other) ->
    return @minus().sub(other) if @type == 'minus' && @value == -other.value # -a+a -> a-a
    new Node('add', @value+other.value, @clone(), other.clone())
  sub: (other) -> new Node('add', @value-other.value, @clone(), other.minus())
  mul: (other) ->
    that = this
    other = other.nuddy() if that.value == 0 # 0*f(b) -> 0*b
    that = that.nuddy() if other.value == 0 # f(a)*0 -> a*0
    method = if other.hasMinus() then 'minus' else 'clone' # a*(-b) -> (-a)*b
    new Node('mul', @value*other.value, that[method](), other[method]())
  div: (other) ->
    method = if other.hasMinus() then 'minus' else 'clone' # a/(-b) -> (-a)/b
    new Node('div', @value/other.value, this[method](), other[method]())
  powable: (other) -> @value == 0 || Math.abs(Math.pow(@value, other.value)) > 1e-10 # Not support: a^-inf
  pow: (other) ->
    that = this
    other = other.nuddy() if Math.abs(that.value) == 1 # 1^f(b) -> 1^b
    that = that.nuddy() if other.value == 0 # f(a)^0 -> a^0
    method = if that.value < 0 && other.value % 2 == 0 then 'minus' else 'clone' # (-a)^(2b) -> a^(2b)
    new Node('pow', Math.pow(that.value, other.value), that[method](), other.clone())
  toString: (parentOp = '') ->
    switch @type
      when 'number'
        return @value.toString()
      when 'minus'
        result = "-#{@left.toString('-')}"
      when 'sqrt'
        result = "\u221a#{@left.toString('@')}"
      when 'fact'
        result = "#{@left.toString('@')}!"
      when 'add'
        rightResult = @right.toString('+')
        rightResult = "+#{rightResult}" unless rightResult[0] == '-'
        result = "#{@left.toString('+')}#{rightResult}"
        return "(#{result})" unless parentOp == '' || parentOp == '+'
      when 'mul', 'div'
        resultOp = { mul: '*', div: '/' }[@type]
        result = "#{@left.toString(resultOp)}#{resultOp}#{@right.toString(resultOp)}"
        return "(#{result})" if resultOp == '/' && parentOp == '/'
      when 'pow'
        result = "#{@left.toString('@')}^#{@right.toString('@')}"
      else
        new Error("not support: #{@type}")
    return "(#{result})" if parentOp == '@'
    result

expandUnary = (x, fn) ->
  fn(x.sqrt()) if x.sqrtable()
  fn(x.fact()) if x.factable()
  return

generateUnary = (level, x, fn) ->
  fn(x)
  fn(x.minus())
  if level > 0
    expandUnary x, (y) ->
      generateUnary(level - 1, y, fn)
      return
  return

generateBinary = (level, as, bs, fn) ->
  generateExpr level, as, (a) ->
    generateExpr level, bs, (b) ->
      fn(a.add(b))
      fn(a.sub(b))
      fn(a.mul(b))
      fn(a.div(b)) if a.value != 0 && Math.abs(b.value) != 1 # 0*x == 0/x, x*1 == x/1
      fn(a.pow(b)) if level > 0 && a.value != 0 && b.value != 1 && a.powable(b) # 0*x == 0^x, x*1 == x^1
      return
    return
  return

generateExpr = (level, xs, fn) ->
  switch xs.length
    when 0
      throw new Error
    when 1
      generateUnary(level, xs[0], fn)
    else
      for i in [1...xs.length] by 1
        generateBinary level, xs[0...i], xs[i..xs.length], (x) ->
          generateUnary(level, x, fn)
          return
  return

finder = (answer, numbers, level, fn) ->
  found = false
  generateExpr level, numbers.map((n) -> new Node('number', n)), (x) ->
    if answer == x.value
      found = true
      fn(x)
    return
  found

self.addEventListener 'message', (e) ->
  pp time ->
    fn = (x) ->
      self.postMessage(type: 'result', value: x.toString())
      return
    for i in [0..3]
      break if finder(e.data.answer, e.data.numbers, i, fn)
    return
  self.postMessage(type: 'finish')
  return
, false
