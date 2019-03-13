pp = (args...) ->
  self.postMessage(type: 'debug', value: args)
  return

time = (fn) ->
  t = Date.now()
  fn()
  Date.now() - t

class PriorityQueue
  constructor: ->
    @data = []

  push: (item) ->
    @data.push(item)
    @_up(@data.length - 1)
    return

  pop: ->
    return unless @data.length
    top = @data[0]
    if @data.length - 1 > 0
      @data[0] = @data[@data.length - 1]
      @_down(0)
    @data.pop()
    top

  _up: (pos) ->
    item = @data[pos]

    while pos > 0
      parent = (pos - 1) >> 1
      current = @data[parent]
      break if item.compareTo(current) >= 0
      @data[pos] = current
      pos = parent

    @data[pos] = item
    return

  _down: (pos) ->
    item = @data[pos]
    halfLength = @data.length >> 1

    while pos < halfLength
      left = (pos << 1) + 1
      right = left + 1
      best = @data[left]
      if right < @data.length && @data[right].compareTo(best) < 0
        left = right
        best = @data[right]
      break if best.compareTo(item) >= 0
      @data[pos] = best
      pos = left

    @data[pos] = item
    return

class Puzzle
  @MOVES: [
    { x:  0, y: -1, path: 'u' }
    { x:  1, y:  0, path: 'r' }
    { x:  0, y:  1, path: 'd' }
    { x: -1, y:  0, path: 'l' }
  ]

  @validateBoard: (board) ->
    throw new Error('board is broken') unless Array.isArray(board)
    height = board.length
    throw new Error('board is broken') unless height
    width = board[0].length
    throw new Error('board is broken') unless width
    unless board.every((a) -> a.length == width && a.every((v) -> typeof v == 'number'))
      throw new Error('board should be two-dimensional array')
    return

  clone: ->
    p = new Puzzle
    for k, v of this when @hasOwnProperty(k)
      p[k] = if v && typeof v == 'object'
        v.concat()
      else
        v
    p

  setBoard: (board) ->
    Puzzle.validateBoard(board)
    @height = board.length
    @width = board[0].length
    @panel = []
    @space = -1
    @path = ''
    i = 0
    for y in [0...@height] by 1
      for x in [0...@width] by 1
        if board[y][x] == 0
          @panel[i] = @height * @width
          @space = i
        else
          @panel[i] = board[y][x]
        i += 1
    throw new Error('space not found') if @space == -1
    throw new Error('panel is broken') unless @panel.concat().sort((a, b) -> a - b).every((v, i) -> v == i + 1)
    @setCalculatedDistance()
    return

  calcManhattanDistance: (i1, i2) ->
    x1 = i1 % @width
    y1 = i1 / @width | 0
    x2 = i2 % @width
    y2 = i2 / @width | 0
    Math.abs(x1 - x2) + Math.abs(y1 - y2)

  setCalculatedDistance: ->
    @distance = 0
    for i in [0...@panel.length] by 1 when i != @space
      @distance += @calcManhattanDistance(i, @panel[i] - 1)
    @estimate = @distance
    @cost = 0
    return

  moveSpace: (x, y) ->
    i = x + y * @width
    @distance += @calcManhattanDistance(@space, @panel[i] - 1)
    @distance -= @calcManhattanDistance(i, @panel[i] - 1)
    @panel[@space] = @panel[i]
    @panel[i] = @height * @width
    @space = i
    return

  compareTo: (other) -> @estimate - other.estimate

  toString: -> @panel.join(',')

finder = (board) ->
  done = {}
  q = new PriorityQueue
  p = new Puzzle
  p.setBoard(board)
  p.estimate = p.distance
  q.push(p)

  while q.data.length
    p = q.pop()
    return p.path if p.distance == 0
    done[p] = true

    sx = p.space % p.width
    sy = p.space / p.width | 0

    for move in Puzzle.MOVES
      nx = sx + move.x
      ny = sy + move.y
      continue if nx < 0 || p.width <= nx || ny < 0 || p.height <= ny
      p2 = p.clone()
      p2.moveSpace(nx, ny)
      continue if done[p2]
      p2.cost += 1
      p2.estimate = p2.distance + p2.cost
      p2.path += move.path
      q.push(p2)

  null

if typeof self != 'undefined'
  self.addEventListener 'message', (e) ->
    pp time ->
      try
        self.postMessage(type: 'result', value: finder(e.data.board))
      catch e
        self.postMessage(type: 'error', value: e.message)
      return
    self.postMessage(type: 'finish')
    return
  , false
else
  pp = console.log.bind(console)
  pp time ->
    pp finder([
      [ 1,  7,  2,  4]
      [ 6,  0, 14,  3]
      [13, 10, 11,  8]
      [ 5,  9, 15, 12]
    ])
    return
