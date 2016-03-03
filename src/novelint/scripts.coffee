pp = console.log.bind console

class Novelint
  @match: (type, reg, fn) ->
    (text) ->
      r = []
      r.push([type, m.index, m.index + (if m[1] then m[1].length else 0)]) while m = reg.exec(text) when !fn || fn(m)
      r

  constructor: ->
    @checkers = {}
    @results = []
    @count = 0

  add: (name, checker) ->
    @checkers[name] = checker
    return

  addMatch: (name, type, reg, fn) ->
    @checkers[name] = Novelint.match(type, reg, fn)
    return

  check: (text, options) ->
    @text = text.replace(/\r\n?/g, '\n')
    t = []
    t = t.concat(@checkers[name].call(this, @text)) for name of @checkers when options[name]
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
        t.push("<span class=\"bg-#{r[0]}\" data-toggle=\"tooltip\" title=\"エラー\">&shy;")
    t.push(@text.slice(i)) unless i == @text.length
    t.join('')

novelint = new Novelint
novelint.addMatch 'indent', 'danger', /^[^　「『（]/mg, (m) ->
  m.input.slice(m.index, m.index + 1) != '\n'
novelint.addMatch 'mark-before-close-quote', 'danger', /([、。])[）』」]/mg
novelint.addMatch 'space-after-mark', 'danger', /([！？])[^　！？）』」]/mg
novelint.addMatch 'double-mark', 'danger', /(\u2014+|\u2026+)/mg, (m) ->
  m[1].length != 2
novelint.addMatch 'halfwidth-char', 'warning', /([ -~]+)/mg
novelint.addMatch 'fullwidth-char', 'warning', /([０-９Ａ-Ｚａ-ｚ]+)/mg

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
    $err.tooltip('hide')
    setTimeout ->
      $err.eq(index).tooltip('show')
    , 10
    $('html,body').animate(
      scrollTop: $err.eq(index).offset().top - window.innerHeight / 2
    )
    return
  return
