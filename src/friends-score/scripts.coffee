hashed_scoring_users = do ->
  code = require('./code.coffee')
  h = {}
  code.split('x').forEach (hashes, score) ->
    score = (score + 1) / 2.0
    h[hash] = score for hash in (hashes.match(/.{8}/g) || [])
    return
  h

update_score = (score) ->
  $('#friends-score i').each ->
    star_class = if score >= 1
      score -= 1
      ''
    else if score >= 0.5
      score -= 0.5
      '-half-o'
    else
      score = 0
      '-o'
    $(this).attr(
      'class'
      "fa fa-star#{star_class}"
    )
    return
  return

crc32 = require('./crc32.coffee')

$('#screen-name').on 'input', ->
  name = $.trim($(this).val()).replace(/^@/, '')
  hash = "00000000#{crc32(name.toLowerCase()).toString(16)}".slice(-8)
  update_score(hashed_scoring_users[hash] || 0)
  return
