novelint = new Novelint
novelint.addLint(
  'indent'
  /^[^　（｟「『［〚｛〔〘〈《【〖\u00AB\u2018\u201C]/mg
  (m) -> m.input.slice(m.index, m.index + 1) != '\n'
)
novelint.addLint(
  'extraIndent'
  /^(　+)[（｟「『［〚｛〔〘〈《【〖\u00AB\u2018\u201C]/mg
)
novelint.addLint(
  'spaceAfterMark'
  /([！？])[^\n　！？）｠」』］〛｝〕〙〉》】〗\u00BB\u2019\u201D]/mg
)
novelint.addLint(
  'markBeforeCloseQuote'
  /([、。])　*[）｠」』］〛｝〕〙〉》】〗\u00BB\u2019\u201D]/mg
)
novelint.addLint(
  'extraSpace'
  /(　+)$/mg
)
novelint.addLint(
  'extraSpace'
  /([^\n！？])(　+)/mg
)
novelint.addLint(
  'extraSpace'
  /([！？])(　+)[）｠」』］〛｝〕〙〉》】〗\u00BB\u2019\u201D]/mg
)
novelint.addLint(
  'doubleMark'
  /([！？]{2,})/mg
  (m) -> m[1].length % 2 != 0
)
novelint.addLint(
  'doubleMark'
  /([\u2010\u2013\u2014]+|\u2026+)/mg
  (m) -> m[1].length % 2 != 0
)
novelint.addLint(
  'singleMark'
  /([、。]{2,})/mg
)
novelint.addLint(
  'lastChar'
  /([^\n　。！？\u2010\u2013\u2014\u2026）｠」』］〛｝〕〙〉》】〗\u00BB\u2019\u201D])　*$/mg
)
novelint.addLint(
  'halfWidthChar'
  /([ -~]+)/mg
)
novelint.addLint(
  'fullWidthChar'
  /([０-９Ａ-Ｚａ-ｚ]+)/mg
)

vue = new Vue(
  el: '#vue'
  data:
    text: ''
    errorIndex: -1
    errors: null
    lints:
      indent: [
        true
        '字下げ'
        'danger:字下げが必要です'
        (s) -> s.replace(/^[^　（｟「『［〚｛〔〘〈《【〖\u00AB\u2018\u201C]/mg, '　$&')
      ]
      extraIndent: [
        true
        '過剰な字下げ'
        'warning:字下げは不要です'
      ]
      spaceAfterMark: [
        true
        '感嘆符・疑問符の後の空白'
        'danger:感嘆符・疑問符の後に空白が必要です'
      ]
      markBeforeCloseQuote: [
        true
        '閉じ括弧前の句読点'
        'danger:閉じ括弧前に句読点は不要です'
      ]
      extraSpace: [
        true
        '不要な空白'
        'warning:不要な空白の可能性があります'
        (s) -> s.replace(/(　+)$/mg, '')
      ]
      doubleMark: [
        true
        '二つ組で使う約物'
        'danger:二つ一組で使うべきです'
      ]
      singleMark: [
        true
        '単独で使う約物'
        'danger:単体で使うべきです'
      ]
      lastChar: [
        true
        '文末が約物以外'
        'warning:文末だと不自然な文字です'
      ]
      halfWidthChar: [
        true
        '半角英数字・記号'
        'warning:半角文字です'
      ]
      fullWidthChar: [
        false
        '全角英数字'
        'warning:全角文字です'
      ]
  methods:
    review: ->
      options = {}
      options[name] = lint[0] for name, lint of @lints
      @errorIndex = -1
      @errors = novelint.review(@text, options)
      @reviewedHtml = do (text = @text, lints = @lints, errors = @errors) ->
        h = (s) -> ('' + s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        t = []
        i = 0
        for r in errors.indexes
          unless i == r[2]
            t.push(h text.slice(i, r[2]))
            i = r[2]
          if r[0] == null
            t.push('</span>')
          else
            pair = ((lints[r[0]] || [])[2] || '').split(':')
            t.push("<span class=\"alert-#{pair[0] || 'danger'}\" data-toggle=\"tooltip\" title=\"#{pair[1] || 'エラー'}\">")
        t.push(h text.slice(i)) unless i == text.length
        t.join('')
      return
    autofix: ->
      @text = lint[3](@text) for name, lint of @lints when lint[0] && lint[3]
      @review()
      return
    showErrorToolTip: ->
      @errorIndex += @errors.length
      @errorIndex %= @errors.length
      $tt = $('#text [data-toggle="tooltip"]')
      $tt.not(":eq(#{@errorIndex})").tooltip('hide')
      $tt.eq(@errorIndex).tooltip('show')
      $('html,body').animate(
        scrollTop: $tt.eq(@errorIndex).offset().top - window.innerHeight / 2
      )
      return
    prevError: ->
      @errorIndex -= 1
      @showErrorToolTip()
      return
    nextError: ->
      @errorIndex += 1
      @showErrorToolTip()
      return
  beforeUpdate: ->
    $('#text [data-toggle="tooltip"]').tooltip('dispose')
    return
  updated: ->
    $('#text [data-toggle="tooltip"]').tooltip()
    return
)

if location.hostname == 'localhost'
  vue.$data.text = '''
字下げと句読点が必要
　空白が必要！末尾には不要。　
　「字下げと句読点の除去。」
　　過剰、　空白！　　です（除去せよ！　）。
　感嘆符は偶数個！？！　句点は一個\u2026\u2026\u2026。。
　English。
  '''
  vue.review()
