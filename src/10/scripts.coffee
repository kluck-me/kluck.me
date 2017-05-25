class Solver
  constructor: ->
    @callbacks = []
  onMessage: (fn) ->
    @callbacks.push(fn)
    return
  parseNumbers: (str) ->
    m = str.match(/[+-]?\d+/g)
    @numbers = if m
      m.filter((n) -> n.length == 1).map((n) -> parseInt(n, 10))
    else
      []
    @runnable = @numbers.length == 4
    this
  stop: ->
    @worker?.terminate()
    @worker = null
    this
  run: ->
    if @runnable && !@worker
      @worker = new Worker('solver.js')
      @worker.addEventListener('message', fn, false) for fn in @callbacks
      @worker.postMessage(numbers: @numbers, answer: 10)
    this

$pre = $('pre')
$input = $('form input[name="numbers"]')
$button = $('form button')

cache = null
solver = new Solver
solver.onMessage (e) ->
  switch e.data.type
    when 'result'
      expr = e.data.value
      unless cache[expr]
        cache[expr] = true
        $pre.append(document.createTextNode("#{expr}\n"))
    when 'finish'
      solver.stop()
    when 'debug'
      console.log e.data.value...
  updateView()
  return

updateView = ->
  if solver.worker
    $button.text('とめる')
    $input.prop('disabled', true)
  else
    $button.text('さがす').prop('disabled', !solver.parseNumbers($input.val()).runnable)
    $input.prop('disabled', false)
  return

$('form').submit ->
  if solver.worker
    solver.stop()
  else
    solver.parseNumbers($input.val())
    if solver.runnable
      cache = {}
      $pre.empty()
      solver.run()
  updateView()
  return false

$input.on('input', updateView)

if location.hostname == 'localhost'
  $input.val('5,0,2,6').trigger('input')
  $('form').submit()
