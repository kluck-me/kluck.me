Solver = require('../common/solver.coffee')

get_results = (board, actions) ->
  moves =
    u: { x:  0, y: -1 }
    r: { x:  1, y:  0 }
    d: { x:  0, y:  1 }
    l: { x: -1, y:  0 }
  results = []

  for next_action, i in "#{actions}_".split('')
    prev_result = results[i - 1]
    if prev_result
      board = JSON.parse(JSON.stringify(prev_result.board))
      step = prev_result.next_step
      board[step.y0][step.x0] = board[step.y1][step.x1]
      board[step.y1][step.x1] = 0

    next_step = null
    move = moves[next_action]
    if move
      space = null
      for y in [0...board.length] by 1 when !space
        for x in [0...board[y].length] by 1 when !space
          space = x: x, y: y unless board[y][x]
      next_step =
        x0: space.x
        y0: space.y
        x1: space.x + move.x
        y1: space.y + move.y

    results.push(board: board, next_step: next_step)

  results

vue = new Vue(
  el: '#vue'
  data:
    solver: new Solver(-> new Worker('./solver.coffee'))
    input: '''
     1  7  2  4
     6  0 14  3
    13 10 11  8
     5  9 15 12
    '''
    results: null
    index: 0
    error: null
  computed:
    board: -> @input.trim().split('\n').map((line) -> line.trim().split(/\D+/).map((v) -> parseInt(v, 10)))
    result: -> @results && @results[@index]
  methods:
    get_board_style: (board) -> width: "#{board[0].length * 2}em", height: "#{board.length * 2}em"
    get_panel_style: (x, y) -> left: "#{x * 2}em", top: "#{y * 2}em"
    submit: ->
      if @solver.worker
        @solver.stop()
      else
        @error = null
        @actions = null
        @index = 0
        @solver.run board: @board, (err, actions) =>
          if err
            @results = null
            @error = err
          else
            @results = get_results(@board, actions)
          return
      return
)

if location.hostname == 'localhost'
  vue.submit()
