pp = console.log.bind console

class Novelint
  @match: (type, reg, fn) ->
    (text) ->
      r = []
      while m = reg.exec(text) when !fn || fn(m)
        index = m.index
        length = 0
        if m[2]
          index += m[1].length
          length = m[2].length
        else if m[1]
          length = m[1].length
        r.push([type, index, index + length])
      r

  constructor: ->
    @checkers = {}
    @results = []
    @count = 0

  add: (name, checker) ->
    (@checkers[name] ||= []).push(checker)
    return

  addMatch: (name, type, reg, fn) ->
    @add(name, Novelint.match(type, reg, fn))
    return

  check: (text, options) ->
    @text = text.replace(/\r\n?/g, '\n')
    t = []
    for name of @checkers when options[name]
      for checker in @checkers[name]
        t = t.concat(checker.call(this, @text))
    r = []
    r.push([v[0], v[1], v[1]], ['end', v[1], v[2]]) for v in t
    r.sort (a, b) ->
      a[2] - b[2] ||
      b[1] - a[1] ||
      (if a[0] == 'end' then 1 else if b[0] == 'end' then -1 else 0)
    @count = t.length
    @results = r
    this

  html: ->
    t = []
    i = 0
    for r in @results
      unless i == r[2]
        t.push(@text.slice(i, r[2]))
        i = r[2]
      if r[0] == 'end'
        t.push('</span>')
      else
        pair = r[0].split(':')
        t.push("<span class=\"bg-#{pair[0]}\" data-toggle=\"tooltip\" title=\"#{pair[1]||'エラー'}\">&shy;")
    t.push(@text.slice(i)) unless i == @text.length
    t.join('')

novelint = new Novelint
novelint.addMatch(
  'indent'
  'danger:間違った字下げです。'
  /^[^　「『（]/mg
  (m) -> m.input.slice(m.index, m.index + 1) != '\n'
)
novelint.addMatch(
  'mark-before-close-quote'
  'danger:閉じ括弧前に句読点は不要です。'
  /([、。])[）』」]/mg
)
novelint.addMatch(
  'space-after-mark'
  'danger:感嘆符・疑問符の後にはスペースが必要です。'
  /([！？])[^　！？）』」\n]/mg
)
novelint.addMatch(
  'double-mark'
  'danger:二つ一組で使う必要があります。'
  /(\u2014+|\u2026+)/mg
  (m) ->
    m[1].length != 2
)
novelint.addMatch(
  'single-mark'
  'danger:単体で使う必要があります。'
  /([、。]{2,})/mg
)
novelint.addMatch(
  'halfwidth-char'
  'warning:半角文字です。'
  /([ -~]+)/mg
)
novelint.addMatch(
  'fullwidth-char'
  'warning:全角文字です。'
  /([０-９Ａ-Ｚａ-ｚ]+)/mg
)
novelint.addMatch(
  'extra-space'
  'warning:末尾の不要なスペースです。'
  /(　+)$/mg
)
novelint.addMatch(
  'extra-space'
  'warning:不要なスペースです。'
  /([^\n！？])(　+)/mg
)

$ ($) ->
  currentErrorIndex = -1

  $('#checker').submit ->
    options = {}
    $(this).find('input[type="checkbox"]').each ->
      options[@name] = @checked
      return
    novelint.check(@text.value, options)
    $('h2').text($('h2').text().replace(/\d+/, novelint.count))
    $('#result').html(novelint.html())
    $('#result [data-toggle="tooltip"]').tooltip()
    currentErrorIndex = -1
    $('.hide').removeClass('hide')
    false

  $('#prev-error').click ->
    $err = $('#result [data-toggle="tooltip"]')
    currentErrorIndex = $err.length if currentErrorIndex <= 0
    currentErrorIndex--
    showError($err, currentErrorIndex)
    false

  $('#next-error').click ->
    $err = $('#result [data-toggle="tooltip"]')
    currentErrorIndex = -1 if currentErrorIndex >= $err.length - 1
    currentErrorIndex++
    showError($err, currentErrorIndex)
    false

  showError = ($err, index) ->
    $err.not(":eq(#{index})").tooltip('hide')
    $err.eq(index).tooltip('show')
    $('html,body').animate(
      scrollTop: $err.eq(index).offset().top - window.innerHeight / 2
    )
    return

  $('#checker').find('[name="text"]').val('　あ　い。う？　え？　\n　お！').end().submit() if location.hostname == 'localhost'
  return
