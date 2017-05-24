pp = (args...) ->
  self.postMessage(type: 'debug', value: args)
  return

time = (fn) ->
  t = Date.now()
  fn()
  Date.now() - t

self.addEventListener 'message', (e) ->
  pp time ->
    return
  self.postMessage(type: 'finish')
  return
, false
