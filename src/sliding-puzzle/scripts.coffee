pp = console.log.bind(console)

class Solver
  constructor: ->
    @callbacks = []
  onMessage: (fn) ->
    @callbacks.push(fn)
    return
  parseBoard: (str) ->
    @board = str.trim().split('\n').map((line) -> line.trim().split(/\D+/).map((v) -> parseInt(v, 10)))
    this
  stop: ->
    @worker?.terminate()
    @worker = null
    this
  run: ->
    unless @worker
      @worker = new Worker('solver.coffee')
      @worker.addEventListener('message', fn, false) for fn in @callbacks
      @worker.postMessage(board: @board)
    this

$result = $('#result')
$error = $('#error')
$textarea = $('form textarea')
$button = $('form button')

solver = new Solver
solver.onMessage (e) ->
  switch e.data.type
    when 'result'
      puzzle.init(solver.board, e.data.value)
      puzzle.renderNextMove()
      solver.stop()
    when 'error'
      console.error e.data
      $error.show().find('p').text(e.data.value)
      solver.stop()
    when 'debug'
      console.log e.data.value...
  updateView()
  return

updateView = ->
  if solver.worker
    $button.text('とめる')
    $textarea.prop('disabled', true)
  else
    $button.text('さがす')
    $textarea.prop('disabled', false)
  return

$('form').submit ->
  if solver.worker
    solver.stop()
  else
    solver.parseBoard($textarea.val())
    $result.hide()
    $error.hide()
    solver.run()
  updateView()
  return false

updateView()

if location.hostname == 'localhost'
  $('form').submit()

puzzle =
  moves:
    u: { x:  0, y: -1, path: 'u' }
    r: { x:  1, y:  0, path: 'r' }
    d: { x:  0, y:  1, path: 'd' }
    l: { x: -1, y:  0, path: 'l' }

  init: (board, actions) ->
    $puzzle = $result.find('#puzzle').empty()
    space = -1
    height = board.length
    width = board[0].length
    for y in [0...height] by 1
      for x in [0...width] by 1
        $panel = $('<span>').text(board[y][x]).appendTo($puzzle)
        @updatePanel($panel, x, y)
        space = x: x, y: y unless board[y][x]
    $puzzle.css(width: "#{width * 2}em", height: "#{height * 2}em")
    $result.data(actions: actions, index: -1, space: space).show()
    return

  getPanel: (x, y) ->
    $("#puzzle span[data-x=#{Number(x)}][data-y=#{Number(y)}]")

  updatePanel: ($node, x, y) ->
    $node
      .attr('data-x': x, 'data-y': y)
      .css(left: "#{x * 2}em", top: "#{y * 2}em")

  renderNextMove: ->
    space = $result.data('space')
    index = $result.data('index') + 1
    action = $result.data('actions')[index]
    return unless action

    move = @moves[action]
    $('#puzzle span').removeClass('next-move')
    @getPanel(space.x + move.x, space.y + move.y).addClass('next-move')
    return

  renderMoved: ->
    space = $result.data('space')
    index = $result.data('index') + 1
    action = $result.data('actions')[index]
    return unless action

    move = @moves[action]
    x = space.x + move.x
    y = space.y + move.y
    $space = @getPanel(space.x, space.y)
    $other = @getPanel(x, y)
    @updatePanel($space, x, y)
    @updatePanel($other, space.x, space.y)
    $result.data(index: index, space: { x: x, y: y })
    return

$('button[rel="next"]').click ->
  puzzle.renderMoved()
  puzzle.renderNextMove()
  false
