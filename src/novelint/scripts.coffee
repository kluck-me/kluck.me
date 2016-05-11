novelint = new Novelint
novelint.addMatch(
  'indent'
  'danger:字下げが必要です。'
  /^[^　（｟「『［〚｛〔〘〈《【〖\u00AB\u2018\u201C]/mg
  (m) -> m.input.slice(m.index, m.index + 1) != '\n'
)
novelint.addMatch(
  'mark-before-close-quote'
  'danger:閉じ括弧前に句読点は不要です。'
  /([、。])　*[）｠」』］〛｝〕〙〉》】〗\u00BB\u2019\u201D]/mg
)
novelint.addMatch(
  'space-after-mark'
  'danger:感嘆符・疑問符の後に空白が必要です。'
  /([！？])[^\n　！？）｠」』］〛｝〕〙〉》】〗\u00BB\u2019\u201D]/mg
)
novelint.addMatch(
  'extra-space'
  'warning:不要な空白の可能性があります。'
  /(　+)$/mg
)
novelint.addMatch(
  'extra-space'
  'warning:不要な空白の可能性があります。'
  /([^\n！？])(　+)/mg
)
novelint.addMatch(
  'extra-space'
  'warning:不要な空白の可能性があります。'
  /([！？])(　+)[）｠」』］〛｝〕〙〉》】〗\u00BB\u2019\u201D]/mg
)
novelint.addMatch(
  'double-mark'
  'danger:二つ一組で使う必要があります。'
  /([\u2010\u2013\u2014]+|\u2026+)/mg
  (m) ->
    m[1].length % 2 != 0
)
novelint.addMatch(
  'single-mark'
  'danger:単体で使う必要があります。'
  /([、。]{2,})/mg
)
novelint.addMatch(
  'last-char'
  'warning:行末だと不自然な文字です。'
  /([^\n　。！？\u2010\u2013\u2014\u2026）｠」』］〛｝〕〙〉》】〗\u00BB\u2019\u201D])　*$/mg
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

$ ($) ->
  currentErrorIndex = -1

  $('#checker').submit ->
    options = {}
    $(this).find('input[type="checkbox"]').each ->
      options[@name] = @checked
      return
    novelint.check(@text.value, options)
    $('h2 span').text(novelint.count)
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

  if location.hostname == 'localhost'
    $('#checker').find('[name="text"]').val('''
「おｋ！」

　おｋ。（だめ！　）
だめ？だめ\u2026？　
　「だめ、、　だめ。」
　だめ　
    ''').end().submit()
  return
