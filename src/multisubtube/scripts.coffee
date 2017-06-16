window.onYouTubeIframeAPIReady = ->
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

  subs = []

  showSubs = ->
    if player && player.getCurrentTime
      cur = player.getCurrentTime()
      if cur?
        subs.forEach (subArr, i) ->
          j = binarySearch(subArr, cur, (t, v) -> if t > v.end then 1 else if t < v.start then -1 else 0)
          if j < 0
            $("#sub_#{i}").html('&nbsp;')
          else
            $("#sub_#{i}").html(subArr[j].text)
          return
    requestAnimationFrame(showSubs)

  onPlayerReady = ->
    $('#form-url').submit ->
      videoId = /v=([^=&?]+)/.exec(@url.value)?[1]
      $.get(
        url: '//video.google.com/timedtext'
        data:
          type: 'list'
          v: videoId
        dataType: 'xml'
      ).done((doc) ->
        $('#conf-subs').empty()
        $('transcript_list>track', doc).each ->
          $('<option>')
            .text('' + $(this).attr('lang_original'))
            .data(
              params:
                name: $(this).attr('name')
                lang: $(this).attr('lang_code')
                v: videoId
            )
            .val('' + $(this).attr('id'))
            .appendTo('#conf-subs')
          return
        return
      )
      player.loadVideoById(videoId)
      false

    $('#form-subs').submit ->
      $('#subs').empty()
      subs.splice(0, subs.length) # clear
      $('#conf-subs option:selected').each (i) ->
        $('<div>').attr('id', "sub_#{i}").appendTo('#subs')
        texts = subs[i] = []
        $.get(
          url: '//video.google.com/timedtext'
          data: $(this).data('params')
          dataType: 'xml'
        ).done((doc) ->
          $('transcript>text', doc).each ->
            start = parseFloat $(this).attr('start')
            dur = parseFloat $(this).attr('dur')
            texts.push(
              start: start
              end: start + dur
              text: $(this).text()
            )
            return
          return
        )
        return
      false

    showSubs()
    return

  window.player = new YT.Player(
    'player'
    height: '360'
    width: '640'
    events:
      onReady: onPlayerReady
  )
  return
