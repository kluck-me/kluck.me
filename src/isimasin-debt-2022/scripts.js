const calc = function (debt, rate, start, finish) {
  if (start > finish) {
    return null;
  }
  const day = new Date(2000, 0, 2) - new Date(2000, 0, 1);
  const y = start.getFullYear();
  const m = start.getMonth();
  const d = start.getDate();
  let curr_year = y;
  while (finish > new Date(curr_year + 1, m, d)) {
    ++curr_year;
  }
  const curr_start = new Date(curr_year, m, d);
  const year_days = (new Date(curr_year + 1, m, d) - curr_start) / day;
  const curr_days = Math.ceil((finish - curr_start) / day);
  const interest = debt * rate * (curr_year - y + curr_days / year_days);
  return debt + interest;
};

const update = function (today, debt_jpy, rate) {
  const jpy = calc(debt_jpy, rate, new Date(2022, 10, 20), today);

  if (!jpy) {
    $('body').hide();
    return;
  }

  const jpyd = jpy | 0;
  const jpyc = ((jpy - jpyd) * 100) | 0;
  $('#jpy').text(`${jpyd}円` + (jpyc > 0 ? `${jpyc}銭` : ''));
};

update(new Date(), 2000, 0.2);
