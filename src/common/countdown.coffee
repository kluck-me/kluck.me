countdown = do ->
  patterns = ['s', 'm', 'h', 'd', 'y']
  formatReg = /{(.*?)%([a-z])(.*?)}/g
  (str, time) ->
    cache = {}
    for v, i in [60, 60, 24, 365, 0]
      k = patterns[i]
      if v
        time -= (cache[k] = time % v)
        time /= v
      else
        cache[k] = time
    str.replace formatReg, (_, _1, _2, _3) ->
      if cache[_2] then "#{_1}#{cache[_2]}#{_3}" else ''
