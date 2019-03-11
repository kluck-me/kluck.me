Solver = require('../common/solver.coffee')

calc_exprs_score = (expr) ->
  score = 0
  table = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 10, '√': 11, '!': 12 }
  score += table[c] || 20 for c in expr.replace(/[\d()]+/g, '')
  score * 100 + expr.length

vue = new Vue(
  el: '#vue'
  data:
    solver: new Solver(-> new Worker('./solver.coffee'))
    input: ''
    exprs: []
  computed:
    output: -> @exprs.join("\n")
    numbers: ->
      m = @input.match(/[+-]?\d+/g)
      if m
        m.filter((n) -> n.length == 1).map((n) -> parseInt(n, 10))
      else
        []
    runnable: -> @numbers.length == 4
  methods:
    submit: ->
      if @solver.worker
        @solver.stop()
      else if @runnable
        cache = {}
        @exprs = []
        @solver.run numbers: @numbers, answer: 10, (expr) =>
          unless cache[expr]
            cache[expr] = calc_exprs_score(expr)
            @exprs.push(expr)
            @exprs.sort (a, b) -> cache[a] - cache[b]
          return
      return
)

if location.hostname == 'localhost'
  vue.$data.input = '5,0,2,6'
  vue.submit()
