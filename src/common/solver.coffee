class Solver
  constructor: (@getWorker) ->
  stop: ->
    @worker?.terminate()
    @worker = null
    return
  run: (arg, fn) ->
    unless @worker
      @worker = @getWorker()
      @worker.addEventListener 'message', (e) =>
        switch e.data.type
          when 'result'
            fn(e.data.value)
          when 'finish'
            @stop()
          when 'debug'
            console.log e.data.value...
        return
      @worker.postMessage(arg)
    return

module.exports = Solver
