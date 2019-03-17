location.reload() if process.env.NODE_ENV == 'development' && window.vm

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

fetchLangs = (videoId) ->
  new Promise (resolve, reject) ->
    unless videoId
      reject()
      return
    $.get(
      url: '//video.google.com/timedtext'
      data:
        type: 'list'
        v: videoId
      dataType: 'xml'
    ).then (doc) ->
      langs = {}
      $('transcript_list>track', doc).each ->
        $track = $(this)
        code = $track.attr('lang_code')
        langs[code] =
          label:
            $track.attr('lang_original')
          params:
            name: $track.attr('name')
            lang: code
            v: videoId
        return
      resolve(langs)
      return
    , reject
    return

getSubs = (langs, codes) ->
  subs = {}
  codes.forEach (code) ->
    lang = langs[code]
    return unless lang
    texts = subs[code] = []
    $.get(
      url: '//video.google.com/timedtext'
      data: lang.params
      dataType: 'xml'
    ).done (doc) ->
      $('transcript>text', doc).each ->
        $text = $(this)
        start = parseFloat($text.attr('start'))
        dur = parseFloat($text.attr('dur'))
        texts.push(
          start: start
          end: start + dur
          text: $text.text()
        )
        return
      return
    return
  subs

window.vm = new Vue(
  el: '#vue'
  data:
    videoId: null
    texts: []
    subs: null
    langs: null
    selectedCodes: {}
    url: ''
  computed:
    codes: -> Object.keys(@selectedCodes).filter((code) => @selectedCodes[code]).sort()
  watch:
    url: (url) ->
      @fetchLangs(/v=([^=&?]+)/.exec(url)?[1])
      return
  methods:
    play: ->
      $('#modal-conf').modal('hide')
      player.loadVideoById(@videoId) if @videoId && player.getVideoData().video_id != @videoId
      return
    fetchLangs: (videoId) ->
      @videoId = videoId
      @langs = null
      fetchLangs(videoId).then (langs) =>
        @langs = langs
        return
    fetchSubs: (videoId) ->
      unless @langs && @videoId == videoId
        @subs = null
        @fetchLangs(videoId)
        return
      unless @subs
        @subs = getSubs(@langs, @codes)
      return
    updateSubs: (cur) ->
      @texts = @codes.map (code) =>
        if @subs
          arr = @subs[code]
          if cur? && arr
            j = binarySearch(arr, cur, (t, v) -> if t > v.end then 1 else if t < v.start then -1 else 0)
            return arr[j].text if j >= 0
        return
      return
)

# player
updateCurrentTime = ->
  window.vm.updateSubs(player?.getCurrentTime?())
  requestAnimationFrame(updateCurrentTime)
  return

updateCurrentTime()

onPlayerReady = ({ target: player }) ->
  $('#modal-conf').modal('show')

  # debug code
  if location.hostname == 'localhost'
    delay = (fn) -> setTimeout(fn, 500)
    delay ->
      window.vm.$data.url = 'https://www.youtube.com/watch?v=WqUBWz3YR7s'
      delay ->
        window.vm.$data.selectedCodes = 'en': true, 'zh-TW': true
        window.vm.$data.url = 'https://www.youtube.com/watch?v=4cQ4ZQn-KRA'
        delay ->
          $('#modal-conf .btn-primary').click()
  return

onPlayerStateChange = ({ target: player }) ->
  window.vm.fetchSubs(player.getVideoData().video_id)
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
