$divs = []
$divs.push($('<div>').attr(class: 'col-sm-4').append('<div class="page-header"><h3><abbr></abbr> <small></small></h3></div>', '<h1></h1>').appendTo('#clocks')) for i in [0..2]

set_html = ($node, time, tz = null) ->
  tz ||= time.format('z')
  $node.find('h1').text(time.format('hh:mm:ss A'))
  $node.find('abbr').text(tz)
  $node.find('small').text({ JST: '日本標準時', PST: '太平洋標準時', PDT: '太平洋夏時間', MLT: 'マミー生活時間' }[tz])
  return

update = ->
  now = moment()
  jpt = now.clone().tz('Asia/Tokyo')
  ust = now.clone().tz('America/Los_Angeles')
  set_html($divs[0], jpt)
  set_html($divs[1], (if 6 <= jpt.hour() < 22 then jpt else ust), 'MLT')
  set_html($divs[2], ust)
  return

update()
setInterval(update, 500)
