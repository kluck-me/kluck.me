params = new URLSearchParams(window.location.search)
video_prefix = params.get('prefix') || 'NHK'
video_suffix = params.get('suffix') || 'Japan'

get_now = ->
  date = new Date
  date.setTime(date.getTime() + 2 * 24 * 60 * 60 * 1000) if process.env.NODE_ENV == 'development'
  date

video_sec = if process.env.NODE_ENV == 'development' then 20 else 30 * 60

zz = (s) -> "#{s}".padStart(2, '0')

get_info = (start_date) ->
  # 20010911_120000 - 20010917_060000
  video_mon = start_date.getUTCMonth() + 1
  video_day = start_date.getUTCDate()
  video_hour = start_date.getUTCHours()
  video_min = if start_date.getUTCMinutes() < 30 then 0 else 30
  return unless video_mon == 9
  return unless (video_day == 11 && 12 <= video_hour) || (12 <= video_day < 17) || (video_day == 17 && video_hour < 6)
  start_sec = (start_date.getUTCMinutes() - video_min) * 60 + start_date.getUTCSeconds() + 1
  end_sec = Math.min(30 * 60 + 1, start_sec + video_sec)
  end_date = new Date
  end_date.setTime(start_date.getTime() + (end_sec - start_sec) * 1000)
  name = "#{video_prefix}_2001#{zz(video_mon)}#{zz(video_day)}_#{zz(video_hour)}#{zz(video_min)}00_#{video_suffix}"
  url: "https://archive.org/download/#{name}/#{name}.mp4?start=#{start_sec}&end=#{end_sec}&ignore=x.mp4"
  start: start_date
  end: end_date

infos = []

add_video = (info) ->
  $video = $('<video>')
  info.video = $video[0]
  info.canplay = false
  $video
    .css('z-index', -1)
    .attr(
      src: info.url
      controls: process.env.NODE_ENV == 'development'
    )
    .on('canplay', ->
       info.canplay = true
       return
    )
    .appendTo('#videos')
  return

add_info = (date) ->
  info = get_info(date)
  if info
    add_video(info)
    infos.push(info)
    info.start

play_first_info = ->
  info = infos.shift()
  return unless info
  next_start = add_info(info.end)
  next_play = ->
    $(info.video).css('z-index', -1)
    play_first_info()
    $(info.video).remove()
    info.video = null
    return
  info_play = ->
    $(info.video).css('z-index', 2)
    info.video.play()
    return
  $(info.video)
    .on 'timeupdate', ->
      next_play() if next_start < get_now()
      return
    .on 'ended', next_play
  $(info.video).on('canplay', info_play) unless info.canplay
  info_play()
  return

$('#videos').one 'click', ->
  $('#videos').empty()
  tid = setInterval ->
    if add_info(get_now())
      clearInterval(tid)
      play_first_info()
    return
  , 1000
  return
