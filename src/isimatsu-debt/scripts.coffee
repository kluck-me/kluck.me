do ->
  debt_day = new Date(2016, 4, 1)
  ddy = debt_day.getFullYear()
  ddm = debt_day.getMonth()
  ddd = debt_day.getDate()
  day = new Date(2000, 0, 2) - new Date(2000, 0, 1)
  today = new Date
  if debt_day > today
    $('body').hide()
    return
  start_year = ddy
  count_year = 0
  while today > new Date(start_year + 1, ddm, ddd)
    ++start_year
    ++count_year
  debt_jpy = 2000
  rate = 0.2
  cost = debt_jpy * rate * count_year
  start_date = new Date(start_year, ddm, ddd)
  year_days = (new Date(start_year + 1, ddm, ddd) - start_date) / day
  curr_days = Math.ceil((today - start_date) / day)
  cost += debt_jpy * rate * curr_days / year_days
  jpy = debt_jpy + cost
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
    $('#twd').text("（#{((jpyd + jpyc) * trate * 100 | 0) / 100}台湾ドル）")
    return
  )
  return
