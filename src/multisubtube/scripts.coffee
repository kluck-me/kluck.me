# video
class Video
  binarySearch = (arr, elm, compare) ->
    m = 0
    n = arr.length - 1
    while m <= n
      k = (n + m) >> 1
      cmp = compare(elm, arr[k])
      if cmp > 0
        m = k + 1
      else if cmp < 0
        n = k - 1
      else
        return k
    return -m - 1
  constructor: ->
    @id = null
    @subs = null
    @langs = null
    @langCodes = []
    return
  update: (id) ->
    return false if @id == id
    @id = id
    @subs = null
    @langs = null
    return true
  setLangCodes: (@langCodes...) ->
    return
  hasLangCode: (code) ->
    return @langCodes.indexOf(code) > -1
  addLangCode: (code) ->
    @langCodes = @langCodes.concat([code]).sort() unless @hasLangCode(code)
    return
  removeLangCode: (code) ->
    idx = @langCodes.indexOf(code)
    @langCodes = @langCodes.concat().splice(idx, 1) if idx > -1
    return
  getCurrentHtmls: (cur) ->
    that = this
    return @langCodes.map (code) ->
      if that.subs
        arr = that.subs[code]
        if cur? && arr
          j = binarySearch(arr, cur, (t, v) -> if t > v.end then 1 else if t < v.start then -1 else 0)
          return arr[j].text if j >= 0
      return null
  fetchSubs: ->
    unless @langs
      @fetchLangs ->
        @fetchSubs()
        return
      return
    that = this
    @subs ||= {}
    @langCodes.forEach (code) ->
      lang = that.langs[code]
      return unless lang
      return if that.subs[code]
      texts = that.subs[code] = []
      $.get(
        url: '//video.google.com/timedtext'
        data: lang.params
        dataType: 'xml'
      ).done((doc) ->
        $('transcript>text', doc).each ->
          $this = $(this)
          start = parseFloat($this.attr('start'))
          dur = parseFloat($this.attr('dur'))
          texts.push(
            start: start
            end: start + dur
            text: $this.text()
          )
          return
        return
      )
      return
    return
  fetchLangs: (fn) ->
    return if @langs
    return unless @id
    that = this
    @langs = {}
    $.get(
      url: '//video.google.com/timedtext'
      data:
        type: 'list'
        v: @id
      dataType: 'xml'
    ).done (doc) ->
      $('transcript_list>track', doc).each ->
        $this = $(this)
        code = $this.attr('lang_code')
        that.langs[code] =
          label:
            $this.attr('lang_original')
          params:
            name: $this.attr('name')
            lang: code
            v: that.id
        return
      fn.call(that)
      return
    return

video = new Video

renderSubs = ->
  $subNodes = $('#subs>div')
  unless $subNodes.length == video.langCodes.length
    $subNodes.remove()
    video.langCodes.forEach (_, i) ->
      $('<div>').attr('id', "sub-#{i}").appendTo('#subs')
  video.getCurrentHtmls(player?.getCurrentTime?()).forEach (html, i) ->
    $("#sub-#{i}").html(html || '&nbsp;')
    return
  requestAnimationFrame(renderSubs)
  return

renderSubs()

# form
confVideo = null

getConfLangCodes = ->
  codes = []
  $('#conf-subs input[name^="lang-"]:checked').each ->
    codes.push($(this).val())
    return
  return codes

setConfVideoUrl = (videoUrl) ->
  $('#conf-url').val(videoUrl || '').trigger('input')
  return

setConfLangCodes = (codes...) ->
  $('#conf-subs input[name^="lang-"]').prop('checked', false).trigger('change')
  codes.forEach (code) ->
    $("#conf-subs input[name=\"lang-#{code}\"]").prop('checked', true).trigger('change')
    return
  return

$('#conf-url').on 'input', ->
  videoId = /v=([^=&?]+)/.exec($(this).val())?[1]
  confVideo.update(videoId)
  confVideo.fetchLangs ->
    confVideo.setLangCodes(getConfLangCodes()...)
    $('#conf-subs').empty()
    Object.keys(confVideo.langs).sort().forEach (code) ->
      $checkbox = $('<div>').addClass('form-check')
      name = "lang-#{code}"
      $('<input>')
        .addClass('form-check-input')
        .attr(
          type: 'checkbox'
          id: name
          name: name
          value: code
        )
        .prop('checked', confVideo.hasLangCode(code))
        .change ->
          $this = $(this)
          confVideo[if $(this).prop('checked') then 'addLangCode' else 'removeLangCode']($this.val())
          return
        .appendTo($checkbox)
      $('<label>')
        .addClass('form-check-label')
        .attr('for', name)
        .text(confVideo.langs[code].label)
        .appendTo($checkbox)
      $checkbox.appendTo('#conf-subs')
      return
    return
  return

$('#modal-conf form').submit (evt) ->
  evt.preventDefault()
  evt.stopPropagation()
  $('#modal-conf').modal('hide')
  video = confVideo
  confVideo = null
  player.loadVideoById(video.id) unless player.getVideoData().video_id == video.id
  return

$('#modal-conf').on 'show.bs.modal', ->
  langCodes = if confVideo then confVideo.langCodes else video.langCodes
  confVideo = new Video
  confVideo.setLangCodes(video.langCodes...)
  setConfVideoUrl(player?.getVideoUrl())
  return

# player
onPlayerReady = ({ target: player }) ->
  $('#modal-conf').modal('show')
  return unless location.hostname == 'localhost'
  # debug code
  delay = (fn) ->
    setTimeout(fn, 500)
  delay ->
    setConfVideoUrl 'https://www.youtube.com/watch?v=sLv6FfHlxmI'
    delay ->
      setConfLangCodes 'en', 'ja'
      setConfVideoUrl 'https://www.youtube.com/watch?v=-sGiE10zNQM'
      delay ->
        $('#modal-conf .btn-primary').click()
  return

onPlayerStateChange = ({ target: player }) ->
  video.update(player.getVideoData().video_id)
  video.fetchSubs()
  return

window.onYouTubeIframeAPIReady = ->
  window.player = new YT.Player(
    'ytplayer'
    height: '480'
    width: '853'
    events:
      onReady: onPlayerReady
      onStateChange: onPlayerStateChange
  )
  return
