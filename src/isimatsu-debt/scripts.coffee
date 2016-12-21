calc = (debt, rate, start, finish) ->
  return null if start > finish
  day = new Date(2000, 0, 2) - new Date(2000, 0, 1)
  y = start.getFullYear()
  m = start.getMonth()
  d = start.getDate()
  curr_year = y
  ++curr_year while finish > new Date(curr_year + 1, m, d)
  curr_start = new Date(curr_year, m, d)
  year_days = (new Date(curr_year + 1, m, d) - curr_start) / day
  curr_days = Math.ceil((finish - curr_start) / day)
  interest = debt * rate * (curr_year - y + curr_days / year_days)
  debt + interest

update = (today, debt_jpy, rate) ->
  jpy = calc(debt_jpy, rate, new Date(2016, 4, 1), today)

  unless jpy
    $('body').hide()
    return

  jpyd = jpy | 0
  jpyc = (jpy - jpyd) * 100 | 0
  $('#jpy').text("#{jpyd}円" + if jpyc > 0 then "#{jpyc}銭" else '')

  $.getJSON(
    'https://query.yahooapis.com/v1/public/yql?callback=?'
    q: 'select * from yahoo.finance.xchange where pair in ("JPYTWD")'
    env: 'store://datatables.org/alltableswithkeys'
    format: 'json'
  ).then((data) ->
    trate = parseFloat(data.query.results.rate.Rate)
    $('#twd').text("（#{(jpy * trate * 100 | 0) / 100}台湾ドル）")
    return
  )
  return

update(new Date, 2000, 0.2)
