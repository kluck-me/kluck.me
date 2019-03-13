vue = new Vue(
  el: '#vue'
  data:
    clocks: []
  methods:
    update: ->
      now = moment()
      jpt = now.clone().tz('Asia/Tokyo')
      ust = now.clone().tz('America/Los_Angeles')
      @clocks = [
        { time: jpt }
        { time: (if 6 <= jpt.hour() < 22 then jpt else ust), tz: 'MLT' }
        { time: ust }
      ]
      @clocks.forEach (clock) ->
        clock.tz ||= clock.time.format('z')
        clock.tz_name ||= { JST: '日本標準時', PST: '太平洋標準時', PDT: '太平洋夏時間', MLT: 'マミー生活時間' }[clock.tz]
        return
      return
  mounted: ->
    setInterval =>
      @update()
    , 500
    @update()
    return
)
