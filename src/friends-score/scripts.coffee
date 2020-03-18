crc32 = require('./crc32.coffee')

hashed_scoring_users = do ->
  code = require('./code.coffee')
  h = {}
  code.split('x').forEach (hashes, score) ->
    score = (score + 1) / 2.0
    h[hash] = score for hash in (hashes.match(/.{8}/g) || [])
    return
  h

window.vm = new Vue(
  el: '#vue'
  data:
    input: ''
  computed:
    score: ->
      name = @input.trim().replace(/^@/, '')
      hash = "00000000#{crc32(name.toLowerCase()).toString(16)}".slice(-8)
      hashed_scoring_users[hash] || 0
  methods:
    star: (v) ->
      if v >= 1
        'fa-star'
      else if 1 > v >= 0.5
        'fa-star-half-o'
      else
        'fa-star-o'
  mounted: ->
    if location.hostname == 'localhost'
      @input = 'kluck_me'
    return
)
